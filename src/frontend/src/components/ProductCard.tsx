import { motion } from "motion/react";
import type { Product } from "../backend.d";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const waMessage = encodeURIComponent(
    `Hello, I'm interested in ${product.name}. Could you please share more details?`,
  );
  const waUrl = `https://wa.me/919370153364?text=${waMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group flex flex-col rounded-lg overflow-hidden"
      style={{
        backgroundColor: "oklch(0.978 0.006 80)",
        border: "1px solid oklch(0.87 0.02 65)",
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={
            product.imageUrl ||
            "/assets/generated/product-placeholder.dim_600x500.jpg"
          }
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.featured && (
          <span
            className="absolute top-3 left-3 font-inter text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: "oklch(0.70 0.12 65)",
              color: "oklch(0.19 0.045 30)",
            }}
          >
            Featured
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span
          className="font-inter text-[10px] font-medium tracking-[0.15em] uppercase"
          style={{ color: "oklch(0.70 0.12 65)" }}
        >
          {product.category}
        </span>
        <h3
          className="font-playfair text-lg font-semibold leading-snug"
          style={{ color: "oklch(0.30 0.065 30)" }}
        >
          {product.name}
        </h3>
        <p
          className="font-inter text-sm leading-relaxed flex-1 line-clamp-2"
          style={{ color: "oklch(0.44 0.038 35)" }}
        >
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span
            className="font-playfair text-xl font-semibold"
            style={{ color: "oklch(0.30 0.065 30)" }}
          >
            ₹{product.price.toLocaleString("en-IN")}
          </span>
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold text-center text-sm w-full mt-1"
          data-ocid="product.button"
        >
          Contact on WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
