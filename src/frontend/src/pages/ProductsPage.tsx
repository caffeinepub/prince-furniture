import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { SAMPLE_PRODUCTS } from "../data/sampleProducts";
import { useAllProducts } from "../hooks/useQueries";

const CATEGORIES = [
  "All",
  "Beds",
  "Cupboards",
  "Dining Sets",
  "Coffee Tables",
  "Chairs",
  "Sofas",
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: backendProducts, isLoading } = useAllProducts();
  const allProducts =
    backendProducts && backendProducts.length > 0
      ? backendProducts
      : SAMPLE_PRODUCTS;

  const filtered = useMemo(() => {
    let list = allProducts;
    if (activeCategory !== "All")
      list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const term = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term),
      );
    }
    return list;
  }, [allProducts, activeCategory, search]);

  return (
    <div
      style={{ backgroundColor: "oklch(0.978 0.006 80)", minHeight: "100vh" }}
    >
      <div
        className="py-16 px-4 text-center"
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
          <p className="eyebrow mb-3">Our Collection</p>
          <h1 className="section-title" style={{ fontSize: "2.5rem" }}>
            All Products
          </h1>
          <p
            className="font-inter text-base mt-3"
            style={{ color: "oklch(0.44 0.038 35)" }}
          >
            Explore our complete range of premium furniture
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="mb-10 space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "oklch(0.44 0.038 35)" }}
            />
            <Input
              type="search"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 font-inter"
              style={{
                backgroundColor: "oklch(0.95 0.018 80)",
                borderColor: "oklch(0.87 0.02 65)",
                color: "oklch(0.19 0.045 30)",
              }}
              data-ocid="products.search_input"
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-ocid="products.tab"
                type="button"
                className="font-inter text-sm px-5 py-2 rounded-full transition-all duration-200"
                style={{
                  backgroundColor:
                    activeCategory === cat
                      ? "oklch(0.70 0.12 65)"
                      : "oklch(0.95 0.018 80)",
                  color:
                    activeCategory === cat
                      ? "oklch(0.19 0.045 30)"
                      : "oklch(0.44 0.038 35)",
                  border: `1px solid ${activeCategory === cat ? "oklch(0.70 0.12 65)" : "oklch(0.87 0.02 65)"}`,
                  fontWeight: activeCategory === cat ? "600" : "400",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            data-ocid="products.loading_state"
          >
            {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((sk) => (
              <div
                key={sk}
                className="rounded-lg overflow-hidden"
                style={{ border: "1px solid oklch(0.87 0.02 65)" }}
              >
                <div
                  className="animate-pulse"
                  style={{
                    aspectRatio: "4/3",
                    backgroundColor: "oklch(0.92 0.015 70)",
                  }}
                />
                <div className="p-4 space-y-2">
                  <div
                    className="h-3 w-16 rounded animate-pulse"
                    style={{ backgroundColor: "oklch(0.92 0.015 70)" }}
                  />
                  <div
                    className="h-5 rounded animate-pulse"
                    style={{ backgroundColor: "oklch(0.92 0.015 70)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="products.empty_state">
            <p
              className="font-playfair text-2xl mb-2"
              style={{ color: "oklch(0.30 0.065 30)" }}
            >
              No products found
            </p>
            <p
              className="font-inter text-sm"
              style={{ color: "oklch(0.44 0.038 35)" }}
            >
              Try a different search or category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard
                key={String(product.id)}
                product={product}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
