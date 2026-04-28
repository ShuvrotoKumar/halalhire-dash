"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CreateFAQModal from "./CreateFAQModal";
import EditFAQModal from "./EditFAQModal";
import DeleteFAQModal from "./DeleteFAQModal";
import { useGetAllFaqQuery } from "@/redux/api/faqApi";

type FAQ = {
  _id: string;
  userId: string;
  question: string;
  answer: string;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function FAQPage() {
  const router = useRouter();
  const { data: faqData, isLoading, error, refetch } = useGetAllFaqQuery({});
  const faqs = faqData?.data?.data || [];
  
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);

  const handleCreateFAQ = () => {
    // FAQ is created via API in CreateFAQModal
    // Refresh the list after creation
    refetch();
  };

  const handleEditFAQ = () => {
    // FAQ is updated via API in EditFAQModal
    // Refresh the list after update
    refetch();
  };

  const handleDeleteFAQ = () => {
    // FAQ is deleted via API in DeleteFAQModal
    // Refresh the list after deletion
    refetch();
    setSelectedFaq(null);
  };

  const openEditModal = (faq: FAQ) => {
    setSelectedFaq(faq);
    setEditModalOpen(true);
  };

  const openDeleteModal = (faq: FAQ) => {
    setSelectedFaq(faq);
    setDeleteModalOpen(true);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground rounded-t-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="hover:opacity-80">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold">Manage FAQs</h2>
          </div>
          <Button
            onClick={() => setCreateModalOpen(true)}
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add FAQ
          </Button>
        </div>
      </div>

      {/* FAQ List */}
      <div className="bg-card p-6">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-destructive py-12 text-center">
            <p className="mb-2 text-lg font-medium">Error loading FAQs</p>
            <p className="text-sm mb-4">Failed to load FAQ data. Please try again.</p>
            <Button onClick={() => refetch()} variant="outline">
              Retry
            </Button>
          </div>
        ) : faqs.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center">
            <p className="mb-2 text-lg font-medium">No FAQs yet</p>
            <p className="text-sm">Click "Add FAQ" to create your first FAQ item.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq: FAQ) => (
              <div
                key={faq._id}
                className="border-border hover:bg-muted/30 rounded-lg border p-4 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-foreground mb-2 text-base font-semibold">
                      {faq.question}
                    </h3>
                    <div
                      className="text-muted-foreground prose prose-sm max-w-none text-sm"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => openEditModal(faq)}
                      variant="outline"
                      size="sm"
                      className="hover:bg-primary hover:text-primary-foreground"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => openDeleteModal(faq)}
                      variant="outline"
                      size="sm"
                      className="hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateFAQModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onConfirm={() => handleCreateFAQ()}
      />
      <EditFAQModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedFaq(null);
        }}
        onConfirm={handleEditFAQ}
        faq={selectedFaq ? {
          id: selectedFaq._id,
          question: selectedFaq.question,
          answer: selectedFaq.answer
        } : null}
      />
      <DeleteFAQModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedFaq(null);
        }}
        onConfirm={handleDeleteFAQ}
        faqId={selectedFaq?._id}
        faqQuestion={selectedFaq?.question || ""}
      />
    </div>
  );
}
