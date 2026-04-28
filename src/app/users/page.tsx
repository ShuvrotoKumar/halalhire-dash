"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, Eye, Ban, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserDetailsModal from "./UserDetailsModal";
import BlockUserModal from "../admins/BlockUserModal";
import { useGetSingleUserQuery } from "@/redux/api/userApi";


type User = {
  _id: string;
  name?: string;
  companyName?: string;
  email: string;
  phoneNumber?: string;
  photo?: string | null;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  isVerify?: boolean;
  workplace?: string[];
  // Additional fields from API
  dateOfBirth?: string;
  countryOrigin?: string;
  maritalStatus?: string;
  numberOfChildren?: number;
  religiousPractice?: string;
  verifyIdentity?: any;
  professionalProfile?: any;
  WorkPreferences?: any;
  organizationDetails?: any;
  companyVerification?: any;
};

function UsersTable({
  users,
  onViewUser,
  onBlockUser,
  startIndex,
}: {
  users: User[];
  onViewUser: (user: User) => void;
  onBlockUser: (user: User) => void;
  startIndex: number;
}) {
  const getDisplayName = (user: User) => {
    return user.name || user.companyName || 'Unknown';
  };

  const getDisplayAvatar = (user: User) => {
    if (user.photo) {
      return user.photo.startsWith('http') ? user.photo : `${user.photo}`;
    }
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${user._id}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  return (
    <>
      {/* Desktop Table View */}
      <div className="bg-card border-border hidden overflow-hidden rounded-b-lg border shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  No
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  User Name
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Phone Number
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Joined Date
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Email
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {users.map((u, idx) => (
                <tr key={u._id} className="hover:bg-muted/30 transition-colors">
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {startIndex + idx + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={getDisplayAvatar(u)} alt={getDisplayName(u)} />
                        <AvatarFallback>
                          {getDisplayName(u)
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <span className="text-foreground text-sm font-medium block truncate">{getDisplayName(u)}</span>
                        <span className="bg-primary/10 text-primary rounded px-2 py-1 text-xs">{u.role}</span>
                        {u.isVerify && (
                          <span className="text-green-600 text-xs ml-2">✓ Verified</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {u.phoneNumber || 'N/A'}
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {formatDate(u.createdAt)}
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {u.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                        onClick={() => onBlockUser(u)}
                        title="Block User"
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                        onClick={() => onViewUser(u)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="space-y-3 p-4 md:hidden">
        {users.map((u, idx) => (
          <div key={u._id} className="bg-card border-border space-y-3 rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarImage src={getDisplayAvatar(u)} alt={getDisplayName(u)} />
                  <AvatarFallback>
                    {getDisplayName(u)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="text-foreground truncate font-semibold">{getDisplayName(u)}</h3>
                  <p className="text-muted-foreground text-xs">#{startIndex + idx + 1}</p>
                  <span className="bg-primary/10 text-primary rounded px-2 py-1 text-xs">{u.role}</span>
                  {u.isVerify && (
                    <p className="text-green-600 text-xs mt-1">✓ Verified</p>
                  )}
                </div>
              </div>
              <div className="flex flex-shrink-0 gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                  onClick={() => onBlockUser(u)}
                  title="Block User"
                >
                  <Ban className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                  onClick={() => onViewUser(u)}
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground ml-2 truncate">{u.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="text-foreground">{u.phoneNumber || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Joined:</span>
                <span className="text-foreground">{formatDate(u.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function UsersPage() {
  const [query, setQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<"users" | "companies">("users");
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [blockUser, setBlockUser] = React.useState<User | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // Fetch users from API
  const { data: userData, isLoading, error, refetch } = useGetSingleUserQuery({ 
    page: currentPage, 
    limit: itemsPerPage 
  });
  
  const allUsers = userData?.data?.all_adminusers || [];
  const totalPages = userData?.data?.meta?.totalPage || 1;
  const totalUsers = userData?.data?.meta?.total || 0;

  // Filter users by role and search query
  const filteredUsers = allUsers.filter((user: User) => {
    const matchesRole = activeTab === "users" 
      ? user.role === "user"
      : user.role === "company";
    
    const matchesSearch = query === "" || 
      (user.name?.toLowerCase().includes(query.toLowerCase()) || 
       user.companyName?.toLowerCase().includes(query.toLowerCase()) ||
       user.email.toLowerCase().includes(query.toLowerCase()));
    
    return matchesRole && matchesSearch;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;

  React.useEffect(() => {
    setCurrentPage(1);
  }, [query, activeTab]);

  function handleBlockConfirm() {
    if (blockUser) {
      // Refetch data after blocking user
      refetch();
      setBlockUser(null);
    }
  }

  
  const getDisplayName = (user: User) => {
    return user.name || user.companyName || 'Unknown';
  };

  const getDisplayAvatar = (user: User) => {
    if (user.photo) {
      return user.photo.startsWith('http') ? user.photo : `${user.photo}`;
    }
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${user._id}`;
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Top header */}
      <div className="bg-primary text-primary-foreground rounded-t-lg p-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">User List</h2>
          </div>
          <div className="relative w-full sm:w-64">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search User"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-background text-foreground border-primary-foreground/20 w-full pl-9"
              />
            </div>
        </div>
      </div>

      {/* Tabs and controls */}
      <div className="bg-card border-border border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto sm:gap-3">
            <Button
              variant={activeTab === "users" ? "default" : "outline"}
              onClick={() => setActiveTab("users")}
              className="px-4 whitespace-nowrap sm:px-6"
            >
              Users
            </Button>
            <Button
              variant={activeTab === "companies" ? "default" : "outline"}
              onClick={() => setActiveTab("companies")}
              className="px-4 whitespace-nowrap sm:px-6"
            >
              Companies
            </Button>
          </div>
          <span className="text-muted-foreground text-sm">
            {totalUsers} total users
          </span>
        </div>
      </div>

      {/* Table area */}
      <div>
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <p className="text-destructive mb-2">Failed to load users</p>
              <Button onClick={() => refetch()} variant="outline" size="sm">
                Retry
              </Button>
            </div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex h-64 items-center justify-center">
            <p className="text-muted-foreground">
              {query ? "No users found matching your search" : `No ${activeTab} found`}
            </p>
          </div>
        ) : (
          <UsersTable
            users={filteredUsers}
            onViewUser={setSelectedUser}
            onBlockUser={setBlockUser}
            startIndex={startIndex}
          />
        )}
      </div>

      {/* Pagination */}
      {!isLoading && !error && filteredUsers.length > 0 && totalPages > 1 && (
        <div className="bg-card border-border border-t p-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm min-w-12 text-center">
                {currentPage}/{totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View User Modal */}
      <UserDetailsModal
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser ? {
          id: selectedUser._id,
          name: getDisplayName(selectedUser),
          email: selectedUser.email,
          phone: selectedUser.phoneNumber || 'N/A',
          joinedDate: new Date(selectedUser.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }),
          userType: selectedUser.role,
          avatar: getDisplayAvatar(selectedUser)
        } : null}
        onBlock={() => {
          if (selectedUser) {
            setBlockUser(selectedUser);
            setSelectedUser(null);
          }
        }}
      />

      {/* Block User Modal */}
      <BlockUserModal
        open={!!blockUser}
        onClose={() => setBlockUser(null)}
        onConfirm={handleBlockConfirm}
        user={blockUser ? {
          id: blockUser._id,
          name: getDisplayName(blockUser),
          email: blockUser.email,
          avatar: getDisplayAvatar(blockUser)
        } : null}
      />

          </div>
  );
}
