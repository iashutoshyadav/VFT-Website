-- ============================================================
-- VFT — Vitality Fitness Tavistock — Database Schema
-- Run this in Supabase → SQL Editor
-- ============================================================

-- ──────────────────────────────────────────
-- 1. PROFILES
-- Extended user data linked to Supabase auth.users
-- ──────────────────────────────────────────
create table if not exists public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  full_name       text not null,
  phone           text,
  avatar_url      text,
  plan            text not null default 'essential'
                    check (plan in ('essential','premium','elite')),
  points          integer not null default 0,
  referral_code   text unique,
  referred_by     uuid references public.profiles(id),
  emergency_name  text,
  emergency_phone text,
  parq_completed  boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- Auto-create profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name, plan, referral_code)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Member'),
    coalesce(new.raw_user_meta_data->>'plan', 'essential'),
    upper(substring(md5(new.id::text), 1, 8))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ──────────────────────────────────────────
-- 2. MEMBERSHIPS
-- Tracks each member's active plan + billing
-- ──────────────────────────────────────────
create table if not exists public.memberships (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  plan            text not null check (plan in ('essential','premium','elite')),
  price           numeric(8,2) not null,
  status          text not null default 'active'
                    check (status in ('active','paused','cancelled')),
  started_at      timestamptz not null default now(),
  renews_at       timestamptz,
  stripe_sub_id   text,
  stripe_cust_id  text,
  created_at      timestamptz not null default now()
);

-- ──────────────────────────────────────────
-- 3. CLASSES
-- The gym's class timetable
-- ──────────────────────────────────────────
create table if not exists public.classes (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  description     text,
  instructor      text not null,
  class_type      text not null
                    check (class_type in ('hiit','strength','yoga','boxing','spin','pilates','other')),
  day_of_week     integer not null check (day_of_week between 0 and 6), -- 0=Sun, 1=Mon ... 6=Sat
  start_time      time not null,
  duration_mins   integer not null default 45,
  capacity        integer not null default 15,
  location        text default 'Main Studio',
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);

-- ──────────────────────────────────────────
-- 4. BOOKINGS
-- Members booking a specific class on a specific date
-- ──────────────────────────────────────────
create table if not exists public.bookings (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  class_id        uuid not null references public.classes(id) on delete cascade,
  class_date      date not null,
  status          text not null default 'booked'
                    check (status in ('booked','attended','cancelled','no_show','waitlist')),
  checked_in_at   timestamptz,
  cancelled_at    timestamptz,
  booked_at       timestamptz not null default now(),
  unique (user_id, class_id, class_date)
);

-- View: count of confirmed bookings per class per date
create or replace view public.class_availability as
select
  c.id            as class_id,
  b.class_date,
  c.capacity,
  count(b.id) filter (where b.status = 'booked' or b.status = 'attended') as booked_count,
  c.capacity - count(b.id) filter (where b.status = 'booked' or b.status = 'attended') as spots_left
from public.classes c
left join public.bookings b on b.class_id = c.id
group by c.id, b.class_date, c.capacity;

-- ──────────────────────────────────────────
-- 5. REVIEWS
-- Post-class feedback
-- ──────────────────────────────────────────
create table if not exists public.reviews (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  class_id        uuid references public.classes(id),
  booking_id      uuid references public.bookings(id),
  rating          integer not null check (rating between 1 and 5),
  comment         text,
  is_public       boolean not null default true,
  created_at      timestamptz not null default now()
);

-- ──────────────────────────────────────────
-- 6. NOTIFICATIONS
-- In-app notifications for members
-- ──────────────────────────────────────────
create table if not exists public.notifications (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  type            text not null
                    check (type in ('booking','reminder','offer','streak','system')),
  title           text not null,
  message         text not null,
  read            boolean not null default false,
  action_url      text,
  created_at      timestamptz not null default now()
);

-- ──────────────────────────────────────────
-- 7. ACHIEVEMENTS
-- Badges earned by members
-- ──────────────────────────────────────────
create table if not exists public.achievements (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  badge           text not null
                    check (badge in (
                      'first_class','streak_5','streak_10','streak_30',
                      'classes_10','classes_50','classes_100',
                      'referral_1','referral_5','top_performer'
                    )),
  earned_at       timestamptz not null default now(),
  unique (user_id, badge)
);

-- ──────────────────────────────────────────
-- 8. EVENTS
-- Workshops, challenges, special sessions
-- ──────────────────────────────────────────
create table if not exists public.events (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  description     text,
  event_date      timestamptz not null,
  capacity        integer,
  price           numeric(8,2) default 0,
  image_url       text,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);

create table if not exists public.event_rsvps (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  event_id        uuid not null references public.events(id) on delete cascade,
  status          text not null default 'confirmed'
                    check (status in ('confirmed','cancelled')),
  rsvped_at       timestamptz not null default now(),
  unique (user_id, event_id)
);

-- ──────────────────────────────────────────
-- 9. ROW LEVEL SECURITY (RLS)
-- Users can only read/write their own data
-- ──────────────────────────────────────────

alter table public.profiles      enable row level security;
alter table public.memberships   enable row level security;
alter table public.bookings      enable row level security;
alter table public.reviews       enable row level security;
alter table public.notifications enable row level security;
alter table public.achievements  enable row level security;
alter table public.events        enable row level security;
alter table public.event_rsvps   enable row level security;

-- Profiles: own row only
create policy "profiles: read own" on public.profiles for select using (auth.uid() = id);
create policy "profiles: update own" on public.profiles for update using (auth.uid() = id);

-- Memberships: own rows only
create policy "memberships: read own" on public.memberships for select using (auth.uid() = user_id);

-- Classes: everyone can read active classes
alter table public.classes enable row level security;
create policy "classes: read all" on public.classes for select using (is_active = true);

-- Bookings: own rows only
create policy "bookings: read own"   on public.bookings for select using (auth.uid() = user_id);
create policy "bookings: insert own" on public.bookings for insert with check (auth.uid() = user_id);
create policy "bookings: update own" on public.bookings for update using (auth.uid() = user_id);

-- Reviews: read all public, write own
create policy "reviews: read public" on public.reviews for select using (is_public = true);
create policy "reviews: insert own"  on public.reviews for insert with check (auth.uid() = user_id);

-- Notifications: own rows only
create policy "notifications: read own"   on public.notifications for select using (auth.uid() = user_id);
create policy "notifications: update own" on public.notifications for update using (auth.uid() = user_id);

-- Achievements: own rows only
create policy "achievements: read own" on public.achievements for select using (auth.uid() = user_id);

-- Events: everyone can read
create policy "events: read all" on public.events for select using (is_active = true);

-- Event RSVPs: own rows only
create policy "event_rsvps: read own"   on public.event_rsvps for select using (auth.uid() = user_id);
create policy "event_rsvps: insert own" on public.event_rsvps for insert with check (auth.uid() = user_id);
create policy "event_rsvps: update own" on public.event_rsvps for update using (auth.uid() = user_id);

-- ──────────────────────────────────────────
-- 10. SEED DATA — Sample Classes
-- ──────────────────────────────────────────
insert into public.classes (name, description, instructor, class_type, day_of_week, start_time, duration_mins, capacity) values
  ('Morning HIIT',      'High intensity interval training to kickstart your day', 'Jake Morris',   'hiit',     1, '06:00', 45, 15),
  ('Yoga Flow',         'Gentle flow yoga for flexibility and mindfulness',        'Sarah Henley',  'yoga',     1, '09:00', 60, 12),
  ('Strength Circuit',  'Full body strength and conditioning workout',             'Mike Turner',   'strength', 2, '12:00', 50, 10),
  ('Spin & Burn',       'High energy indoor cycling session',                      'Tom Reid',      'spin',     2, '06:00', 45, 14),
  ('Boxing Cardio',     'Boxing drills and pads for fitness and fun',              'Emma Clarke',   'boxing',   3, '18:30', 45, 12),
  ('Pilates Core',      'Core strength and posture improvement',                   'Lisa Kent',     'pilates',  3, '10:00', 55, 10),
  ('HIIT Blast',        'Maximum calorie burn in minimum time',                    'Jake Morris',   'hiit',     4, '06:30', 45, 15),
  ('Strength & Power',  'Heavy compound lifting and power development',            'Mike Turner',   'strength', 4, '17:00', 60, 8),
  ('Evening Yoga',      'Wind down with restorative yoga',                         'Sarah Henley',  'yoga',     4, '19:00', 60, 12),
  ('Friday HIIT',       'End your week strong with a full body burn',             'Emma Clarke',   'hiit',     5, '06:00', 45, 15),
  ('Weekend Strength',  'Saturday morning strength session',                       'Mike Turner',   'strength', 6, '09:00', 60, 10),
  ('Sunday Flow',       'Relaxing Sunday yoga to recover and reset',              'Sarah Henley',  'yoga',     0, '10:00', 60, 12);
