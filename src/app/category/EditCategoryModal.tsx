"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

type EditCategoryModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (category: { name: string; subCategories: string[] }) => void;
  category: { name: string; subCategories: string[] } | null;
};

export default function EditCategoryModal({
  open,
  onClose,
  onConfirm,
  category,
}: EditCategoryModalProps) {
  const [name, setName] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([""]);
  const [errors, setErrors] = useState<{ name?: string }>({});

  useEffect(() => {
    if (open && category) {
      setName(category.name);
      setSubCategories(category.subCategories.length > 0 ? category.subCategories : [""]);
      setErrors({});
    }
  }, [open, category]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Category name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const filteredSubCategories = subCategories.filter((sub) => sub.trim() !== "");
      onConfirm({
        name,
        subCategories: filteredSubCategories,
      });
      onClose();
    }
  };

  const addSubCategory = () => {
    setSubCategories([...subCategories, ""]);
  };

  const removeSubCategory = (index: number) => {
    const newSubCategories = subCategories.filter((_, i) => i !== index);
    setSubCategories(newSubCategories);
  };

  const handleSubCategoryChange = (index: number, value: string) => {
    const newSubCategories = [...subCategories];
    newSubCategories[index] = value;
    setSubCategories(newSubCategories);
  };

  return (
    <Dialog open={open} onOpenChange={onClose} modal={false}>
      <DialogContent className="bg-background gap-0 p-0 sm:max-w-[500px]">
        <DialogHeader className="bg-primary text-primary-foreground rounded-t-lg p-6">
          <DialogTitle className="text-xl font-semibold">Edit Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Category Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-foreground text-sm font-medium">
              Category Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
          </div>

          {/* Sub Categories */}
          <div className="space-y-2">
            <label className="text-foreground text-sm font-medium">Sub Categories</label>
            <div className="max-h-[200px] space-y-2 overflow-y-auto pr-1">
              {subCategories.map((sub, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder={`Sub category ${index + 1}`}
                    value={sub}
                    onChange={(e) => handleSubCategoryChange(index, e.target.value)}
                  />
                  {subCategories.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSubCategory(index)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 h-10 w-10 shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSubCategory}
              className="mt-2 w-full border-dashed"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Sub Category
            </Button>
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
