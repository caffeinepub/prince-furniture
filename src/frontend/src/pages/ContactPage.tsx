import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";

export default function ContactPage() {
  return (
    <div
      style={{ backgroundColor: "oklch(0.978 0.006 80)", minHeight: "100vh" }}
    >
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
          <p className="eyebrow mb-3">Get in Touch</p>
          <h1 className="section-title" style={{ fontSize: "2.75rem" }}>
            Contact Us
          </h1>
          <p
            className="font-inter text-base mt-4 max-w-md mx-auto"
            style={{ color: "oklch(0.44 0.038 35)" }}
          >
            We’re here to help you find your perfect furniture. Reach out and
            let’s talk.
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: MapPin,
                title: "Address",
                lines: ["Habib Nagar, Amravati,", "Maharashtra 444601"],
                action: null,
              },
              {
                icon: Clock,
                title: "Shop Hours",
                lines: ["11:00 AM – 10:00 PM", "Open All Days"],
                action: null,
              },
              {
                icon: Phone,
                title: "WhatsApp",
                lines: ["+91 93701 53364"],
                action: {
                  label: "Message Us",
                  href: "https://wa.me/919370153364?text=Hello%2C%20I'm%20interested%20in%20your%20furniture.",
                },
              },
              {
                icon: Instagram,
                title: "Instagram",
                lines: ["@princefurnitureamravati"],
                action: {
                  label: "Follow Us",
                  href: "https://instagram.com/princefurnitureamravati",
                },
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-xl p-8"
                style={{
                  backgroundColor: "oklch(0.95 0.018 80)",
                  border: "1px solid oklch(0.87 0.02 65)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "oklch(0.70 0.12 65 / 0.15)" }}
                >
                  <card.icon
                    size={22}
                    style={{ color: "oklch(0.70 0.12 65)" }}
                  />
                </div>
                <h3
                  className="font-playfair text-xl font-semibold mb-3"
                  style={{ color: "oklch(0.30 0.065 30)" }}
                >
                  {card.title}
                </h3>
                {card.lines.map((line) => (
                  <p
                    key={line}
                    className="font-inter text-sm leading-relaxed"
                    style={{ color: "oklch(0.44 0.038 35)" }}
                  >
                    {line}
                  </p>
                ))}
                {card.action && (
                  <a
                    href={card.action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold inline-block mt-4 text-sm px-5 py-2"
                    data-ocid="contact.button"
                  >
                    {card.action.label}
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 rounded-2xl p-10 text-center"
            style={{ backgroundColor: "oklch(0.30 0.065 30)" }}
          >
            <MessageCircle
              size={36}
              className="mx-auto mb-4"
              style={{ color: "oklch(0.70 0.12 65)" }}
            />
            <h2
              className="font-playfair text-3xl font-semibold mb-3"
              style={{ color: "oklch(0.95 0.018 80)" }}
            >
              Ready to Furnish Your Home?
            </h2>
            <p
              className="font-inter text-sm mb-6"
              style={{ color: "oklch(0.72 0.025 40)" }}
            >
              Chat with us on WhatsApp and we’ll help you choose the perfect
              pieces.
            </p>
            <a
              href="https://wa.me/919370153364?text=Hello%2C%20I'm%20interested%20in%20your%20furniture.%20Can%20you%20help%20me%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 text-base px-8 py-3.5"
              data-ocid="contact.primary_button"
            >
              <Phone size={18} /> Start WhatsApp Chat
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
