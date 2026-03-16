"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/ui/TiptapEditor";

export default function PrivacyPolicyPage() {
  const router = useRouter();
  const [content, setContent] = useState(
    "<p>Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information.</p>",
  );

  const handleSave = () => {
    // Handle save logic
    alert("Privacy Policy saved!");
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground rounded-t-lg p-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="hover:opacity-80">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold">Privacy Policy</h2>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-card p-6">
        <TiptapEditor
          content={content}
          onChange={setContent}
          placeholder="Write privacy policy..."
        />
      </div>

      {/* Footer Actions */}
      <div className="bg-sidebar flex flex-col items-center justify-center p-4 sm:flex-row">
        <Button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}
