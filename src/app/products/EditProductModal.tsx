"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

type Category = {
  name: string;
  subCategories: string[];
};

type Product = {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price: number;
  stock: number;
  description: string;
  image: string;
};

type EditProductModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (product: Partial<Product>) => void;
  product: Product | null;
  categories: Category[];
};

export default function EditProductModal({
  open,
  onClose,
  onConfirm,
  product,
  categories,
}: EditProductModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string>("");
  const [errors, setErrors] = useState<{
    name?: string;
    category?: string;
    subCategory?: string;
    price?: string;
    stock?: string;
  }>({});

  useEffect(() => {
    if (open && product) {
      setName(product.name);
      setCategory(product.category);
      setSubCategory(product.subCategory || "");
      setPrice(product.price.toString());
      setStock(product.stock.toString());
      setDescription(product.description);
      setImage(product.image);
      setErrors({});
    }
  }, [open, product]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) newErrors.name = "Product name is required";
    if (!category) newErrors.category = "Category is required";
    if (!subCategory) newErrors.subCategory = "Sub-category is required";
    if (!price || Number(price) <= 0) newErrors.price = "Valid price is required";
    if (!stock || Number(stock) < 0) newErrors.stock = "Valid stock is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onConfirm({
        name,
        category,
        subCategory,
        price: Number(price),
        stock: Number(stock),
        description,
        image,
      });
      onClose();
    }
  };

  const selectedCategory = categories.find((c) => c.name === category);

  return (
    <Dialog open={open} onOpenChange={onClose} modal={false}>
      <DialogContent className="bg-background gap-0 p-0 sm:max-w-[600px]">
        <DialogHeader className="bg-primary text-primary-foreground rounded-t-lg p-6">
          <DialogTitle className="text-xl font-semibold">Edit Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Image Upload */}
          <div className="flex justify-center">
            <div className="group relative cursor-pointer">
              <input
                type="file"
                id="edit-product-image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="edit-product-image-upload"
                className="border-border hover:border-primary/50 relative block h-32 w-32 overflow-hidden rounded-lg border-2 border-dashed transition-colors"
              >
                {image ? (
                  <img src={image} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="text-muted-foreground flex h-full flex-col items-center justify-center">
                    <Upload className="mb-1 h-8 w-8" />
                    <span className="text-xs">Upload</span>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Upload className="h-6 w-6 text-white" />
                </div>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-foreground text-sm font-medium">Product Name</label>
              <Input
                placeholder="Enter product name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-foreground text-sm font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubCategory(""); // Reset sub-category when category changes
                  if (errors.category) setErrors({ ...errors, category: undefined });
                }}
                className={`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.category ? "border-destructive" : ""
                }`}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-destructive text-xs">{errors.category}</p>}
            </div>

            {/* Sub Category */}
            <div className="space-y-2">
              <label className="text-foreground text-sm font-medium">Sub Category</label>
              <select
                value={subCategory}
                onChange={(e) => {
                  setSubCategory(e.target.value);
                  if (errors.subCategory) setErrors({ ...errors, subCategory: undefined });
                }}
                disabled={!category}
                className={`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.subCategory ? "border-destructive" : ""
                }`}
              >
                <option value="" disabled>
                  Select Sub Category
                </option>
                {selectedCategory?.subCategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              {errors.subCategory && (
                <p className="text-destructive text-xs">{errors.subCategory}</p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-foreground text-sm font-medium">Price</label>
              <Input
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (errors.price) setErrors({ ...errors, price: undefined });
                }}
                className={errors.price ? "border-destructive" : ""}
              />
              {errors.price && <p className="text-destructive text-xs">{errors.price}</p>}
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <label className="text-foreground text-sm font-medium">Stock</label>
              <Input
                type="number"
                placeholder="0"
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value);
                  if (errors.stock) setErrors({ ...errors, stock: undefined });
                }}
                className={errors.stock ? "border-destructive" : ""}
              />
              {errors.stock && <p className="text-destructive text-xs">{errors.stock}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-foreground text-sm font-medium">Description</label>
            <textarea
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Product description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
