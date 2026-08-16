import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer data-cursor-theme="dark" data-testid="site-footer" className="bg-navy text-bone">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-3xl tracking-tight md:text-4xl">Kausar AquaTech</p>
            <p className="label-caps mt-3 text-bone/50">The Patel and Akbani Co.</p>
            <p className="mt-8 max-w-xs text-sm leading-relaxed text-bone/60">
              RO and mineral water bottles with care in Amravati-Badnera region — plain or with a
              label that carries your name.
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="label-caps text-bone/50">Visit</p>
            <address className="mt-5 space-y-6 text-sm not-italic leading-relaxed text-bone/80">
              <p data-testid="footer-address-main">
                In front of Association school, Jama masjid,
                <br />
                Old Town, Badnera 444701
              </p>
              <p data-testid="footer-address-branch">
                Sub branch — Urdu school,
                <br />
                Nandgaon Khandeshwar 444708
              </p>
            </address>
          </div>

          <div className="md:col-span-3">
            <p className="label-caps text-bone/50">Call</p>
            <div className="mt-5 space-y-3 text-sm">
              <a
                href="tel:+918605629746"
                data-testid="footer-phone-1"
                className="block text-bone/80 transition-colors duration-300 hover:text-bone"
              >
                +91 86056 29746
              </a>
              <a
                href="tel:+919422549948"
                data-testid="footer-phone-2"
                className="block text-bone/80 transition-colors duration-300 hover:text-bone"
              >
                +91 94225 49948
              </a>
            </div>
            <p className="label-caps mt-10 text-bone/50">Pages</p>
            <nav className="mt-5 flex flex-col gap-3 text-sm" aria-label="Footer">
              {["/", "/about", "/order", "/contact"].map((to, i) => (
                <Link
                  key={to}
                  to={to}
                  data-testid={`footer-link-${["home", "about", "order", "contact"][i]}`}
                  className="text-bone/80 transition-colors duration-300 hover:text-bone"
                >
                  {["Home", "About", "Order", "Contact"][i]}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-bone/15 pt-8 text-xs text-bone/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Kausar AquaTech — The Patel and Akbani Co.</p>
          <p>Amravati-Badnera · Nandgaon Khandeshwar, Maharashtra</p>
        </div>
      </div>
    </footer>
  );
}
