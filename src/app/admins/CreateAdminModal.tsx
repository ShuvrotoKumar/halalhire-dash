"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Upload, Loader2, User, Phone, Mail, Lock } from "lucide-react";
import { useCreateAdminMutation } from "@/redux/api/adminApi";

type CreateAdminModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm?: (admin: { name: string; email: string; password: string; phoneNumber?: string; avatar?: string }) => void;
};

export default function CreateAdminModal({ open, onClose, onConfirm }: CreateAdminModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatar, setAvatar] = useState<string>("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  // API mutation for creating admin
  const [createAdmin, { isLoading }] = useCreateAdminMutation();

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

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (phoneNumber && !/^\+?[1-9]\d{1,14}$/.test(phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "Invalid phone number format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const adminData = {
          name,
          email,
          password,
          ...(phoneNumber && { phoneNumber }),
          ...(avatar && { avatar })
        };
        
        console.log("Sending admin data:", adminData);
        const result = await createAdmin(adminData).unwrap();
        console.log("Create admin result:", result);
        
        // Call onConfirm if provided
        if (onConfirm) {
          onConfirm(adminData);
        }
        
        handleClose();
        alert("Admin created successfully!");
      } catch (err: any) {
        console.error("Create Admin Error:", err);
        console.error("Error status:", err?.status);
        console.error("Error data:", err?.data);
        
        // Try to extract more detailed error information
        let errorMessage = "Failed to create admin. Please try again.";
        
        if (err?.status === 400) {
          errorMessage = "Invalid data provided. Please check all fields.";
        } else if (err?.status === 401) {
          errorMessage = "You are not authorized to create admins.";
        } else if (err?.status === 403) {
          errorMessage = "You don't have permission to create admins.";
        } else if (err?.status === 409) {
          errorMessage = "An admin with this email already exists.";
        } else if (err?.data?.message) {
          errorMessage = err.data.message;
        } else if (err?.data?.error) {
          errorMessage = err.data.error;
        } else if (typeof err === 'string') {
          errorMessage = err;
        }
        
        alert(errorMessage);
      }
    }
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
    setAvatar("");
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose} modal={false}>
      <DialogContent className="bg-background gap-0 p-0 sm:max-w-[600px]">
        <DialogHeader className="bg-primary text-primary-foreground rounded-t-lg p-6">
          <DialogTitle className="text-xl font-semibold">Create Admin</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-foreground font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

              {/* Phone Number */}
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-foreground text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+8801234567890"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: undefined });
                  }}
                  className={errors.phoneNumber ? "border-destructive" : ""}
                />
                {errors.phoneNumber && <p className="text-destructive text-xs">{errors.phoneNumber}</p>}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-foreground text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address *
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
            </div>
          </div>

          {/* Security Section */}
          <div className="space-y-4">
            <h3 className="text-foreground font-medium flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Security Settings
            </h3>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-foreground text-sm font-medium">
                  Password *
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    className={errors.password ? "border-destructive pr-10" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-destructive text-xs">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-foreground text-sm font-medium">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword)
                        setErrors({ ...errors, confirmPassword: undefined });
                    }}
                    className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-destructive text-xs">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>

          {/* Profile Image Section */}
          <div className="space-y-4">
            <h3 className="text-foreground font-medium">Profile Image (Optional)</h3>
            <div className="border-border hover:border-primary/50 rounded-lg border-2 border-dashed p-6 text-center transition-colors">
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="avatar-upload"
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
              onClick={handleClose}
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
                  Creating Admin...
                </>
              ) : (
                "Create Admin"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
