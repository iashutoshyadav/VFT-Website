import { createClient } from "@supabase/supabase-js";

/**
 * Supabase admin client — uses the service role key.
 * Bypasses Row Level Security. Server-side only — NEVER expose to browser.
 * Use only in API routes and server components.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
