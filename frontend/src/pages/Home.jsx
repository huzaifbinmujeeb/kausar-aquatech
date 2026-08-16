import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { ArrowRight } from "lucide-react";
import { Reveal, MaskedLine } from "@/components/Reveal";

const WaterSplash = lazy(() => import("@/components/WaterSplash"));

const SPLASH_FALLBACK =
  "https://images.unsplash.com/photo-1609743307371-9495ca150e6c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGRyb3BsZXQlMjBjcm93biUyMHNwbGFzaHxlbnwwfHx8fDE3ODY3OTk5OTF8MA&ixlib=rb-4.1.0&q=85";

const supportsWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
  } catch {
    return false;
  }
};

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const services = [
  {
    n: "01",
    title: "Wholesale and retail",
    copy: "General and customised bottles in 250 ml, 500 ml, and 1 L — supplied to shops, events, and institutions.",
  },
  {
    n: "02",
    title: "All Varieties of Water",
    copy: "RO purified,Mineral Added Water,Flavoured Water and Scented Water, bottled under strict hygiene standards.",
  },
  {
    n: "03",
    title: "Custom labels",
    copy: "Your name, your colours, your occasion — a label designed and printed for weddings, brands, and businesses.",
  },
];

const marqueeItems = [
  "RO & Mineral Water",
  "Flavoured & Scented Water",
  "250 ml · 500 ml · 1 L",
  "Custom Labels",
  "Wholesale & Retail",
  
];

export default function Home() {
  const useFallback = !supportsWebGL() || reducedMotion();

  return (
    <div data-testid="home-page">
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          {useFallback ? (
            <img
              src={SPLASH_FALLBACK}
              alt=""
              className="h-full w-full object-cover opacity-30"
              loading="eager"
            />
          ) : (
            <Suspense
              fallback={
                <img src={SPLASH_FALLBACK} alt="" className="h-full w-full object-cover opacity-30" />
              }
            >
              <WaterSplash opacity={0.55} />
            </Suspense>
          )}
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-24 pt-40 md:px-12 lg:px-24">
          <MaskedLine delay={0.2}>
            <span className="label-caps text-silver" data-testid="hero-eyebrow">
              The Patel and Akbani Co. — Amravati, Maharashtra
            </span>
          </MaskedLine>

          <h1 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tighter text-navy sm:text-6xl lg:text-[6.5vw]">
            <MaskedLine delay={0.35}>Water, the way </MaskedLine>
            <MaskedLine delay={0.5}>
               <em className="font-normal italic">it should be.</em>
            </MaskedLine>
          </h1>

          <MaskedLine delay={0.7} className="mt-10 max-w-md">
            <p className="text-base leading-relaxed text-ink md:text-lg" data-testid="hero-subtext">
              RO and mineral water in 250 ml, 500 ml, and 1 L — supplied plain, or
              bottled under your own label.
            </p>
          </MaskedLine>

          <MaskedLine delay={0.85}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link
                to="/order"
                data-testid="hero-order-btn"
                className="group inline-flex items-center gap-2 rounded-sm bg-navy px-8 py-4 text-sm text-bone transition-colors duration-300 hover:bg-navy/90"
              >
                Order now
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/order"
                data-testid="hero-design-btn"
                className="rounded-sm border border-navy px-8 py-4 text-sm text-navy transition-colors duration-300 hover:bg-navy hover:text-bone"
              >
                Design a label
              </Link>
            </div>
          </MaskedLine>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2" aria-hidden="true">
          <div className="label-caps text-silver">Scroll</div>
        </div>
      </section>

      {/* Editorial marquee */}
      <div className="border-y border-line py-6" data-testid="home-marquee">
        <Marquee speed={20} gradient={false} aria-hidden="true">
          {marqueeItems.map((item) => (
            <span key={item} className="mx-10 flex items-center gap-10">
              <span className="font-serif text-2xl italic text-navy/70 md:text-3xl">{item}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-silver" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Services */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32 lg:px-24 lg:py-40">
        <Reveal>
          <p className="label-caps text-silver">What we do</p>
          <h2 className="mt-6 max-w-2xl font-serif text-3xl leading-[1.1] tracking-tight text-navy md:text-4xl lg:text-5xl">
            What leaves our plant, and why it matters
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px border border-line bg-line md:mt-20 md:grid-cols-3" data-testid="services-strip">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12} className="group bg-paper p-10 transition-colors duration-500 hover:bg-bone md:p-12">
              <p className="font-serif text-sm italic text-silver">{s.n}</p>
              <h3 className="mt-6 text-xl font-medium tracking-tight text-navy md:text-2xl">
                {s.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink">{s.copy}</p>
              <div className="mt-8 h-px w-8 bg-silver transition-all duration-500 group-hover:w-16 group-hover:bg-navy" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-line bg-bone">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28 lg:px-24">
          <Reveal>
            <p
              className="mx-auto max-w-4xl text-center font-serif text-2xl leading-snug tracking-tight text-navy md:text-4xl"
              data-testid="trust-statement"
            >
              "Every bottle leaves our plant sealed, tested, and traceable — the
              same standard since our first crate."
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-14 grid grid-cols-3 gap-8 text-center" data-testid="trust-stats">
              {[
                ["3", "Bottle sizes"],
                ["4+", "Water varieties"],
                ["2", "Branches served"],
              ].map(([num, label]) => (
                <div key={label}>
                  <p className="font-serif text-4xl text-navy md:text-5xl">{num}</p>
                  <p className="label-caps mt-3 text-inklight">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer CTA */}
      <section data-cursor-theme="dark" className="bg-navy" data-testid="home-footer-cta">
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40 lg:px-24">
          <Reveal>
            <p className="label-caps text-bone/50">Ready when you are</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/order"
              data-testid="footer-cta-link"
              className="group mt-8 block font-serif text-5xl leading-[1.05] tracking-tighter text-bone sm:text-6xl lg:text-[6vw]"
            >
              Start your
              <span className="ml-4 italic text-bone/60 transition-colors duration-500 group-hover:text-bone">
                order
              </span>
              <ArrowRight
                className="ml-6 inline-block h-[0.55em] w-[0.55em] transition-transform duration-500 group-hover:translate-x-3"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-md text-sm leading-relaxed text-bone/60">
              Choose a size, pick a variety, and put your name on the label —
              three steps, one quote.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
