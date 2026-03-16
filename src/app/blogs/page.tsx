"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Eye, Trash2, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import CreateBlogModal from "./CreateBlogModal";

type Blog = {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  createdAt: string;
};

const seedBlogs: Blog[] = [
  {
    id: "1",
    title: "Getting Started with Next.js 14",
    author: "John Doe",
    category: "Technology",
    content: "<p>Next.js 14 brings amazing new features...</p>",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "The Future of Web Development",
    author: "Jane Smith",
    category: "Technology",
    content: "<p>Web development is evolving rapidly...</p>",
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    title: "Healthy Living Tips",
    author: "Mike Johnson",
    category: "Lifestyle",
    content: "<p>Living a healthy lifestyle is important...</p>",
    createdAt: "2024-02-01",
  },
  {
    id: "4",
    title: "Understanding TypeScript",
    author: "Sarah Williams",
    category: "Technology",
    content: "<p>TypeScript adds type safety to JavaScript...</p>",
    createdAt: "2024-02-10",
  },
  {
    id: "5",
    title: "Travel Guide: Europe",
    author: "David Lee",
    category: "Travel",
    content: "<p>Europe offers amazing destinations...</p>",
    createdAt: "2024-02-15",
  },
  {
    id: "6",
    title: "Cooking Made Easy",
    author: "Emily Clark",
    category: "Food",
    content: "<p>Learn simple cooking techniques...</p>",
    createdAt: "2024-02-20",
  },
  {
    id: "7",
    title: "Fitness Fundamentals",
    author: "Robert Brown",
    category: "Health",
    content: "<p>Building a strong fitness foundation...</p>",
    createdAt: "2024-03-01",
  },
  {
    id: "8",
    title: "Digital Marketing Trends",
    author: "Lisa Anderson",
    category: "Business",
    content: "<p>Marketing strategies for 2024...</p>",
    createdAt: "2024-03-05",
  },
  {
    id: "9",
    title: "Photography Basics",
    author: "Tom Wilson",
    category: "Art",
    content: "<p>Master the basics of photography...</p>",
    createdAt: "2024-03-10",
  },
  {
    id: "10",
    title: "Sustainable Living",
    author: "Anna Martinez",
    category: "Lifestyle",
    content: "<p>Tips for living sustainably...</p>",
    createdAt: "2024-03-15",
  },
  {
    id: "11",
    title: "AI and Machine Learning",
    author: "Chris Taylor",
    category: "Technology",
    content: "<p>Understanding AI fundamentals...</p>",
    createdAt: "2024-03-20",
  },
  {
    id: "12",
    title: "Home Decoration Ideas",
    author: "Maria Garcia",
    category: "Home",
    content: "<p>Transform your living space...</p>",
    createdAt: "2024-03-25",
  },
];

function BlogsTable({
  blogs,
  onView,
  onDelete,
  startIndex,
}: {
  blogs: Blog[];
  onView: (blog: Blog) => void;
  onDelete: (id: string) => void;
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
                  Title
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Author
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Category
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
              {blogs.map((blog, idx) => (
                <tr key={blog.id} className="hover:bg-muted/30 transition-colors">
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {startIndex + idx + 1}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-foreground line-clamp-1 text-sm font-medium">
                      {blog.title}
                    </span>
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {blog.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                      {blog.category}
                    </span>
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {blog.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                        onClick={() => onView(blog)}
                        title="View Blog"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                        onClick={() => onDelete(blog.id)}
                        title="Delete Blog"
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
        {blogs.map((blog, idx) => (
          <div key={blog.id} className="bg-card border-border space-y-3 rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="text-foreground line-clamp-2 font-semibold">{blog.title}</h3>
                <p className="text-muted-foreground mt-1 text-xs">#{startIndex + idx + 1}</p>
              </div>
              <div className="ml-2 flex flex-shrink-0 gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                  onClick={() => onView(blog)}
                  title="View Blog"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                  onClick={() => onDelete(blog.id)}
                  title="Delete Blog"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Author:</span>
                <span className="text-foreground">{blog.author}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                  {blog.category}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span className="text-foreground">{blog.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>(seedBlogs);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const itemsPerPage = 5;

  const filtered = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.author.toLowerCase().includes(query.toLowerCase()) ||
      blog.category.toLowerCase().includes(query.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBlogs = filtered.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const handleCreateBlog = (newBlog: {
    title: string;
    author: string;
    category: string;
    content: string;
  }) => {
    const blog: Blog = {
      id: `${blogs.length + 1}`,
      ...newBlog,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setBlogs([blog, ...blogs]);
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Top header */}
      <div className="bg-primary text-primary-foreground rounded-t-lg p-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Blog List</h2>
          </div>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search blogs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-background text-foreground border-primary-foreground/20 w-full pl-9"
              />
            </div>
            <Button
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 whitespace-nowrap"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Blog
            </Button>
          </div>
        </div>
      </div>

      {/* Table area */}
      <div>
        <BlogsTable
          blogs={paginatedBlogs}
          onView={setSelectedBlog}
          onDelete={handleDeleteBlog}
          startIndex={startIndex}
        />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-card border-border rounded-b-lg border-t p-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-muted-foreground text-sm">
              Showing {startIndex + 1} to {Math.min(endIndex, filtered.length)} of {filtered.length}{" "}
              blogs
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

      {/* Create Blog Modal */}
      <CreateBlogModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onConfirm={handleCreateBlog}
      />

      {/* View Blog Modal (Simple preview) */}
      {selectedBlog && (
        <Dialog open={!!selectedBlog} onOpenChange={() => setSelectedBlog(null)} modal={false}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{selectedBlog.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-muted-foreground flex items-center gap-4 text-sm">
                <span>By {selectedBlog.author}</span>
                <span>•</span>
                <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                  {selectedBlog.category}
                </span>
                <span>•</span>
                <span>{selectedBlog.createdAt}</span>
              </div>
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
