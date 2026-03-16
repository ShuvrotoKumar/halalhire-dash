"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CreateFAQModal from "./CreateFAQModal";
import EditFAQModal from "./EditFAQModal";
import DeleteFAQModal from "./DeleteFAQModal";

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export default function FAQPage() {
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "faq-1",
      question: "How do I reset my password?",
      answer:
        "<p>You can reset your password by going to Settings &gt; Change Password. Enter your current password, then choose a new password and confirm it.</p>",
    },
    {
      id: "faq-2",
      question: "How do I update my profile information?",
      answer:
        "<p>Navigate to your Profile page from the sidebar menu. Click on the edit icon or 'Edit Profile' button to modify your personal information.</p>",
    },
    {
      id: "faq-3",
      question: "What payment methods do you accept?",
      answer:
        "<p>We accept various payment methods including credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and bank transfers.</p>",
    },
  ]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);

  const handleCreateFAQ = (faq: { question: string; answer: string }) => {
    const newFaq: FAQ = {
      id: `faq-${Date.now()}`,
      question: faq.question,
      answer: faq.answer,
    };
    setFaqs([...faqs, newFaq]);
  };

  const handleEditFAQ = (updatedFaq: { id: string; question: string; answer: string }) => {
    setFaqs(faqs.map((faq) => (faq.id === updatedFaq.id ? updatedFaq : faq)));
  };

  const handleDeleteFAQ = () => {
    if (selectedFaq) {
      setFaqs(faqs.filter((faq) => faq.id !== selectedFaq.id));
      setSelectedFaq(null);
    }
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
        {faqs.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center">
            <p className="mb-2 text-lg font-medium">No FAQs yet</p>
            <p className="text-sm">Click "Add FAQ" to create your first FAQ item.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
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
        onConfirm={handleCreateFAQ}
      />
      <EditFAQModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedFaq(null);
        }}
        onConfirm={handleEditFAQ}
        faq={selectedFaq}
      />
      <DeleteFAQModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedFaq(null);
        }}
        onConfirm={handleDeleteFAQ}
        faqQuestion={selectedFaq?.question || ""}
      />
    </div>
  );
}
