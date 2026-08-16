import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/order", label: "Order" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12 lg:px-24">
        <Link to="/" data-testid="header-logo" className="leading-none" onClick={() => setOpen(false)}>
          <span className="font-serif text-xl tracking-tight text-navy md:text-2xl">
            Kausar AquaTech
          </span>
          <span className="label-caps mt-1 block text-silver">The Patel and Akbani Co.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `text-sm transition-colors duration-300 ${
                  isActive ? "text-navy" : "text-ink hover:text-navy"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/order"
            data-testid="header-quote-btn"
            className="rounded-sm bg-navy px-6 py-2.5 text-sm text-bone transition-colors duration-300 hover:bg-navy/90"
          >
            Get a quote
          </Link>
        </nav>

        <button
          data-testid="mobile-menu-btn"
          className="p-2 text-navy md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-line bg-paper px-6 pb-6 pt-4 md:hidden"
          aria-label="Mobile"
          data-testid="mobile-nav"
        >
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-serif text-2xl ${isActive ? "text-navy" : "text-ink"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/order"
              data-testid="mobile-quote-btn"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block w-fit rounded-sm bg-navy px-8 py-3 text-sm text-bone"
            >
              Get a quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
