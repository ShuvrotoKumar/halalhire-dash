"use client";

import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/ui/TiptapEditor";
import { useCreateTermsAndConditionsMutation } from "@/redux/api/termsApi";

export default function TermsConditionsPage() {
  const router = useRouter();
  const [createTermsAndConditions, { isLoading }] = useCreateTermsAndConditionsMutation();
  const [content, setContent] = useState(
    "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>",
  );

  const handleSave = async () => {
    try {
      const response = await createTermsAndConditions({
        requestData: {
          TermsConditions: content,
        },
      }).unwrap();
      
      alert("Terms & Conditions saved successfully!");
    } catch (err: any) {
      console.error("Save Terms & Conditions Error:", err);
      const errorMessage = err?.data?.message || "Failed to save Terms & Conditions. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground rounded-t-lg p-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="hover:opacity-80">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold">Terms & Condition</h2>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-card p-6">
        <TiptapEditor
          content={content}
          onChange={setContent}
          placeholder="Write terms and conditions..."
        />
      </div>

      {/* Footer Actions */}
      <div className="bg-sidebar flex flex-col items-center justify-center gap-3 p-4 sm:flex-row">
        <Button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </div>
    </div>
  );
}
