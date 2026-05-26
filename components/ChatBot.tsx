"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";

type Message = {
  id: number;
  role: "bot" | "user";
  text: string;
};

let msgCounter = 0;
const nextId = () => ++msgCounter;

const FAQ_RESPONSES: Record<string, string> = {
  hours:      "We're open 24/7! You can access the gym any time. Reception is staffed Mon–Fri 8am–8pm, Sat–Sun 9am–5pm.",
  price:      "Plans start from £29.99/mo (Essential), £44.99/mo (Premium with Sauna), and £59.99/mo (Elite with PT). Visit our Membership page for full details!",
  membership: "We have 3 plans: Essential (£29.99), Premium (£44.99) and Elite (£59.99). All include 24/7 access and the members app. Click 'Join Now' to get started!",
  sauna:      "Yes! Unlimited sauna is included in Premium and Elite memberships — unique to VFT in Tavistock!",
  classes:    "We offer HIIT, Yoga, Spin, Strength, Boxing and more — 20+ classes/week! Check our Classes page for the full timetable.",
  book:       "You can book classes on our Classes page. For PT sessions, visit our Contact page.",
  join:       "Click 'Join Now' at the top, choose your plan, and complete registration on our secure portal. Welcome to the VFT family!",
  location:   "We're in Tavistock, Devon, UK. Check our Contact page for the full address and Google Maps link!",
  contact:    "Email us at hello@vitalityfitnesstavistock.com or call +44 1822 366335. Also on Instagram @vft.tavistock!",
  parking:    "Yes, free parking is available for all members. Visit our Contact page for location details.",
  trial:      "Absolutely! We offer a free first week trial. Visit our Contact page or call +44 1822 366335 to book.",
  pt:         "Our PTs offer 1-to-1 sessions, packages of 5 or 10, or monthly plans. Visit the About page to meet the team and book a free consultation!",
  app:        "Yes! All members get access to our bespoke members app — track workouts, book classes and monitor progress. Details sent on joining!",
  cancel:     "Manage, freeze, or cancel via the Member Portal or by emailing hello@vitalityfitnesstavistock.com. No hidden fees!",
};

function getBotResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("hour") || q.includes("open") || q.includes("time") || q.includes("24"))            return FAQ_RESPONSES.hours;
  if (q.includes("price") || q.includes("cost") || q.includes("how much") || q.includes("£"))        return FAQ_RESPONSES.price;
  if (q.includes("sauna"))                                                                             return FAQ_RESPONSES.sauna;
  if (q.includes("class") || q.includes("timetable") || q.includes("schedule"))                       return FAQ_RESPONSES.classes;
  if (q.includes("membership") || q.includes("plan"))                                                 return FAQ_RESPONSES.membership;
  if (q.includes("join") || q.includes("sign up") || q.includes("register"))                         return FAQ_RESPONSES.join;
  if (q.includes("book"))                                                                              return FAQ_RESPONSES.book;
  if (q.includes("location") || q.includes("where") || q.includes("address"))                        return FAQ_RESPONSES.location;
  if (q.includes("contact") || q.includes("email") || q.includes("phone"))                           return FAQ_RESPONSES.contact;
  if (q.includes("park"))                                                                              return FAQ_RESPONSES.parking;
  if (q.includes("trial") || q.includes("free") || q.includes("try"))                                return FAQ_RESPONSES.trial;
  if (q.includes("personal train") || q.includes(" pt ") || q.includes("trainer"))                   return FAQ_RESPONSES.pt;
  if (q.includes("app") || q.includes("mobile"))                                                      return FAQ_RESPONSES.app;
  if (q.includes("cancel") || q.includes("freeze") || q.includes("stop"))                            return FAQ_RESPONSES.cancel;
  if (q.includes("hi") || q.includes("hello") || q.includes("hey"))
    return "Hey! I'm VFT's assistant. Ask me anything about membership, classes, the sauna, opening hours, personal training and more!";
  return "Great question! I'm not sure about that one — our team would love to help. Call +44 1822 366335 or email hello@vitalityfitnesstavistock.com.";
}

const quickQuestions = [
  "What are your hours?",
  "How much is membership?",
  "Do you have a sauna?",
  "Book a free trial",
];

export default function ChatBot() {
  const pathname = usePathname();
  const [open,    setOpen]    = useState(false);
  const [input,   setInput]   = useState("");
  const [typing,  setTyping]  = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: nextId(), role: "bot", text: "Hi! I'm your VFT assistant. Ask me anything about membership, classes, the sauna, opening hours, or personal training!" },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  if (pathname === "/member-login" || pathname.startsWith("/dashboard")) return null;

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: nextId(), role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: nextId(), role: "bot", text: getBotResponse(text) }]);
      setTyping(false);
    }, 750);
  };

  return (
    <>
      {/* ── Bubble ── */}
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300",
          open
            ? "bg-white border border-[#e2e8f0] text-[#64748b] hover:bg-[#f5f6f8]"
            : "bg-[#1f2937] hover:bg-[#374151] hover:scale-105"
        )}
        aria-label="Open chat"
      >
        {open
          ? <X className="w-5 h-5 text-[#475569]" />
          : <MessageCircle className="w-6 h-6 text-white" strokeWidth={2} />
        }
        {!open && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* ── Chat window ── */}
      <div
        className={clsx(
          "fixed bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] max-w-80 sm:max-w-96 transition-all duration-300 origin-bottom-right",
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.15)] overflow-hidden flex flex-col max-h-130">

          {/* Header */}
          <div className="bg-[#1f2937] border-b border-white/10 px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">VFT Assistant</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                  <span className="text-slate-300 text-xs font-semibold">Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white transition-colors p-1">
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-72.5">
            {messages.map((msg) => (
              <div key={msg.id} className={clsx("flex gap-2", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                <div className={clsx(
                  "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                  msg.role === "bot" ? "bg-[#f5f6f8] border border-[#e5e7eb]" : "bg-[#f1f5f9]"
                )}>
                  {msg.role === "bot"
                    ? <Bot  className="w-3.5 h-3.5 text-[#374151]" />
                    : <User className="w-3.5 h-3.5 text-[#64748b]" />
                  }
                </div>
                <div className={clsx(
                  "max-w-[80%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed",
                  msg.role === "bot"
                    ? "bg-[#f1f5f9] text-[#0f172a] rounded-tl-sm"
                    : "bg-[#1f2937] text-white font-medium rounded-tr-sm"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#f5f6f8] border border-[#e5e7eb] flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-[#374151]" />
                </div>
                <div className="bg-[#f1f5f9] px-3.5 py-3 rounded-xl rounded-tl-sm flex gap-1 items-center">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="w-1.5 h-1.5 bg-[#9ca3af] rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="shrink-0 text-[12px] px-3 py-1.5 rounded-full bg-[#f5f6f8] border border-[#e5e7eb] text-[#374151] font-semibold hover:bg-[#eef0f3] hover:border-[#d1d5db] transition-all cursor-pointer whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[#f1f5f9]">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex gap-2 items-center bg-[#f8fafc] rounded-xl px-4 py-2.5 border border-[#e2e8f0]"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent text-[#0f172a] text-sm outline-none placeholder:text-[#94a3b8]"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-7 h-7 rounded-lg bg-[#1f2937] flex items-center justify-center disabled:opacity-30 hover:bg-[#374151] transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
