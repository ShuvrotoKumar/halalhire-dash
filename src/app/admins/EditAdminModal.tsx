"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Upload, Loader2, User, Mail, Shield } from "lucide-react";
import { useUpdateUserMutation } from "@/redux/api/adminApi";

type EditAdminModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm?: (admin: { name: string; email: string; role: string; avatar?: string }) => void;
  admin: {
    _id: string;
    name?: string;
    email: string;
    role: string;
    avatar?: string;
  } | null;
};

export default function EditAdminModal({ open, onClose, onConfirm, admin }: EditAdminModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState<string>("");
  const [errors, setErrors] = useState<{
    name?: string;
    role?: string;
  }>({});
  
  // API mutation for updating admin
  const [updateAdmin, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (open && admin) {
      setName(admin.name || "");
      setEmail(admin.email);
      setRole(admin.role);
      setAvatar(admin.avatar || "");
      setErrors({});
    }
  }, [open, admin]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm() && admin) {
      try {
        const adminData = {
          name,
          role,
          ...(avatar && { avatar })
        };
        
        await updateAdmin({ userId: admin._id, ...adminData }).unwrap();
        
        // Call onConfirm if provided
        if (onConfirm) {
          onConfirm({
            name,
            email,
            role,
            avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
          });
        }
        
        onClose();
        alert("Admin updated successfully!");
      } catch (err: any) {
        console.error("Update Admin Error:", err);
        const errorMessage = err?.data?.message || "Failed to update admin. Please try again.";
        alert(errorMessage);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose} modal={false}>
      <DialogContent className="bg-background gap-0 p-0 sm:max-w-[600px]">
        <DialogHeader className="bg-primary text-primary-foreground rounded-t-lg p-6">
          <DialogTitle className="text-xl font-semibold">Edit Admin</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-foreground font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </h3>
            
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-foreground text-sm font-medium">
                Full Name *
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-foreground text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                className="bg-muted text-muted-foreground cursor-not-allowed opacity-70"
              />
              <p className="text-muted-foreground text-xs">Email cannot be changed</p>
            </div>
          </div>

          {/* Role Section */}
          <div className="space-y-4">
            <h3 className="text-foreground font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Role & Permissions
            </h3>
            
            <div className="space-y-2">
              <label htmlFor="role" className="text-foreground text-sm font-medium">
                Role *
              </label>
              <div className="relative">
                <select
                  id="role"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    if (errors.role) setErrors({ ...errors, role: undefined });
                  }}
                  className={`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                    errors.role ? "border-destructive" : ""
                  }`}
                >
                  <option value="" disabled>
                    Select a role
                  </option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Moderator">Moderator</option>
                </select>
              </div>
              {errors.role && <p className="text-destructive text-xs">{errors.role}</p>}
            </div>
          </div>

          {/* Profile Image Section */}
          <div className="space-y-4">
            <h3 className="text-foreground font-medium">Profile Image (Optional)</h3>
            <div className="border-border hover:border-primary/50 rounded-lg border-2 border-dashed p-6 text-center transition-colors">
              <input
                type="file"
                id="edit-avatar-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="edit-avatar-upload"
                className="flex cursor-pointer flex-col items-center gap-3"
              >
                {avatar ? (
                  <div className="relative">
                    <img
                      src={avatar}
                      alt="Profile Preview"
                      className="h-20 w-20 rounded-full object-cover border-2 border-border"
                    />
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                      <Upload className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-muted-foreground text-xs mt-2">Click to change image</p>
                  </div>
                ) : (
                  <>
                    <div className="border-border rounded-full border-2 p-4">
                      <Upload className="text-muted-foreground h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-foreground text-sm font-medium">Upload Profile Image</p>
                      <p className="text-muted-foreground text-xs">Optional - PNG, JPG up to 5MB</p>
                    </div>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1 h-11 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Admin...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
