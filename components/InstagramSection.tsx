"use client";
import { Instagram } from "./icons";
import { Heart } from "lucide-react";

const posts = [
  { image: "/insta_1.png", caption: "Early morning gains — nothing beats 6am at VFT", likes: 127 },
  { image: "/insta_2.png", caption: "Sauna Sundays — the best part of your weekend", likes: 204 },
  { image: "/insta_3.png", caption: "HIIT class was intense — see you all Thursday!", likes: 89 },
  { image: "/insta_4.png", caption: "New equipment just arrived! Come check it out", likes: 312 },
  { image: "/insta_5.png", caption: "Our amazing members crushing cardio day!", likes: 156 },
  { image: "/insta_6.png", caption: "Challenge winners this month — incredible results!", likes: 278 },
];

export default function InstagramSection() {
  return (
    <section
      id="instagram"
      className="relative overflow-hidden py-14 bg-[#f8f8f6]"
    >
      {/* Decorative background glows */}
      <div
        className="absolute rounded-full pointer-events-none z-1 top-[10%] left-[-5%] w-100 h-100 bg-[radial-gradient(circle,rgba(0,204,112,0.04)_0%,rgba(0,204,112,0)_70%)]"
      />
      <div
        className="absolute rounded-full pointer-events-none z-1 bottom-[-10%] right-[-5%] w-100 h-100 bg-[radial-gradient(circle,rgba(0,204,112,0.03)_0%,rgba(0,204,112,0)_70%)]"
      />

      <div className="max-w-[1160px] mx-auto px-6 relative z-[2]">
        {/* Header */}
        <div className="flex flex-row items-end justify-between gap-6 mb-10 flex-wrap">
          <div>
            <span
              className="inline-block bg-linear-to-br from-[#00cc70] to-[#00a85d] bg-clip-text text-transparent text-[0.72rem] font-extrabold tracking-[0.18em] uppercase mb-2.5"
            >
              Instagram
            </span>
            <h2
              className="text-[clamp(2rem,5vw,3rem)] font-black text-[#0f172a] tracking-[-0.03em] leading-[1.1] m-0"
            >
              Follow our <span className="text-[#00cc70]">journey</span>
            </h2>
            <p
              className="text-[0.95rem] text-[#64748b] mt-[10px] mb-0 font-medium max-w-[600px] leading-[1.5]"
            >
              Get inspired by our daily community updates, member achievements, and tips from our elite coaching team.
            </p>
          </div>
          <a
            href="https://www.instagram.com/vft.tavistock/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[10px] bg-white border border-[#e2e8f0] rounded-[30px] py-3 px-6 text-[0.875rem] font-bold text-[#334155] no-underline shadow-[0_4px_12px_rgba(15,23,42,0.03)] transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:text-white hover:bg-[linear-gradient(135deg,#00cc70_0%,#00a85d_100%)] hover:border-transparent hover:shadow-[0_8px_20px_rgba(0,204,112,0.2)] hover:-translate-y-[2px]"
          >
            <Instagram className="w-4.5 h-4.5" />
            <span>@vft.tavistock</span>
          </a>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 max-md:gap-4 max-sm:gap-3">
          {posts.map((post, i) => (
            <a
              key={i}
              href="https://www.instagram.com/vft.tavistock/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-[20px] overflow-hidden bg-[#f8fafc] border border-[#f1f5f9] block no-underline shadow-[0_4px_20px_rgba(15,23,42,0.02)] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[5px] hover:border-[rgba(0,204,112,0.3)] hover:shadow-[0_20px_35px_-10px_rgba(0,204,112,0.15),0_8px_16px_-8px_rgba(15,23,42,0.08)]"
            >
              {/* Image element */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[800ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                style={{ backgroundImage: `url('${post.image}')` }}
              />

              {/* Floating Instagram logo in corner (only visible when not hovered) */}
              <div
                className="absolute top-[14px] right-[14px] bg-[rgba(15,23,42,0.45)] backdrop-blur-[6px] [-webkit-backdrop-filter:blur(6px)] border border-white/20 rounded-full w-8 h-8 flex items-center justify-center text-white z-[5] transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-0 group-hover:scale-[0.7] group-hover:rotate-[15deg]"
              >
                <Instagram className="w-3.5 h-3.5" />
              </div>

              {/* Hover overlay with glassmorphism */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] flex flex-col items-center justify-center p-5 text-center z-[6] backdrop-blur-[6px] [-webkit-backdrop-filter:blur(6px)] group-hover:opacity-100 bg-[linear-gradient(to_top,rgba(15,23,42,0.88)_0%,rgba(15,23,42,0.55)_100%)]"
              >
                <div
                  className="translate-y-[15px] opacity-0 transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] delay-[50ms] flex flex-col items-center gap-3 w-full group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <div
                    className="bg-white/15 rounded-full w-10 h-10 flex items-center justify-center border border-white/20"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <p
                    className="text-white text-[0.85rem] font-medium leading-[1.4] m-0 px-2 overflow-hidden text-ellipsis [-webkit-line-clamp:3] [display:-webkit-box] [-webkit-box-orient:vertical]"
                  >
                    {post.caption}
                  </p>

                  <div
                    className="flex items-center gap-[6px] text-[#00cc70] text-[0.9rem] font-extrabold bg-[rgba(0,204,112,0.1)] border border-[rgba(0,204,112,0.25)] py-1 px-3 rounded-[20px] mt-[6px]"
                  >
                    <Heart className="w-4 h-4 fill-[#00cc70] text-[#00cc70]" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
