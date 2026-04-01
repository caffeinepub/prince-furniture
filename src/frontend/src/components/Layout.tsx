import { Link, useRouter } from "@tanstack/react-router";
import {
  Clock,
  Crown,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Search,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "oklch(0.978 0.006 80)" }}
    >
      {/* Utility bar */}
      <div
        className="w-full py-2 px-4 text-xs font-inter"
        style={{
          backgroundColor: "oklch(0.23 0.055 30)",
          color: "oklch(0.95 0.018 80)",
        }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span style={{ color: "oklch(0.70 0.12 65)" }}>
            ✦ Premium Furniture Showroom — Habib Nagar, Amravati
          </span>
          <div className="hidden md:flex items-center gap-4">
            <span>11:00 AM – 10:00 PM</span>
            <span style={{ color: "oklch(0.70 0.12 65)" }}>|</span>
            <a
              href="https://wa.me/919370153364"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "oklch(0.70 0.12 65)" }}
              className="hover:underline"
            >
              +91 93701 53364
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header
        className="w-full sticky top-0 z-50"
        style={{
          backgroundColor: "oklch(0.978 0.006 80)",
          borderBottom: "1px solid oklch(0.87 0.02 65)",
          boxShadow: "0 2px 16px oklch(0.19 0.045 30 / 0.06)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            data-ocid="nav.link"
            className="flex items-center gap-3 group"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ backgroundColor: "oklch(0.30 0.065 30)" }}
            >
              <Crown size={20} style={{ color: "oklch(0.70 0.12 65)" }} />
            </div>
            <div>
              <div
                className="font-playfair font-bold text-lg leading-tight tracking-wide"
                style={{ color: "oklch(0.30 0.065 30)" }}
              >
                Prince Furniture
              </div>
              <div
                className="font-inter text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "oklch(0.44 0.038 35)" }}
              >
                Premium Showroom
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-ocid="nav.link"
                className="font-inter text-sm font-medium transition-colors duration-200 relative group"
                style={{
                  color:
                    currentPath === link.href
                      ? "oklch(0.30 0.065 30)"
                      : "oklch(0.44 0.038 35)",
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-0.5 transition-all duration-300"
                  style={{
                    backgroundColor: "oklch(0.70 0.12 65)",
                    width: currentPath === link.href ? "100%" : "0%",
                  }}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/products"
              data-ocid="nav.link"
              className="hidden md:flex flex-col items-center gap-0.5 p-2 rounded-lg hover:bg-beige transition-colors"
            >
              <Search size={18} style={{ color: "oklch(0.30 0.065 30)" }} />
              <span
                className="font-inter text-[10px]"
                style={{ color: "oklch(0.44 0.038 35)" }}
              >
                Search
              </span>
            </Link>
            <a
              href="https://wa.me/919370153364?text=Hello%2C%20I'm%20interested%20in%20your%20furniture."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block btn-gold text-sm px-4 py-2"
            >
              WhatsApp
            </a>
            <button
              type="button"
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden"
              style={{
                borderTop: "1px solid oklch(0.87 0.02 65)",
                backgroundColor: "oklch(0.978 0.006 80)",
              }}
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    data-ocid="nav.link"
                    className="font-inter text-base py-2 border-b"
                    style={{
                      color: "oklch(0.30 0.065 30)",
                      borderColor: "oklch(0.87 0.02 65)",
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://wa.me/919370153364"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-center mt-2"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer style={{ backgroundColor: "oklch(0.23 0.055 30)" }}>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "oklch(0.70 0.12 65 / 0.15)" }}
                >
                  <Crown size={18} style={{ color: "oklch(0.70 0.12 65)" }} />
                </div>
                <span
                  className="font-playfair font-bold text-lg"
                  style={{ color: "oklch(0.95 0.018 80)" }}
                >
                  Prince Furniture
                </span>
              </div>
              <p
                className="font-inter text-sm leading-relaxed"
                style={{ color: "oklch(0.65 0.03 40)" }}
              >
                Crafting timeless furniture for discerning homes since 2005.
              </p>
            </div>
            <div>
              <h4
                className="font-inter text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                style={{ color: "oklch(0.70 0.12 65)" }}
              >
                Categories
              </h4>
              <ul className="space-y-2">
                {[
                  "Beds",
                  "Cupboards",
                  "Dining Sets",
                  "Coffee Tables",
                  "Chairs",
                  "Sofas",
                ].map((cat) => (
                  <li key={cat}>
                    <Link
                      to="/products"
                      className="font-inter text-sm hover:underline"
                      style={{ color: "oklch(0.72 0.025 40)" }}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                className="font-inter text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                style={{ color: "oklch(0.70 0.12 65)" }}
              >
                Visit Us
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin
                    size={14}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "oklch(0.70 0.12 65)" }}
                  />
                  <span
                    className="font-inter text-sm"
                    style={{ color: "oklch(0.72 0.025 40)" }}
                  >
                    Habib Nagar, Amravati,
                    <br />
                    Maharashtra 444601
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock
                    size={14}
                    className="flex-shrink-0"
                    style={{ color: "oklch(0.70 0.12 65)" }}
                  />
                  <span
                    className="font-inter text-sm"
                    style={{ color: "oklch(0.72 0.025 40)" }}
                  >
                    11:00 AM – 10:00 PM
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone
                    size={14}
                    className="flex-shrink-0"
                    style={{ color: "oklch(0.70 0.12 65)" }}
                  />
                  <a
                    href="https://wa.me/919370153364"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-inter text-sm hover:underline"
                    style={{ color: "oklch(0.72 0.025 40)" }}
                  >
                    +91 93701 53364
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4
                className="font-inter text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                style={{ color: "oklch(0.70 0.12 65)" }}
              >
                Follow Us
              </h4>
              <a
                href="https://instagram.com/princefurnitureamravati"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.link"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all"
                style={{
                  borderColor: "oklch(0.70 0.12 65 / 0.4)",
                  color: "oklch(0.72 0.025 40)",
                }}
              >
                <Instagram size={16} style={{ color: "oklch(0.70 0.12 65)" }} />
                <span className="font-inter text-sm">
                  @princefurnitureamravati
                </span>
              </a>
            </div>
          </div>
          <div
            className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs font-inter"
            style={{
              borderTop: "1px solid oklch(0.35 0.04 30)",
              color: "oklch(0.55 0.02 40)",
            }}
          >
            <span>
              © {new Date().getFullYear()} Prince Furniture. All rights
              reserved.
            </span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Built with ♥ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
