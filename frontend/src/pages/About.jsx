import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal, MaskedLine } from "@/components/Reveal";

const IMG_FACILITY =
  "https://images.unsplash.com/photo-1780882899461-0b158f457b44?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHx3YXRlciUyMG1hbnVmYWN0dXJpbmclMjBmYWNpbGl0eSUyMGNsZWFufGVufDB8fHx8MTc4Njc5OTk5MXww&ixlib=rb-4.1.0&q=85";
const IMG_BOTTLE =
  "https://images.unsplash.com/photo-1764694187688-454d172e5ca0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NjV8MHwxfHNlYXJjaHwyfHxwcmVtaXVtJTIwd2F0ZXIlMjBib3R0bGUlMjBtaW5pbWFsfGVufDB8fHx8MTc4Njc5OTk5MXww&ixlib=rb-4.1.0&q=85";
const IMG_SPLASH =
  "https://images.unsplash.com/photo-1609743307371-9495ca150e6c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGRyb3BsZXQlMjBjcm93biUyMHNwbGFzaHxlbnwwfHx8fDE3ODY3OTk5OTF8MA&ixlib=rb-4.1.0&q=85";

const chapters = [
  {
    n: "01",
    title: "Who we are",
    copy: "Kausar AquaTech is led by Founder Huzaif Ur Rahman Patel and Co-founder Altamash Akbani,building a modern and trusted name in the water industry since 2024.Based in Amravati-Badnera, we provide quality bottled water and customised solutions for retail,businesses, events, and functions—with a focus on consistency and dependable service.",
  },
  {
    n: "02",
    title: "What we make",
    copy: "RO-purified and mineral water in three sizes — 250 ml, 500 ml, and 1 L — alongside scented and flavoured varieties. Every bottle can carry our label or yours, printed to your design for weddings, hotels, events, and retail.",
  },
  {
    n: "03",
    title: "How we work",
    copy: "Small batches, short supply lines, and direct phone contact with the people who run the plant. No call centres, no middlemen — you speak to the family that fills the bottles.",
  },
];

const standards = [
  "Multi-stage reverse osmosis with mineral re-balancing",
  "Food-grade PET, sealed and batch-coded at the line",
  "Daily quality checks on pH, TDS, and turbidity",
  "Sanitised bottling hall with hands-free capping",
];

export default function About() {
  return (
    <div data-testid="about-page">
      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 pt-48 md:px-12 md:pb-32 lg:px-24">
        <MaskedLine delay={0.2}>
          <span className="label-caps text-silver">About — The Patel and Akbani Co.</span>
        </MaskedLine>
        <h1 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tighter text-navy sm:text-6xl lg:text-[5.5vw]">
          <MaskedLine delay={0.35}>A family name</MaskedLine>
          <MaskedLine delay={0.5}>
            on <em className="font-normal italic">every bottle.</em>
          </MaskedLine>
        </h1>
        <MaskedLine delay={0.7} className="mt-10 max-w-lg">
          <p className="text-base leading-relaxed text-ink md:text-lg">
            Kausar AquaTech is how The Patel and Akbani Co. signs its work — water
            manufactured close to home, to a standard we would serve our own guests.
          </p>
        </MaskedLine>
      </section>

      {/* Manifesto chapters */}
      <section className="border-t border-line">
        {chapters.map((c) => (
          <div key={c.n} className="border-b border-line" data-testid={`chapter-${c.n}`}>
            <div className="mx-auto grid max-w-[1400px] gap-8 px-6 py-20 md:grid-cols-12 md:px-12 md:py-28 lg:px-24">
              <div className="md:col-span-3">
                <Reveal>
                  <span className="font-serif text-6xl italic text-line md:text-8xl">{c.n}</span>
                </Reveal>
              </div>
              <div className="md:col-span-6">
                <Reveal delay={0.1}>
                  <h2 className="font-serif text-3xl tracking-tight text-navy md:text-4xl">
                    {c.title}
                  </h2>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-ink">{c.copy}</p>
                </Reveal>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Manufacturing & quality */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32 lg:px-24 lg:py-40">
        <Reveal>
          <p className="label-caps text-silver">Manufacturing and quality</p>
          <h2 className="mt-6 max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight text-navy md:text-4xl lg:text-5xl">
            Clear water is a process, not a promise
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-2 md:gap-16">
          <Reveal className="overflow-hidden rounded-sm">
            <img
              src={IMG_FACILITY}
              alt="Water manufacturing and storage facility"
              className="h-full max-h-[70vh] w-full object-cover"
              loading="lazy"
              data-testid="facility-image"
            />
          </Reveal>
          <div className="flex flex-col justify-center">
            <ul className="divide-y divide-line" data-testid="standards-list">
              {standards.map((s, i) => (
                <Reveal key={s} delay={i * 0.08}>
                  <li className="flex items-baseline gap-6 py-6">
                    <span className="font-serif text-sm italic text-silver">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base text-navy md:text-lg">{s}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* Photo strip */}
        <div className="mt-20 grid grid-cols-2 gap-6 md:mt-28 md:grid-cols-3" data-testid="photo-strip">
          {[
            { src: IMG_BOTTLE, alt: "Premium water bottle", cls: "md:mt-16" },
            { src: IMG_SPLASH, alt: "Water crown splash", cls: "" },
            { src: IMG_FACILITY, alt: "Bottling line detail", cls: "md:mt-24 hidden md:block" },
          ].map((img, i) => (
            <Reveal key={i} delay={i * 0.12} className={img.cls}>
              <div className="overflow-hidden rounded-sm">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-bone">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-10 px-6 py-24 md:flex-row md:items-center md:justify-between md:px-12 lg:px-24">
          <Reveal>
            <h2 className="max-w-xl font-serif text-3xl leading-[1.1] tracking-tight text-navy md:text-4xl">
              See your name on a bottle
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink">
              Three steps on the Order page — size, variety, label — and we come
              back with a quote.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              to="/order"
              data-testid="about-cta-btn"
              className="group inline-flex items-center gap-2 rounded-sm bg-navy px-8 py-4 text-sm text-bone transition-colors duration-300 hover:bg-navy/90"
            >
              Go to Order
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
