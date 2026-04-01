import type { Product } from "../backend.d";

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: BigInt(1),
    name: "Empress Walnut Bed",
    category: "Beds",
    price: 45000,
    description:
      "King-size bed frame in solid sheesham wood with hand-carved headboard and premium satin finish.",
    imageUrl: "/assets/generated/sample-bed.dim_600x500.jpg",
    featured: true,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(2),
    name: "Royale Dining Set",
    category: "Dining Sets",
    price: 68000,
    description:
      "6-seater dining table in solid walnut with cushioned chairs upholstered in premium fabric.",
    imageUrl: "/assets/generated/sample-dining.dim_600x500.jpg",
    featured: true,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(3),
    name: "Majesty 3-Seater Sofa",
    category: "Sofas",
    price: 38000,
    description:
      "Plush three-seater sofa in imported cream fabric with solid wood frame and cushioned armrests.",
    imageUrl: "/assets/generated/sample-sofa.dim_600x500.jpg",
    featured: true,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(4),
    name: "Heritage Wardrobe",
    category: "Cupboards",
    price: 32000,
    description:
      "4-door wardrobe in engineered wood with full-length mirror, soft-close hinges and golden handles.",
    imageUrl: "/assets/generated/sample-cupboard.dim_600x500.jpg",
    featured: true,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(5),
    name: "Aurum Coffee Table",
    category: "Coffee Tables",
    price: 14500,
    description:
      "Round coffee table with solid walnut top and brushed gold metal legs. A striking centrepiece.",
    imageUrl: "/assets/generated/sample-coffee-table.dim_600x500.jpg",
    featured: false,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(6),
    name: "Velvet Accent Chair",
    category: "Chairs",
    price: 12000,
    description:
      "Luxurious accent chair in warm beige velvet with walnut-finish wooden legs.",
    imageUrl: "/assets/generated/sample-chair.dim_600x500.jpg",
    featured: false,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(7),
    name: "Noble Queen Bed",
    category: "Beds",
    price: 36000,
    description:
      "Queen-size platform bed in solid teak with a padded headboard in warm brown fabric.",
    imageUrl: "/assets/generated/sample-bed.dim_600x500.jpg",
    featured: false,
    createdAt: BigInt(0),
  },
  {
    id: BigInt(8),
    name: "Prestige Dining Set",
    category: "Dining Sets",
    price: 52000,
    description:
      "4-seater compact dining table in sheesham wood with cane-back chairs.",
    imageUrl: "/assets/generated/sample-dining.dim_600x500.jpg",
    featured: false,
    createdAt: BigInt(0),
  },
];
