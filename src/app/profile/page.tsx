"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Camera, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUpdateUserMutation } from "@/redux/api/adminApi";
import { useGetUserProfileQuery } from "@/redux/api/profileApi";
import { useSelector } from "react-redux";
import { store } from "@/redux/store";

// Define types for Redux state
interface AuthUser {
  email: string;
  name?: string;
  [key: string]: any;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
}

interface RootState {
  auth: AuthState;
  [key: string]: any;
}

export default function ProfilePage() {
  const router = useRouter();
  
  // Get authenticated user's email from Redux auth state
  const authUser = useSelector((state: RootState) => state.auth.user);
  const authEmail = authUser?.email || "";
  
  // Debug: Log auth state to see what we're getting
  console.log("Auth User from Redux:", authUser);
  console.log("Auth Email extracted:", authEmail);
  
  // Get email from localStorage as primary source if Redux is empty
  useEffect(() => {
    const localStorageData = localStorage.getItem("BAZARYA-app");
    console.log("Raw localStorage data:", localStorageData);
    
    if (localStorageData) {
      try {
        const parsed = JSON.parse(localStorageData);
        console.log("Parsed localStorage:", parsed);
        
        // Try different paths where email might be stored
        let emailFromStorage = null;
        
        if (parsed.auth?.user?.email) {
          emailFromStorage = parsed.auth.user.email;
        } else if (parsed.user?.email) {
          emailFromStorage = parsed.user.email;
        } else if (parsed.email) {
          emailFromStorage = parsed.email;
        }
        
        console.log("Email found in localStorage:", emailFromStorage);
        
        // If we found email in localStorage and no email in Redux, use it
        if (emailFromStorage && !authEmail) {
          setEmail(emailFromStorage);
          console.log("Set email from localStorage:", emailFromStorage);
        }
      } catch (e) {
        console.error("Failed to parse localStorage:", e);
      }
    }
  }, [authEmail]);
  
  // Fetch current user profile
  const { data: userProfile, isLoading: profileLoading } = useGetUserProfileQuery({});
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Start empty, will be set by useEffect
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
  
  // API mutation for updating profile
  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  
  // Set email immediately on component mount
  useEffect(() => {
    // First try Redux
    if (authEmail) {
      setEmail(authEmail);
      console.log("Email from Redux:", authEmail);
      return;
    }
    
    // Then try localStorage
    const localStorageData = localStorage.getItem("BAZARYA-app");
    console.log("localStorage data:", localStorageData);
    
    if (localStorageData) {
      try {
        const parsed = JSON.parse(localStorageData);
        console.log("Parsed localStorage:", parsed);
        
        let foundEmail = null;
        
        // Check all possible paths
        if (parsed.auth?.user?.email) {
          foundEmail = parsed.auth.user.email;
        } else if (parsed.user?.email) {
          foundEmail = parsed.user.email;
        } else if (parsed.email) {
          foundEmail = parsed.email;
        }
        
        if (foundEmail) {
          setEmail(foundEmail);
          console.log("Email set from localStorage:", foundEmail);
        } else {
          console.log("No email found in localStorage");
        }
      } catch (e) {
        console.error("Failed to parse localStorage:", e);
      }
    } else {
      console.log("No localStorage data found");
    }
  }, []); // Run only once on mount

  // Debug: Check current email state
  useEffect(() => {
    console.log("Current email state:", email);
  }, [email]);

  // Temporary test: Try to set email manually after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!email) {
        console.log("Trying manual email set...");
        // Try to get from localStorage one more time
        const data = localStorage.getItem("BAZARYA-app");
        if (data) {
          try {
            const parsed = JSON.parse(data);
            const testEmail = parsed.auth?.user?.email || parsed.user?.email || parsed.email;
            if (testEmail) {
              setEmail(testEmail);
              console.log("Manual email set successful:", testEmail);
            }
          } catch (e) {
            console.error("Manual set failed:", e);
          }
        }
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [email]);

  // Initialize form with user data
  useEffect(() => {
    if (userProfile?.data) {
      const userData = userProfile.data;
      setName(userData.name || "");
      setPhone(userData.phoneNumber || "");
      setAvatar(userData.photo || "");
      
      // Only set email from profile if current email is empty
      if (!email && userData.email) {
        setEmail(userData.email);
        console.log("Email set from profile:", userData.email);
      }
    }
  }, [userProfile, email]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const profileData = {
          name,
          phoneNumber: phone,
          ...(avatar && { avatar })
        };
        
        console.log("Updating profile:", profileData);
        // Use the actual user ID from the profile
        const userId = userProfile?.data?._id || "current-user";
        await updateProfile({ userId, ...profileData }).unwrap();
        
        alert("Profile updated successfully!");
      } catch (err: any) {
        console.error("Profile Update Error:", err);
        const errorMessage = err?.data?.message || "Failed to update profile. Please try again.";
        alert(errorMessage);
      }
    }
  };

  if (profileLoading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="text-primary h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground rounded-t-lg p-6">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="hover:opacity-80">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-semibold">Profile Settings</h2>
        </div>
      </div>

      {/* Form */}
      <div className="bg-card flex justify-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + name} alt={name} />
                <AvatarFallback className="text-3xl">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="bg-primary text-primary-foreground hover:bg-primary/90 absolute right-0 bottom-0 cursor-pointer rounded-full p-2 transition-colors"
              >
                <Camera className="h-5 w-5" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-muted-foreground text-sm">Click camera icon to change avatar</p>
          </div>

          {/* Name */}
          <div className="space-y-3">
            <label htmlFor="name" className="text-foreground text-lg font-medium">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className={errors.name ? "border-destructive h-12" : "h-12"}
            />
            {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-3">
            <label htmlFor="email" className="text-foreground text-lg font-medium">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              disabled
              className="bg-muted text-muted-foreground cursor-not-allowed opacity-70 h-12"
            />
            <p className="text-muted-foreground text-xs">Email cannot be changed</p>
            {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-3">
            <label htmlFor="phone" className="text-foreground text-lg font-medium">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              className={errors.phone ? "border-destructive h-12" : "h-12"}
            />
            {errors.phone && <p className="text-destructive text-xs">{errors.phone}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-full text-base"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Profile...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
