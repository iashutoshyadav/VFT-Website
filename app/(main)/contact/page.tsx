"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Instagram } from "@/components/icons";

const contactInfo = [
  { icon: Phone,     label: "Phone",     value: "+44 1822 366335",                      href: "tel:+441822366335" },
  { icon: Mail,      label: "Email",     value: "hello@vitalityfitnesstavistock.com",   href: "mailto:hello@vitalityfitnesstavistock.com" },
  { icon: MapPin,    label: "Location",  value: "Tavistock, Devon, UK",                 href: "https://maps.google.com/?q=Tavistock,+Devon" },
  { icon: Clock,     label: "Hours",     value: "Open 24/7 · Staffed Mon–Fri 8am–8pm", href: null },
  { icon: Instagram, label: "Instagram", value: "@vft.tavistock",                       href: "https://www.instagram.com/vft.tavistock/" },
];

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", interest: "membership", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Could not send message. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-[#f5f6f8] border border-[#d1d5db] flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-[#374151]" />
        </div>
        <h3 className="text-[#0f172a] text-2xl font-black mb-2">Message Sent!</h3>
        <p className="text-[#64748b]">We&apos;ll be in touch within 2 hours. Check your inbox.</p>
      </div>
    );
  }

  const inputClass = "w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-[#0f172a] text-sm outline-none focus:border-[#374151] focus:bg-white placeholder:text-[#94a3b8] transition-all";
  const labelClass = "block text-[#475569] text-xs font-semibold uppercase tracking-wider mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Your Name *</label>
          <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Smith" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Phone</label>
        <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+44 7XXX XXXXXX" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>I&apos;m interested in</label>
        <select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })} className={inputClass}>
          <option value="membership">Membership</option>
          <option value="trial">Free Trial</option>
          <option value="personal-training">Personal Training</option>
          <option value="classes">Group Classes</option>
          <option value="tour">Gym Tour</option>
          <option value="other">Other Enquiry</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us how we can help..." className={`${inputClass} resize-none`} />
      </div>
      {error && (
        <p className="text-[#ef4444] text-sm bg-[#fef2f2] border border-[#fecaca] rounded-lg px-4 py-3">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center text-[15px] py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Sending…" : <><Send className="w-4 h-4" /> Send Message</>}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-max px-4">
          <div className="section-tag">Contact Us</div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0f172a] mt-3 mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-[#64748b] text-base sm:text-xl max-w-xl mx-auto">
            Questions? Want to book a tour? Just want to say hi? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Body */}
      <section id="book" className="section-padding bg-white px-4">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Contact info */}
            <div>
              <h2 className="text-3xl font-black text-[#0f172a] mb-8">
                We&apos;re here <span className="gradient-text">24/7</span>
              </h2>
              <div className="space-y-3 mb-10">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="card flex items-center gap-4 p-4">
                      <div className="w-10 h-10 rounded-xl bg-[#f5f6f8] border border-[#e5e7eb] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#374151]" />
                      </div>
                      <div>
                        <div className="text-[#94a3b8] text-xs uppercase tracking-wider mb-0.5">{item.label}</div>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="text-[#0f172a] text-sm font-medium hover:text-[#374151] transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-[#0f172a] text-sm font-medium">{item.value}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map embed */}
              <div className="rounded-2xl overflow-hidden border border-[#e2e8f0] h-52">
                <iframe
                  title="VFT Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10316.123!2d-4.1430!3d50.5503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486cc3d2e3c9f4a5%3A0x4e4a2cdf6b4a5b3e!2sTavistock%2C%20Devon!5e0!3m2!1sen!2suk!4v1234567890"
                  width="100%"
                  height="100%"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <div className="card p-8">
              <h2 className="text-2xl font-black text-[#0f172a] mb-1.5">Send Us a Message</h2>
              <p className="text-[#94a3b8] text-sm mb-6">We respond within 2 hours during staffed hours.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
