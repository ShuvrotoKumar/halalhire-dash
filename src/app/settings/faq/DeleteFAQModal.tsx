"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

type DeleteFAQModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  faqQuestion: string;
};

export default function DeleteFAQModal({
  open,
  onClose,
  onConfirm,
  faqQuestion,
}: DeleteFAQModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-background sm:max-w-[425px]">
        <DialogHeader className="space-y-3">
          <div className="bg-destructive/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
            <AlertTriangle className="text-destructive h-6 w-6" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold">Delete FAQ</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-muted-foreground text-center text-sm">
            Are you sure you want to delete this FAQ?
          </p>
          <p className="text-foreground mt-3 text-center font-medium">"{faqQuestion}"</p>
          <p className="text-muted-foreground mt-3 text-center text-xs">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground flex-1"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
