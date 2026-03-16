"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Eye, EyeOff, Upload } from "lucide-react";

type EditAdminModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (admin: { name: string; email: string; role: string; avatar?: string }) => void;
  admin: {
    name: string;
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

  useEffect(() => {
    if (open && admin) {
      setName(admin.name);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onConfirm({
        name,
        email,
        role,
        avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      });
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose} modal={false}>
      <DialogContent className="bg-background gap-0 p-0 sm:max-w-[600px]">
        <DialogHeader className="bg-primary text-primary-foreground rounded-t-lg p-6">
          <DialogTitle className="text-xl font-semibold">Edit Admin</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-foreground text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="jhon doe"
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
            <label htmlFor="email" className="text-foreground text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              disabled
              className="bg-muted text-muted-foreground cursor-not-allowed opacity-70"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label htmlFor="role" className="text-foreground text-sm font-medium">
              Role
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

          {/* Profile Image */}
          <div className="space-y-2">
            <label className="text-foreground block text-sm font-medium">Profile Image</label>
            <div className="border-border hover:border-primary/50 rounded-lg border-2 border-dashed p-8 text-center transition-colors">
              <input
                type="file"
                id="edit-avatar-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="edit-avatar-upload"
                className="flex cursor-pointer flex-col items-center gap-2"
              >
                {avatar ? (
                  <div className="relative">
                    <img
                      src={avatar}
                      alt="Preview"
                      className="h-24 w-24 rounded-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                      <Upload className="h-6 w-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="text-muted-foreground h-8 w-8" />
                    <span className="text-muted-foreground text-sm">Upload Image</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
