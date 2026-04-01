import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, Phone, Star } from "lucide-react";
import { motion } from "motion/react";
import ProductCard from "../components/ProductCard";
import { SAMPLE_PRODUCTS } from "../data/sampleProducts";
import { useFeaturedProducts } from "../hooks/useQueries";

export default function HomePage() {
  const { data: featuredProducts, isLoading } = useFeaturedProducts();
  const displayProducts =
    featuredProducts && featuredProducts.length > 0
      ? featuredProducts
      : SAMPLE_PRODUCTS.filter((p) => p.featured);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "85vh" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-living-room.dim_1400x700.jpg')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.19 0.045 30 / 0.78) 0%, oklch(0.19 0.045 30 / 0.4) 100%)",
          }}
        />
        <div className="relative z-10 flex items-center justify-center min-h-[85vh] px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-center max-w-2xl"
          >
            <p
              className="eyebrow mb-4"
              style={{ color: "oklch(0.70 0.12 65)" }}
            >
              Premium Furniture Showroom
            </p>
            <h1
              className="font-playfair text-5xl md:text-7xl font-semibold leading-tight mb-6"
              style={{ color: "oklch(0.978 0.006 80)" }}
            >
              Crafted for
              <br />
              <em style={{ color: "oklch(0.70 0.12 65)" }}>Timeless</em> Living
            </h1>
            <p
              className="font-inter text-lg mb-8 max-w-lg mx-auto leading-relaxed"
              style={{ color: "oklch(0.85 0.012 70)" }}
            >
              Discover premium furniture that transforms your home into a
              sanctuary of elegance and comfort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="btn-gold inline-flex items-center gap-2 text-base px-8 py-3.5"
                data-ocid="hero.primary_button"
              >
                Explore Collection <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/919370153364?text=Hello%2C%20I'm%20interested%20in%20your%20furniture."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-ivory inline-flex items-center gap-2 text-base px-8 py-3.5"
                data-ocid="hero.secondary_button"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span
            className="font-inter text-xs tracking-widest uppercase"
            style={{ color: "oklch(0.85 0.012 70)" }}
          >
            Scroll
          </span>
          <div
            className="w-px h-8"
            style={{ background: "oklch(0.70 0.12 65)" }}
          />
        </motion.div>
      </section>

      {/* Featured Collections */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: "oklch(0.978 0.006 80)" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-3">Handpicked for You</p>
            <h2 className="section-title">Featured Collections</h2>
          </motion.div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {["s1", "s2", "s3", "s4"].map((sk) => (
                <div
                  key={sk}
                  className="rounded-lg overflow-hidden"
                  style={{ border: "1px solid oklch(0.87 0.02 65)" }}
                >
                  <div
                    className="aspect-[4/3] animate-pulse"
                    style={{ backgroundColor: "oklch(0.90 0.015 70)" }}
                  />
                  <div className="p-4 space-y-2">
                    <div
                      className="h-3 w-16 rounded animate-pulse"
                      style={{ backgroundColor: "oklch(0.90 0.015 70)" }}
                    />
                    <div
                      className="h-5 w-3/4 rounded animate-pulse"
                      style={{ backgroundColor: "oklch(0.90 0.015 70)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayProducts.slice(0, 4).map((product, i) => (
                <ProductCard
                  key={String(product.id)}
                  product={product}
                  index={i}
                />
              ))}
            </div>
          )}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/products"
              className="btn-gold inline-flex items-center gap-2"
              data-ocid="featured.primary_button"
            >
              View All Products <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: "oklch(0.95 0.018 80)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow mb-3">Our Story</p>
            <h2 className="section-title mb-6">
              Where Artistry Meets Excellence
            </h2>
            <p
              className="font-inter text-base leading-relaxed mb-4"
              style={{ color: "oklch(0.44 0.038 35)" }}
            >
              Prince Furniture has been Amravati’s most trusted furniture
              destination since 2005. We combine traditional craftsmanship with
              contemporary design to create pieces that last generations.
            </p>
            <p
              className="font-inter text-base leading-relaxed mb-8"
              style={{ color: "oklch(0.44 0.038 35)" }}
            >
              Every piece is crafted with premium solid wood, premium fabrics,
              and finished with meticulous attention to detail.
            </p>
            <Link
              to="/about"
              className="btn-gold inline-flex items-center gap-2"
              data-ocid="about.primary_button"
            >
              Our Story <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <img
              src="/assets/generated/about-craftsmanship.dim_800x600.jpg"
              alt="Craftsmanship at Prince Furniture"
              className="rounded-lg w-full object-cover shadow-luxury"
              style={{ maxHeight: "440px" }}
            />
            <div
              className="absolute -bottom-4 -left-4 rounded-lg p-4 shadow-luxury"
              style={{
                backgroundColor: "oklch(0.30 0.065 30)",
                color: "oklch(0.95 0.018 80)",
              }}
            >
              <div
                className="font-playfair text-3xl font-bold"
                style={{ color: "oklch(0.70 0.12 65)" }}
              >
                20+
              </div>
              <div className="font-inter text-sm">Years of Craftsmanship</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: "oklch(0.978 0.006 80)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-6">Testimonial</p>
            <div className="flex justify-center gap-1 mb-6">
              {["st1", "st2", "st3", "st4", "st5"].map((sk) => (
                <Star
                  key={sk}
                  size={20}
                  fill="oklch(0.70 0.12 65)"
                  style={{ color: "oklch(0.70 0.12 65)" }}
                />
              ))}
            </div>
            <blockquote
              className="font-playfair text-2xl md:text-3xl italic leading-relaxed mb-6"
              style={{ color: "oklch(0.30 0.065 30)" }}
            >
              “Prince Furniture transformed our home completely. The quality is
              exceptional — every piece feels like it was made with genuine care
              and love.”
            </blockquote>
            <p
              className="font-inter font-medium"
              style={{ color: "oklch(0.44 0.038 35)" }}
            >
              — Priya Sharma, Amravati
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/about-craftsmanship.dim_800x600.jpg')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "oklch(0.19 0.045 30 / 0.85)" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="eyebrow mb-4"
              style={{ color: "oklch(0.70 0.12 65)" }}
            >
              Visit Our Showroom
            </p>
            <h2
              className="font-playfair text-4xl md:text-5xl font-semibold mb-4"
              style={{ color: "oklch(0.95 0.018 80)" }}
            >
              Come See It in Person
            </h2>
            <p
              className="font-inter text-base mb-8"
              style={{ color: "oklch(0.80 0.015 60)" }}
            >
              Visit us at Habib Nagar, Amravati and experience our furniture
              firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919370153364?text=Hello%2C%20I'd%20like%20to%20visit%20your%20showroom."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 justify-center"
                data-ocid="cta.primary_button"
              >
                <Phone size={16} /> Chat on WhatsApp
              </a>
              <Link
                to="/contact"
                className="btn-outline-ivory inline-flex items-center gap-2 justify-center"
                data-ocid="cta.secondary_button"
              >
                <MapPin size={16} /> Get Directions
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {(
                [
                  { Icon: MapPin, label: "Habib Nagar, Amravati" },
                  { Icon: Clock, label: "11 AM – 10 PM Daily" },
                  { Icon: Phone, label: "+91 93701 53364" },
                ] as const
              ).map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <Icon size={20} style={{ color: "oklch(0.70 0.12 65)" }} />
                  <span
                    className="font-inter text-xs text-center"
                    style={{ color: "oklch(0.80 0.015 60)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
