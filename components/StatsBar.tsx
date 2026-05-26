import { Check } from "lucide-react";

const benefits = [
  "24/7 Gym Access",
  "Bespoke Members App",
  "Full Equipment Use",
  "Free Parking",
  "Locker & Changing Rooms",
  "Friendly Staff Support",
];

export default function StatsBar() {
  return (
    <section className="bg-white border-y border-[#e5e7eb] py-6 px-6">
      <div className="container-max">
        <p className="text-center text-[#111827] font-black text-xl mb-8">
          All memberships include...
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#f5f6f8] border border-[#d1d5db] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-[#374151]" strokeWidth={2.5} />
              </div>
              <span className="text-[#374151] text-sm font-semibold">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
