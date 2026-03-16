"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState<{
    otp?: string;
  }>({});

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    } else {
      // Redirect to forgot password if no email is provided
      router.push("/forgot-password");
    }
  }, [searchParams, router]);

  const validateOtp = () => {
    const newErrors: typeof errors = {};
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      newErrors.otp = "Please enter complete 6-digit OTP";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateOtp()) {
      // Add your verify OTP logic here
      console.log("Verify OTP:", otp.join(""));
      // Redirect to reset password page
      router.push("/reset-password");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Clear error when user types
    if (errors.otp) setErrors({ ...errors, otp: undefined });
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResendOtp = () => {
    console.log("Resend OTP to:", email);
    setOtp(["", "", "", "", "", ""]);
    // Add your resend OTP logic here
  };

  return (
    <div className="from-primary/10 via-background to-primary/5 relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-primary/20 absolute top-0 -left-4 h-72 w-72 animate-pulse rounded-full blur-3xl" />
        <div className="bg-primary/20 absolute -right-4 bottom-0 h-72 w-72 animate-pulse rounded-full blur-3xl delay-1000" />
      </div>

      {/* OTP Verification Card */}
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
            <h1 className="text-foreground text-3xl font-bold">Verify OTP</h1>
            <p className="text-muted-foreground mt-2 text-center text-sm">
              Enter the 6-digit OTP sent to your email
            </p>
          </div>

          {/* OTP Verification Form */}
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            {/* Email Display */}
            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <p className="text-muted-foreground text-sm">OTP sent to</p>
              <p className="text-foreground mt-1 font-medium">{email}</p>
            </div>

            {/* OTP Input */}
            <div className="space-y-2">
              <label className="text-foreground text-sm font-medium">Enter OTP</label>
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={`h-14 w-14 text-center text-xl font-semibold ${
                      errors.otp ? "border-destructive" : ""
                    }`}
                  />
                ))}
              </div>
              {errors.otp && <p className="text-destructive text-center text-xs">{errors.otp}</p>}
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                Didn't receive OTP? Resend
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full text-base font-semibold"
              size="lg"
            >
              Verify OTP
            </Button>

            {/* Back Button */}
            <Button
              type="button"
              onClick={() => router.push("/forgot-password")}
              variant="ghost"
              className="w-full"
              size="lg"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Change Email
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}
