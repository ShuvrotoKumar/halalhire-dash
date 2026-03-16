"use client";

import React, { useState } from "react";
import { Search, Plus, Trash2, ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateCategoryModal from "./CreateCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Inline DeleteCategoryModal
function DeleteCategoryModal({
  open,
  onClose,
  onConfirm,
  categoryName,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  categoryName?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose} modal={false}>
      <DialogContent className="bg-background sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the category{" "}
            <span className="text-foreground font-medium">"{categoryName}"</span>? This action
            cannot be undone.
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

// Seed data for categories
const seedCategories = [
  {
    id: "1",
    name: "Technology",
    subCategories: ["Smartphones", "Laptops", "Accessories", "Software"],
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    name: "Lifestyle",
    subCategories: ["Travel", "Food", "Health", "Fashion"],
    createdAt: "2023-02-20",
  },
  {
    id: "3",
    name: "Education",
    subCategories: ["Online Courses", "Books", "Tutorials"],
    createdAt: "2023-03-10",
  },
  {
    id: "4",
    name: "Business",
    subCategories: ["Marketing", "Finance", "Startups"],
    createdAt: "2023-04-05",
  },
  {
    id: "5",
    name: "Entertainment",
    subCategories: ["Movies", "Music", "Games", "Events"],
    createdAt: "2023-05-12",
  },
];

type Category = (typeof seedCategories)[0];

function CategoryTable({
  categories,
  onDelete,
  onEdit,
  startIndex,
}: {
  categories: Category[];
  onDelete: (category: Category) => void;
  onEdit: (category: Category) => void;
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
                  Category Name
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Sub Categories
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Created Date
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {categories.map((cat, idx) => (
                <tr key={cat.id} className="hover:bg-muted/30 transition-colors">
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {startIndex + idx + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-foreground text-sm font-medium">{cat.name}</span>
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm">
                    <div className="flex flex-wrap gap-1">
                      {cat.subCategories.slice(0, 3).map((sub, i) => (
                        <span
                          key={i}
                          className="bg-secondary text-secondary-foreground rounded px-2 py-0.5 text-xs"
                        >
                          {sub}
                        </span>
                      ))}
                      {cat.subCategories.length > 3 && (
                        <span className="text-muted-foreground py-0.5 text-xs">
                          +{cat.subCategories.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {cat.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                        onClick={() => onEdit(cat)}
                        title="Edit Category"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                        onClick={() => onDelete(cat)}
                        title="Delete Category"
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
        {categories.map((cat, idx) => (
          <div key={cat.id} className="bg-card border-border space-y-3 rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="text-foreground truncate font-semibold">{cat.name}</h3>
                <p className="text-muted-foreground text-xs">#{startIndex + idx + 1}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                  onClick={() => onEdit(cat)}
                  title="Edit Category"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                  onClick={() => onDelete(cat)}
                  title="Delete Category"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground">Sub Categories:</span>
                <div className="flex flex-wrap gap-1">
                  {cat.subCategories.map((sub, i) => (
                    <span
                      key={i}
                      className="bg-secondary text-secondary-foreground rounded px-2 py-0.5 text-xs"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Created:</span>
                <span className="text-foreground">{cat.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>(seedCategories);
  const [query, setQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = categories.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCategories = filtered.slice(startIndex, endIndex);

  const handleCreateCategory = (newCategory: { name: string; subCategories: string[] }) => {
    const category: Category = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCategory.name,
      subCategories: newCategory.subCategories,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setCategories([category, ...categories]);
    setIsCreateModalOpen(false);
  };

  const handleUpdateCategory = (updatedData: { name: string; subCategories: string[] }) => {
    if (editingCategory) {
      setCategories(
        categories.map((c) => (c.id === editingCategory.id ? { ...c, ...updatedData } : c)),
      );
      setEditingCategory(null);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
  };

  const handleDeleteConfirm = () => {
    if (deleteCategory) {
      setCategories(categories.filter((c) => c.id !== deleteCategory.id));
      setDeleteCategory(null);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Top header */}
      <div className="bg-primary text-primary-foreground rounded-t-lg p-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Category List</h2>
          </div>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search Category"
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
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </div>
        </div>
      </div>

      {/* Table area */}
      <div>
        <CategoryTable
          categories={paginatedCategories}
          onDelete={setDeleteCategory}
          onEdit={handleEditCategory}
          startIndex={startIndex}
        />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-card border-border rounded-b-lg border-t p-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-muted-foreground text-sm">
              Showing {startIndex + 1} to {Math.min(endIndex, filtered.length)} of {filtered.length}{" "}
              categories
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

      {/* Create Category Modal */}
      <CreateCategoryModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onConfirm={handleCreateCategory}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        open={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        onConfirm={handleUpdateCategory}
        category={editingCategory}
      />

      {/* Delete Category Modal */}
      <DeleteCategoryModal
        open={!!deleteCategory}
        onClose={() => setDeleteCategory(null)}
        onConfirm={handleDeleteConfirm}
        categoryName={deleteCategory?.name}
      />
    </div>
  );
}
