"use client";
import { useState } from "react";
import {
  ChartBarStacked,
  LayoutDashboard,
  LogOut,
  MessageSquareWarning,
  PackageSearch,
  Podcast,
  RssIcon,
  Settings,
  User,
  Users,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "../ui/sidebar";

const items = [
  {
    title: "Dashbaord",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "User",
    url: "/users",
    icon: Users,
  },
  {
    title: "Admins",
    url: "/admins",
    icon: User,
  },
  {
    title: "Earnings",
    url: "/earnings",
    icon: Wallet,
  },
  // {
  //   title: "Category",
  //   url: "/category",
  //   icon: ChartBarStacked,
  // },
  // {
  //   title: "Products",
  //   url: "/products",
  //   icon: PackageSearch,
  // },
  {
    title: "Subscription",
    url: "/subscription",
    icon: Podcast,
  },
  // {
  //   title: "Blog",
  //   url: "/blogs",
  //   icon: RssIcon,
  // },
  {
    title: "Reports",
    url: "/reports",
    icon: MessageSquareWarning,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const pathname = usePathname();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  return (
    <Sidebar className="mt-0 ml-0 pb-7 md:mt-5 md:ml-5 md:rounded-t-2xl" collapsible="icon">
      {/* sidebar header */}
      <SidebarHeader className="flex flex-col items-center py-4 md:py-6">
        <div className="flex w-full flex-col items-center gap-2 md:gap-3">
          <div className="mt-3 flex h-28 w-28 items-center justify-center group-data-[collapsible=icon]:mt-0 group-data-[collapsible=icon]:h-14 group-data-[collapsible=icon]:w-14 md:mt-6 md:h-32 md:w-32">
            <Image
              src="/logo.png"
              alt="Logo"
              width={128}
              height={128}
              className="h-full w-full object-contain group-data-[collapsible=icon]:h-14 group-data-[collapsible=icon]:w-14"
              unoptimized
              onError={(e) => {
                console.error('Logo failed to load:', e);
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/next.svg';
              }}
            />
          </div>
          
        </div>
      </SidebarHeader>

      <SidebarSeparator className="mx-auto w-3/4 max-w-xs" />

      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel className="text-base font-semibold">Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="h-12 text-base font-medium md:h-16 md:text-lg"
                    isActive={isActive(item.url)}
                  >
                    <Link
                      href={item.url}
                      className={`flex items-center gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 md:gap-4 ${
                        isActive(item.url)
                          ? "bg-sidebar-primary! text-sidebar-primary-foreground"
                          : "hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                      }`}
                    >
                      <item.icon className="h-6 w-6 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:w-9 md:h-7 md:w-7" />
                      <span className="text-base font-medium md:text-lg">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* sidebar footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-12 border-2 border-red-600 text-base font-medium text-red-500 transition-colors hover:border-red-700 hover:bg-red-500 hover:text-white md:h-16 md:text-lg"
              onClick={() => setLogoutModalOpen(true)}
            >
              <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 md:gap-4">
                <LogOut className="h-6 w-6 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:w-9 md:h-7 md:w-7" />
                <span className="text-base font-medium group-data-[collapsible=icon]:hidden md:text-lg">
                  Log Out
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* Logout Confirmation Modal */}
      <Dialog open={logoutModalOpen} onOpenChange={setLogoutModalOpen} modal={false}>
        <DialogContent className="bg-background sm:max-w-106.25">
          <DialogHeader className="space-y-3">
            <div className="bg-destructive/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
              <LogOut className="text-destructive h-6 w-6" />
            </div>
            <DialogTitle className="text-center text-xl font-semibold">Confirm Logout</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="text-muted-foreground text-center text-sm">
              Are you sure you want to log out of your account?
            </p>
            <p className="text-muted-foreground mt-3 text-center text-xs">
              You will need to log in again to access the dashboard.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLogoutModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Link href="/login">
              <Button
                type="button"
                onClick={() => {
                  // Add your logout logic here
                  console.log("User logged out");
                  // Example: router.push('/login');
                  setLogoutModalOpen(false);
                }}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground flex-1"
              >
                Log Out
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </Sidebar>
  );
};

export default AppSidebar;
