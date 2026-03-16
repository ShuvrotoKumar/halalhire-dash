"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserCheck, Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  avatar: string;
}

interface BlockedUsersModalProps {
  open: boolean;
  onClose: () => void;
  blockedUsers: User[];
  onUnblock: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function BlockedUsersModal({
  open,
  onClose,
  blockedUsers,
  onUnblock,
  onDelete,
}: BlockedUsersModalProps) {
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      onDelete(userToDelete);
      setUserToDelete(null);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()} modal={false}>
        <DialogContent className="max-h-[80vh] sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Blocked Users ({blockedUsers.length})
            </DialogTitle>
          </DialogHeader>

          {blockedUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <UserCheck className="text-muted-foreground h-8 w-8" />
              </div>
              <h3 className="text-foreground mb-2 text-lg font-semibold">No Blocked Users</h3>
              <p className="text-muted-foreground max-w-sm text-sm">
                You haven't blocked any users yet. Blocked users will appear here.
              </p>
            </div>
          ) : (
            <div className="max-h-[60vh] overflow-y-auto">
              <div className="space-y-3">
                {blockedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="border-border bg-card hover:bg-muted/30 flex items-center justify-between rounded-lg border p-4 transition-colors"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-4">
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
                        <h4 className="text-foreground truncate font-semibold">{user.name}</h4>
                        <p className="text-muted-foreground truncate text-sm">{user.email}</p>
                        <p className="text-muted-foreground text-xs">{user.phone}</p>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-shrink-0 gap-2">
                      <Button variant="outline" size="sm" onClick={() => onUnblock(user.id)}>
                        <UserCheck className="mr-2 h-4 w-4" />
                        Unblock
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setUserToDelete(user.id)}
                        title="Delete User Permanently"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-border flex justify-end border-t pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!userToDelete}
        onOpenChange={(isOpen) => !isOpen && setUserToDelete(null)}
        modal={false}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center gap-4">
              <div className="bg-destructive/10 flex h-12 w-12 items-center justify-center rounded-full">
                <AlertTriangle className="text-destructive h-6 w-6" />
              </div>
              <div className="space-y-1">
                <DialogTitle>Delete User</DialogTitle>
                <DialogDescription>
                  Are you sure you want to permanently delete this user? This action cannot be
                  undone.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setUserToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
