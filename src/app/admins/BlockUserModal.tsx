"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useBlockUserMutation } from "@/redux/api/adminApi";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status?: string;
}

interface BlockUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onConfirm?: () => void;
}

export default function BlockUserModal({ open, onClose, user, onConfirm }: BlockUserModalProps) {
  const [blockUser, { isLoading }] = useBlockUserMutation();
  
  if (!user) return null;

  const handleBlockConfirm = async () => {
    try {
      await blockUser(user.id).unwrap();
      
      // Call onConfirm if provided
      if (onConfirm) {
        onConfirm();
      }
      
      onClose();
      alert("User status updated successfully!");
    } catch (err: any) {
      console.error("Block User Error:", err);
      const errorMessage = err?.data?.message || "Failed to update user status. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()} modal={false}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-destructive text-xl font-semibold">Block User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-destructive/10 flex items-center gap-4 rounded-lg p-4">
            <Avatar className="h-12 w-12 flex-shrink-0">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="text-foreground truncate font-semibold">{user.name}</h3>
              <p className="text-muted-foreground truncate text-sm">{user.email}</p>
            </div>
          </div>

          <p className="text-muted-foreground text-sm">
            Are you sure you want to change this user's status? This action will {user.status === 'blocked' ? 'unblock' : 'block'} them from accessing the platform.
          </p>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              className="flex-1" 
              onClick={handleBlockConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : (user.status === 'blocked' ? 'Unblock User' : 'Block User')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
