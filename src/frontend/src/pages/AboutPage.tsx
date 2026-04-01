import { Award, Clock, Heart, Leaf, MapPin } from "lucide-react";
import { motion } from "motion/react";

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: "Premium Quality",
      desc: "Only the finest solid woods, premium fabrics, and hardware go into every Prince Furniture piece.",
    },
    {
      icon: Heart,
      title: "Made with Passion",
      desc: "Our craftsmen pour decades of expertise and genuine love into every joint, curve, and finish.",
    },
    {
      icon: Leaf,
      title: "Sustainable Sourcing",
      desc: "We source responsibly — using sustainably harvested timber and eco-friendly finishes wherever possible.",
    },
  ];

  return (
    <div style={{ backgroundColor: "oklch(0.978 0.006 80)" }}>
      <section
        className="py-20 px-4 text-center"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.95 0.018 80), oklch(0.978 0.006 80))",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-3">Our Story</p>
          <h1 className="section-title" style={{ fontSize: "2.75rem" }}>
            About Prince Furniture
          </h1>
          <p
            className="font-inter text-base mt-4 max-w-xl mx-auto"
            style={{ color: "oklch(0.44 0.038 35)" }}
          >
            Two decades of crafting premium furniture for Amravati’s finest
            homes.
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="section-title mb-6">The Prince Furniture Story</h2>
            <p
              className="font-inter text-base leading-relaxed mb-4"
              style={{ color: "oklch(0.44 0.038 35)" }}
            >
              Founded in 2005 in the heart of Amravati, Prince Furniture began
              as a small workshop dedicated to crafting furniture that would
              stand the test of time. What started as a passion project has
              grown into Amravati’s most trusted premium furniture destination.
            </p>
            <p
              className="font-inter text-base leading-relaxed mb-4"
              style={{ color: "oklch(0.44 0.038 35)" }}
            >
              Our founder believed that great furniture is more than just
              utility — it is an expression of personality, a canvas for living.
              Every piece we create carries this philosophy, blending
              traditional Indian craftsmanship with contemporary design.
            </p>
            <p
              className="font-inter text-base leading-relaxed"
              style={{ color: "oklch(0.44 0.038 35)" }}
            >
              Today, thousands of Amravati homes carry the Prince Furniture
              legacy — from bedroom suites and dining ensembles to statement
              sofas and bespoke wardrobes.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/assets/generated/about-craftsmanship.dim_800x600.jpg"
              alt="Furniture Craftsmanship"
              className="rounded-lg w-full object-cover shadow-luxury"
            />
          </motion.div>
        </div>
      </section>

      <section
        className="py-16 px-4"
        style={{ backgroundColor: "oklch(0.95 0.018 80)" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-3">What We Stand For</p>
            <h2 className="section-title">Our Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="rounded-lg p-8 text-center"
                style={{
                  backgroundColor: "oklch(0.978 0.006 80)",
                  border: "1px solid oklch(0.87 0.02 65)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "oklch(0.70 0.12 65 / 0.15)" }}
                >
                  <val.icon
                    size={22}
                    style={{ color: "oklch(0.70 0.12 65)" }}
                  />
                </div>
                <h3
                  className="font-playfair text-xl font-semibold mb-3"
                  style={{ color: "oklch(0.30 0.065 30)" }}
                >
                  {val.title}
                </h3>
                <p
                  className="font-inter text-sm leading-relaxed"
                  style={{ color: "oklch(0.44 0.038 35)" }}
                >
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8 md:p-12 text-center"
            style={{ backgroundColor: "oklch(0.30 0.065 30)" }}
          >
            <p
              className="eyebrow mb-4"
              style={{ color: "oklch(0.70 0.12 65)" }}
            >
              Find Us
            </p>
            <h2
              className="font-playfair text-3xl font-semibold mb-8"
              style={{ color: "oklch(0.95 0.018 80)" }}
            >
              Visit Our Showroom
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center gap-2">
                <MapPin size={24} style={{ color: "oklch(0.70 0.12 65)" }} />
                <p
                  className="font-inter text-sm text-center"
                  style={{ color: "oklch(0.80 0.015 60)" }}
                >
                  Habib Nagar, Amravati,
                  <br />
                  Maharashtra 444601
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clock size={24} style={{ color: "oklch(0.70 0.12 65)" }} />
                <p
                  className="font-inter text-sm text-center"
                  style={{ color: "oklch(0.80 0.015 60)" }}
                >
                  11:00 AM – 10:00 PM
                  <br />
                  All Days
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Award size={24} style={{ color: "oklch(0.70 0.12 65)" }} />
                <p
                  className="font-inter text-sm text-center"
                  style={{ color: "oklch(0.80 0.015 60)" }}
                >
                  20+ Years of
                  <br />
                  Premium Furniture
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
