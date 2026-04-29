"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { useForgotPasswordMutation } from "@/redux/api/authApi";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    form?: string;
  }>({});

  const validateEmail = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateEmail()) {
      try {
        const response = await forgotPassword({ email }).unwrap();
        console.log("Forgot Password Response:", response);
        // Redirect to OTP verification page on success
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      } catch (err: any) {
        console.error("Forgot Password Error:", err);
        const errorMessage = err?.data?.message || "Something went wrong. Please try again.";
        setErrors({ ...errors, form: errorMessage });
      }
    }
  };

  return (
    <div className="from-primary/10 via-background to-primary/5 relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-primary/20 absolute top-0 -left-4 h-72 w-72 animate-pulse rounded-full blur-3xl" />
        <div className="bg-primary/20 absolute -right-4 bottom-0 h-72 w-72 animate-pulse rounded-full blur-3xl delay-1000" />
      </div>

      {/* Forgot Password Card */}
      <div className="relative w-full max-w-2xl">
        <div className="bg-card/80 border-border/50 rounded-2xl border p-8 shadow-2xl backdrop-blur-xl">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>
            <h1 className="text-foreground text-3xl font-bold">Forgot Password?</h1>
            <p className="text-muted-foreground mt-2 text-center text-sm">
              Enter your email to receive OTP
            </p>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSendOtp} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-foreground text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email || errors.form) setErrors({ ...errors, email: undefined, form: undefined });
                  }}
                  className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                />
              </div>
              {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
            </div>

            {/* Form Level Error */}
            {errors.form && (
              <div className="bg-destructive/10 border-destructive/20 text-destructive rounded-lg border p-3 text-center text-sm">
                {errors.form}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full text-base font-semibold"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </Button>

            {/* Back to Login */}
            <Link href="/login" className="block">
              <Button variant="ghost" className="w-full" size="lg" type="button">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

