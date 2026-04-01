import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  Crown,
  Edit2,
  LayoutGrid,
  Loader2,
  LogOut,
  PlusCircle,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { SAMPLE_PRODUCTS } from "../data/sampleProducts";
import {
  useAllProducts,
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "../hooks/useQueries";

const CATEGORIES = [
  "Beds",
  "Cupboards",
  "Dining Sets",
  "Coffee Tables",
  "Chairs",
  "Sofas",
];
type View = "products" | "add" | "edit";

interface ProductFormData {
  name: string;
  category: string;
  price: string;
  description: string;
  imageUrl: string;
  featured: boolean;
}

const EMPTY_FORM: ProductFormData = {
  name: "",
  category: "Sofas",
  price: "",
  description: "",
  imageUrl: "",
  featured: false,
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("products");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: backendProducts, isLoading } = useAllProducts();
  const allProducts =
    backendProducts && backendProducts.length > 0
      ? backendProducts
      : SAMPLE_PRODUCTS;
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const handleLogout = () => {
    localStorage.removeItem("prince_admin_auth");
    navigate({ to: "/admin/login" });
  };

  const openAdd = () => {
    setFormData(EMPTY_FORM);
    setEditingProduct(null);
    setView("add");
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      description: product.description,
      imageUrl: product.imageUrl,
      featured: product.featured,
    });
    setView("edit");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      category: formData.category,
      price: Number.parseFloat(formData.price),
      description: formData.description,
      imageUrl:
        formData.imageUrl ||
        "/assets/generated/product-placeholder.dim_600x500.jpg",
      featured: formData.featured,
    };
    try {
      if (view === "edit" && editingProduct) {
        await updateProduct.mutateAsync({
          id: editingProduct.id,
          product: { ...editingProduct, ...productData },
        });
        toast.success("Product updated successfully!");
      } else {
        await createProduct.mutateAsync(productData);
        toast.success("Product added successfully!");
      }
      setView("products");
    } catch {
      toast.error("Operation failed. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProduct.mutateAsync(deleteId);
      toast.success("Product deleted.");
      setDeleteId(null);
    } catch {
      toast.error("Delete failed.");
    }
  };

  const isSaving = createProduct.isPending || updateProduct.isPending;

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "oklch(0.95 0.018 80)" }}
    >
      {/* Sidebar */}
      <aside
        className="w-60 flex-shrink-0 flex flex-col"
        style={{ backgroundColor: "oklch(0.23 0.055 30)" }}
      >
        <div
          className="px-5 py-6 flex items-center gap-3"
          style={{ borderBottom: "1px solid oklch(0.30 0.04 30)" }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "oklch(0.70 0.12 65 / 0.15)" }}
          >
            <Crown size={18} style={{ color: "oklch(0.70 0.12 65)" }} />
          </div>
          <div>
            <div
              className="font-playfair text-sm font-bold"
              style={{ color: "oklch(0.95 0.018 80)" }}
            >
              Prince Furniture
            </div>
            <div
              className="font-inter text-[10px]"
              style={{ color: "oklch(0.55 0.02 40)" }}
            >
              Admin Panel
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            {
              icon: LayoutGrid,
              label: "Products",
              viewKey: "products" as View,
            },
            { icon: PlusCircle, label: "Add Product", viewKey: "add" as View },
          ].map(({ icon: Icon, label, viewKey }) => (
            <button
              type="button"
              key={viewKey}
              onClick={() => (viewKey === "add" ? openAdd() : setView(viewKey))}
              data-ocid={`admin.${viewKey === "products" ? "tab" : "button"}`}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-inter text-sm"
              style={{
                backgroundColor:
                  view === viewKey
                    ? "oklch(0.70 0.12 65 / 0.15)"
                    : "transparent",
                color:
                  view === viewKey
                    ? "oklch(0.70 0.12 65)"
                    : "oklch(0.72 0.025 40)",
              }}
            >
              <Icon size={16} />
              {label}
              {view === viewKey && (
                <ChevronRight size={14} className="ml-auto" />
              )}
            </button>
          ))}
        </nav>
        <div className="px-3 pb-6">
          <button
            type="button"
            onClick={handleLogout}
            data-ocid="admin.button"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-inter text-sm"
            style={{ color: "oklch(0.72 0.025 40)" }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 max-w-5xl">
          {view === "products" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1
                    className="font-playfair text-2xl font-semibold"
                    style={{ color: "oklch(0.30 0.065 30)" }}
                  >
                    All Products
                  </h1>
                  <p
                    className="font-inter text-sm"
                    style={{ color: "oklch(0.44 0.038 35)" }}
                  >
                    {allProducts.length} product
                    {allProducts.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <Button
                  onClick={openAdd}
                  data-ocid="admin.primary_button"
                  style={{
                    backgroundColor: "oklch(0.70 0.12 65)",
                    color: "oklch(0.19 0.045 30)",
                  }}
                >
                  <PlusCircle size={16} className="mr-2" />
                  Add Product
                </Button>
              </div>
              {isLoading ? (
                <div
                  className="flex items-center justify-center py-20"
                  data-ocid="admin.loading_state"
                >
                  <Loader2
                    size={24}
                    className="animate-spin"
                    style={{ color: "oklch(0.70 0.12 65)" }}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allProducts.map((product, i) => (
                    <motion.div
                      key={String(product.id)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="rounded-lg overflow-hidden"
                      style={{
                        backgroundColor: "oklch(0.978 0.006 80)",
                        border: "1px solid oklch(0.87 0.02 65)",
                      }}
                      data-ocid={`admin.item.${i + 1}`}
                    >
                      <img
                        src={
                          product.imageUrl ||
                          "/assets/generated/product-placeholder.dim_600x500.jpg"
                        }
                        alt={product.name}
                        className="w-full h-36 object-cover"
                      />
                      <div className="p-4">
                        <span
                          className="font-inter text-[10px] font-medium tracking-widest uppercase"
                          style={{ color: "oklch(0.70 0.12 65)" }}
                        >
                          {product.category}
                        </span>
                        <h3
                          className="font-playfair text-base font-semibold mt-1"
                          style={{ color: "oklch(0.30 0.065 30)" }}
                        >
                          {product.name}
                        </h3>
                        <p
                          className="font-inter text-sm font-semibold mt-1"
                          style={{ color: "oklch(0.30 0.065 30)" }}
                        >
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEdit(product)}
                            data-ocid="admin.edit_button"
                            className="flex-1 font-inter text-xs"
                            style={{
                              borderColor: "oklch(0.87 0.02 65)",
                              color: "oklch(0.30 0.065 30)",
                            }}
                          >
                            <Edit2 size={12} className="mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDeleteId(product.id)}
                            data-ocid="admin.delete_button"
                            className="font-inter text-xs"
                            style={{
                              borderColor: "oklch(0.577 0.245 27 / 0.3)",
                              color: "oklch(0.577 0.245 27.325)",
                            }}
                          >
                            <Trash2 size={12} />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {(view === "add" || view === "edit") && (
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setView("products")}
                    className="p-2 rounded-lg transition-colors"
                    style={{ color: "oklch(0.44 0.038 35)" }}
                    data-ocid="admin.button"
                  >
                    <X size={18} />
                  </button>
                  <h1
                    className="font-playfair text-2xl font-semibold"
                    style={{ color: "oklch(0.30 0.065 30)" }}
                  >
                    {view === "add" ? "Add New Product" : "Edit Product"}
                  </h1>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="rounded-xl p-6 md:p-8 space-y-6"
                  style={{
                    backgroundColor: "oklch(0.978 0.006 80)",
                    border: "1px solid oklch(0.87 0.02 65)",
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label
                        className="font-inter text-sm font-medium"
                        style={{ color: "oklch(0.30 0.065 30)" }}
                      >
                        Product Name *
                      </Label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="e.g. Royale Sofa Set"
                        required
                        data-ocid="admin.input"
                        style={{
                          borderColor: "oklch(0.87 0.02 65)",
                          backgroundColor: "oklch(0.95 0.018 80)",
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        className="font-inter text-sm font-medium"
                        style={{ color: "oklch(0.30 0.065 30)" }}
                      >
                        Category *
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(val) =>
                          setFormData((p) => ({ ...p, category: val }))
                        }
                      >
                        <SelectTrigger
                          data-ocid="admin.select"
                          style={{
                            borderColor: "oklch(0.87 0.02 65)",
                            backgroundColor: "oklch(0.95 0.018 80)",
                          }}
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        className="font-inter text-sm font-medium"
                        style={{ color: "oklch(0.30 0.065 30)" }}
                      >
                        Price (₹) *
                      </Label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, price: e.target.value }))
                        }
                        placeholder="e.g. 25000"
                        required
                        data-ocid="admin.input"
                        style={{
                          borderColor: "oklch(0.87 0.02 65)",
                          backgroundColor: "oklch(0.95 0.018 80)",
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        className="font-inter text-sm font-medium"
                        style={{ color: "oklch(0.30 0.065 30)" }}
                      >
                        Featured
                      </Label>
                      <div className="flex items-center gap-3 pt-1.5">
                        <Switch
                          checked={formData.featured}
                          onCheckedChange={(val) =>
                            setFormData((p) => ({ ...p, featured: val }))
                          }
                          data-ocid="admin.switch"
                        />
                        <span
                          className="font-inter text-sm"
                          style={{ color: "oklch(0.44 0.038 35)" }}
                        >
                          {formData.featured ? "Yes — Show in Featured" : "No"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      className="font-inter text-sm font-medium"
                      style={{ color: "oklch(0.30 0.065 30)" }}
                    >
                      Description
                    </Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Short description of the product…"
                      rows={3}
                      data-ocid="admin.textarea"
                      style={{
                        borderColor: "oklch(0.87 0.02 65)",
                        backgroundColor: "oklch(0.95 0.018 80)",
                      }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      className="font-inter text-sm font-medium"
                      style={{ color: "oklch(0.30 0.065 30)" }}
                    >
                      Product Image
                    </Label>
                    <button
                      type="button"
                      className="rounded-lg border-2 border-dashed p-6 text-center cursor-pointer transition-colors w-full"
                      style={{ borderColor: "oklch(0.87 0.02 65)" }}
                      onClick={() => fileInputRef.current?.click()}
                      data-ocid="admin.dropzone"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                        data-ocid="admin.upload_button"
                      />
                      {uploading ? (
                        <Loader2
                          size={24}
                          className="animate-spin mx-auto mb-2"
                          style={{ color: "oklch(0.70 0.12 65)" }}
                        />
                      ) : formData.imageUrl ? (
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="max-h-32 mx-auto rounded object-contain"
                        />
                      ) : (
                        <>
                          <Upload
                            size={24}
                            className="mx-auto mb-2"
                            style={{ color: "oklch(0.44 0.038 35)" }}
                          />
                          <p
                            className="font-inter text-sm"
                            style={{ color: "oklch(0.44 0.038 35)" }}
                          >
                            Click to upload product image
                          </p>
                        </>
                      )}
                    </button>
                    <Input
                      value={formData.imageUrl}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, imageUrl: e.target.value }))
                      }
                      placeholder="Or enter image URL directly"
                      className="text-xs mt-2"
                      data-ocid="admin.input"
                      style={{
                        borderColor: "oklch(0.87 0.02 65)",
                        backgroundColor: "oklch(0.95 0.018 80)",
                      }}
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="submit"
                      disabled={isSaving}
                      data-ocid="admin.save_button"
                      style={{
                        backgroundColor: "oklch(0.70 0.12 65)",
                        color: "oklch(0.19 0.045 30)",
                      }}
                    >
                      {isSaving ? (
                        <Loader2 size={16} className="animate-spin mr-2" />
                      ) : null}
                      {isSaving
                        ? "Saving…"
                        : view === "add"
                          ? "Add Product"
                          : "Save Changes"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setView("products")}
                      data-ocid="admin.cancel_button"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      >
        <AlertDialogContent data-ocid="admin.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              data-ocid="admin.confirm_button"
              style={{ backgroundColor: "oklch(0.577 0.245 27.325)" }}
            >
              {deleteProduct.isPending ? (
                <Loader2 size={14} className="animate-spin mr-1" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
