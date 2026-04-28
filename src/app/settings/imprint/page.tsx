"use client";

import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/ui/TiptapEditor";
import { useCreateImprintMutation } from "@/redux/api/privacyApi";

export default function ImprintPage() {
  const router = useRouter();
  const [createImprint, { isLoading }] = useCreateImprintMutation();
  const [content, setContent] = useState(
    "<p>We are a dedicated team committed to providing the best service to our customers. Learn more about our mission and values.</p>",
  );

  const handleSave = async () => {
    try {
      const response = await createImprint({
        requestData: {
          imprint: content,
        },
      }).unwrap();
      
      alert("Imprint saved successfully!");
    } catch (err: any) {
      console.error("Save Imprint Error:", err);
      const errorMessage = err?.data?.message || "Failed to save Imprint. Please try again.";
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
          <h2 className="text-xl font-semibold">Imprint</h2>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-card p-6">
        <TiptapEditor content={content} onChange={setContent} placeholder="Write imprint..." />
      </div>

      {/* Footer Actions */}
      <div className="bg-sidebar flex flex-col items-center justify-center p-4 sm:flex-row">
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
