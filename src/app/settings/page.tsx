"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const settingsOptions = [
  {
    id: "change-password",
    title: "Change Password",
    path: "/settings/change-password",
  },
  {
    id: "faq",
    title: "Frequently Asked Questions",
    path: "/settings/faq",
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    path: "/settings/privacy-policy",
  },
  {
    id: "terms-conditions",
    title: "Terms & Conditions",
    path: "/settings/terms-conditions",
  },
  {
    id: "about-us",
    title: "About Us",
    path: "/settings/about-us",
  },
];

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground rounded-t-lg p-6">
        <h2 className="text-2xl font-semibold">Settings</h2>
      </div>

      {/* Settings Options */}
      <div className="bg-card">
        {settingsOptions.map((option, index) => (
          <div key={option.id}>
            <button
              onClick={() => router.push(option.path)}
              className="hover:bg-muted/50 flex w-full items-center justify-between p-6 text-left transition-colors"
            >
              <span className="text-foreground text-lg font-medium">{option.title}</span>
              <ChevronRight className="text-muted-foreground h-7 w-7" />
            </button>
            {index < settingsOptions.length - 1 && <div className="border-border mx-6 border-b" />}
          </div>
        ))}
      </div>
    </div>
  );
}
