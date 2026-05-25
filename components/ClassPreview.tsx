"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ClassPreview() {
  return (
    <section id="classes" className="w-full bg-white px-4 sm:px-6 py-14">
      <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden max-w-350 mx-auto min-h-80 sm:min-h-120 md:min-h-150 lg:min-h-200">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/group_class.png')" }}
        />

        {/* Card — floats bottom-left, capped width so image shows around it */}
        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 w-[calc(100%-3rem)] sm:w-[calc(100%-5rem)] max-w-96 sm:w-100">
          <div className="bg-[#f5f4f0] rounded-2xl p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">

            {/* Subtitle */}
            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-5">
              From high-energy to mindfulness, there&apos;s a class for it.
            </p>

            {/* Heading */}
            <h2 className="text-[#111827] text-2xl sm:text-4xl font-extrabold leading-[1.05] tracking-tight mb-8 sm:mb-12">
              Unlimited<br />classes included
            </h2>

            {/* Divider + Link */}
            <div className="border-t border-gray-300 pt-5">
              <Link href="/classes" className="group flex items-center justify-between no-underline">
                <span className="text-[#111827] text-[15px] font-medium underline decoration-gray-400 underline-offset-4 group-hover:text-[#00cc70] group-hover:decoration-[#00cc70] transition-colors">
                  View our classes
                </span>
                <ChevronRight
                  strokeWidth={2.5}
                  className="w-5 h-5 text-[#111827] group-hover:text-[#00cc70] group-hover:translate-x-1 transition-all"
                />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
