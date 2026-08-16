import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Phone } from "lucide-react";
import { Reveal, MaskedLine } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !message.trim()) {
      toast.error("Please fill in all three fields.");
      return;
    }
    setSending(true);
    try {
      await axios.post(`${API}/contact`, {
        name: name.trim(),
        contact: contact.trim(),
        message: message.trim(),
      });
      toast.success("Message sent. We will get back to you shortly.");
      setName("");
      setContact("");
      setMessage("");
    } catch {
      toast.error("Could not send the message. Please call us instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-32 pt-48 md:px-12 lg:px-24" data-testid="contact-page">
      <MaskedLine delay={0.2}>
        <span className="label-caps text-silver">Contact</span>
      </MaskedLine>
      <h1 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tighter text-navy sm:text-6xl lg:text-[5.5vw]">
        <MaskedLine delay={0.35}>Get in</MaskedLine>
        <MaskedLine delay={0.5}>
          <em className="font-normal italic">touch.</em>
        </MaskedLine>
      </h1>

      <div className="mt-20 grid gap-16 md:mt-28 lg:grid-cols-2 lg:gap-24">
        {/* Form */}
        <Reveal>
          <form onSubmit={submit} className="space-y-10" data-testid="contact-form" noValidate>
            <div>
              <label htmlFor="contact-name" className="label-caps text-inklight">Name</label>
              <input
                id="contact-name"
                data-testid="contact-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-3 w-full border-b border-silver bg-transparent px-0 py-3 text-navy focus:border-navy focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="contact-detail" className="label-caps text-inklight">Phone or email</label>
              <input
                id="contact-detail"
                data-testid="contact-detail-input"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="mt-3 w-full border-b border-silver bg-transparent px-0 py-3 text-navy focus:border-navy focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="label-caps text-inklight">Message</label>
              <textarea
                id="contact-message"
                data-testid="contact-message-input"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-3 w-full resize-none border-b border-silver bg-transparent px-0 py-3 text-navy focus:border-navy focus:outline-none"
              />
            </div>
            <button
              type="submit"
              data-testid="contact-submit-btn"
              disabled={sending}
              className="rounded-sm bg-navy px-8 py-4 text-sm text-bone transition-colors duration-300 hover:bg-navy/90 disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
        </Reveal>

        {/* Details */}
        <div className="space-y-14">
          <Reveal delay={0.1}>
            <div>
              <p className="label-caps text-silver">Call us</p>
              <div className="mt-5 space-y-3">
                {[
                  ["+918605629746", "+91 86056 29746", "contact-phone-1"],
                  ["+919422549948", "+91 94225 49948", "contact-phone-2"],
                ].map(([href, label, id]) => (
                  <a
                    key={href}
                    href={`tel:${href}`}
                    data-testid={id}
                    className="group flex items-center gap-3 font-serif text-2xl text-navy transition-colors duration-300 hover:text-navy/70 md:text-3xl"
                  >
                    <Phone size={18} className="text-silver transition-colors duration-300 group-hover:text-navy" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid gap-10 sm:grid-cols-2">
              <div data-testid="contact-address-main">
                <p className="label-caps text-silver">Main branch</p>
                <address className="mt-4 text-sm not-italic leading-relaxed text-ink">
                  In front of Association school,
                  <br />
                  Jama masjid, Old Town,
                  <br />
                  Badnera 444701
                </address>
              </div>
              <div data-testid="contact-address-branch">
                <p className="label-caps text-silver">Sub branch</p>
                <address className="mt-4 text-sm not-italic leading-relaxed text-ink">
                  Urdu school,
                  <br />
                  Nandgaon Khandeshwar 444708
                </address>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="overflow-hidden rounded-sm border border-line" data-testid="contact-map">
              <iframe
                title="Kausar AquaTech — Badnera branch map"
                src="https://www.google.com/maps?q=Jama%20Masjid%2C%20Juni%20Basti%2C%20Badnera%2C%20Maharashtra%20444701&output=embed"
                className="map-brand-filter h-72 w-full md:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
