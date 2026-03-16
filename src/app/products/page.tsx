"use client";

import React, { useState } from "react";
import { Search, Plus, Trash2, ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateProductModal from "./CreateProductModal";
import EditProductModal from "./EditProductModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ProductCategoryChart } from "@/components/ProductCategoryChart";

// Inline DeleteProductModal
function DeleteProductModal({
  open,
  onClose,
  onConfirm,
  productName,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose} modal={false}>
      <DialogContent className="bg-background sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the product{" "}
            <span className="text-foreground font-medium">"{productName}"</span>? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Seed data for products
const seedProducts = [
  {
    id: "1",
    name: "iPhone 14 Pro",
    category: "Technology",
    subCategory: "Smartphones",
    price: 999,
    stock: 50,
    description: "The latest iPhone with A16 Bionic chip.",
    image: "https://images.unsplash.com/photo-1664478546384-d57ffe74a797?w=800&q=80",
  },
  {
    id: "2",
    name: "MacBook Air M2",
    category: "Technology",
    subCategory: "Laptops",
    price: 1199,
    stock: 30,
    description: "Supercharged by M2 chip.",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80",
  },
  {
    id: "3",
    name: "Men's Casual Shirt",
    category: "Lifestyle",
    subCategory: "Fashion",
    price: 49,
    stock: 100,
    description: "Comfortable cotton shirt for daily wear.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
  },
  {
    id: "4",
    name: "Gaming Headset",
    category: "Technology",
    subCategory: "Accessories",
    price: 199,
    stock: 25,
    description: "Immersive sound for gaming.",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
  },
  {
    id: "5",
    name: "Running Shoes",
    category: "Lifestyle",
    subCategory: "Fashion",
    price: 129,
    stock: 75,
    description: "Lightweight shoes for running.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  },
];

const categories = [
  {
    name: "Technology",
    subCategories: ["Smartphones", "Laptops", "Accessories", "Software"],
  },
  {
    name: "Lifestyle",
    subCategories: ["Travel", "Food", "Health", "Fashion"],
  },
  {
    name: "Education",
    subCategories: ["Online Courses", "Books", "Tutorials"],
  },
  {
    name: "Business",
    subCategories: ["Marketing", "Finance", "Startups"],
  },
  {
    name: "Entertainment",
    subCategories: ["Movies", "Music", "Games", "Events"],
  },
];

type Product = (typeof seedProducts)[0];

function ProductTable({
  products,
  onDelete,
  onEdit,
  startIndex,
}: {
  products: Product[];
  onDelete: (product: Product) => void;
  onEdit: (product: Product) => void;
  startIndex: number;
}) {
  return (
    <>
      {/* Desktop Table View */}
      <div className="bg-card border-border hidden overflow-hidden rounded-b-lg border shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  No
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Image
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Product Name
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Category
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Sub Category
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Price
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Stock
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {products.map((product, idx) => (
                <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {startIndex + idx + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-foreground text-sm font-medium">{product.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-secondary text-secondary-foreground rounded px-2 py-0.5 text-xs">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-muted-foreground text-sm">{product.subCategory}</span>
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    ${product.price}
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                        onClick={() => onEdit(product)}
                        title="Edit Product"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                        onClick={() => onDelete(product)}
                        title="Delete Product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="space-y-3 p-4 md:hidden">
        {products.map((product, idx) => (
          <div key={product.id} className="bg-card border-border space-y-3 rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-12 w-12 rounded-md object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-foreground truncate font-semibold">{product.name}</h3>
                  <p className="text-muted-foreground text-xs">#{startIndex + idx + 1}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                  onClick={() => onEdit(product)}
                  title="Edit Product"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                  onClick={() => onDelete(product)}
                  title="Delete Product"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="bg-secondary text-secondary-foreground rounded px-2 py-0.5 text-xs">
                  {product.category}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sub Category:</span>
                <span className="text-foreground">{product.subCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span className="text-foreground font-medium">${product.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stock:</span>
                <span className="text-foreground">{product.stock}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [query, setQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filtered.slice(startIndex, endIndex);

  // Calculate chart data
  const chartData = React.useMemo(() => {
    const categoryCounts: Record<string, number> = {};
    products.forEach((p) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    return Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count,
    }));
  }, [products]);

  const handleCreateProduct = (newProduct: {
    name: string;
    category: string;
    subCategory: string;
    price: number;
    stock: number;
    description: string;
    image?: string;
  }) => {
    const product: Product = {
      id: Math.random().toString(36).substr(2, 9),
      ...newProduct,
      image: newProduct.image || "https://placehold.co/600x400?text=Product",
    };
    setProducts([product, ...products]);
    setIsCreateModalOpen(false);
  };

  const handleUpdateProduct = (updatedData: Partial<Product>) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...p, ...updatedData } : p)));
      setEditingProduct(null);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDeleteConfirm = () => {
    if (deleteProduct) {
      setProducts(products.filter((p) => p.id !== deleteProduct.id));
      setDeleteProduct(null);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Chart Section */}
      <div className="py-4">
        <ProductCategoryChart data={chartData} />
      </div>

      {/* Table area */}
      <div>
        <h1 className="my-5 ml-2 text-2xl font-bold text-[#0D2357] dark:text-white">
          All Products
        </h1>
        {/* Top header */}
        <div className="bg-primary text-primary-foreground rounded-t-lg p-4">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">Product List</h2>
            </div>
            <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-64">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search Product"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-background text-foreground border-primary-foreground/20 w-full pl-9"
                />
              </div>
              <Button
                variant="secondary"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 whitespace-nowrap"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </div>
          </div>
        </div>

        <ProductTable
          products={paginatedProducts}
          onDelete={setDeleteProduct}
          onEdit={handleEditProduct}
          startIndex={startIndex}
        />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-card border-border rounded-b-lg border-t p-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-muted-foreground text-sm">
              Showing {startIndex + 1} to {Math.min(endIndex, filtered.length)} of {filtered.length}{" "}
              products
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Previous</span>
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="h-8 w-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-8"
              >
                <span className="mr-1 hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Product Modal */}
      <CreateProductModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onConfirm={handleCreateProduct}
        categories={categories}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        open={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onConfirm={handleUpdateProduct}
        product={editingProduct}
        categories={categories}
      />

      {/* Delete Product Modal */}
      <DeleteProductModal
        open={!!deleteProduct}
        onClose={() => setDeleteProduct(null)}
        onConfirm={handleDeleteConfirm}
        productName={deleteProduct?.name}
      />
    </div>
  );
}
