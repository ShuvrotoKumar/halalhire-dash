"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, Ban, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import UserDetailsModal from "@/app/users/UserDetailsModal";
import BlockUserModal from "@/app/admins/BlockUserModal";
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
  // Additional fields from API
  dateOfBirth?: string;
  countryOrigin?: string;
  maritalStatus?: string;
  numberOfChildren?: number;
  religiousPractice?: string;
  isVerify?: boolean;
  workplace?: string[];
};

export default function RecentUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [blockUser, setBlockUser] = useState<User | null>(null);
  
  // Fetch users from API
  const { data: userData, isLoading, error, refetch } = useGetSingleUserQuery({ 
    page: currentPage, 
    limit: 5 
  });
  
  const users = userData?.data?.all_adminusers || [];
  const totalPages = userData?.data?.meta?.totalPage || 1;
  const totalUsers = userData?.data?.meta?.total || 0;

  const handleBlockConfirm = () => {
    if (blockUser) {
      // Refetch data after blocking user
      refetch();
      setBlockUser(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
    <div className="bg-card border-border overflow-hidden rounded-lg border dark:border-[#F4B057]">
      {/* Header */}
      <div className="border-border border-b p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-foreground text-base font-semibold sm:text-lg">Recent Users</h2>
          <span className="text-muted-foreground text-sm">
            {totalUsers} total users
          </span>
        </div>
      </div>

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
      ) : users.length === 0 ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-muted-foreground">No users found</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full">
              <thead className="bg-primary">
                <tr>
                  <th className="text-primary-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                    ID
                  </th>
                  <th className="text-primary-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                    Name/Company
                  </th>
                  <th className="text-primary-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                    Email
                  </th>
                  <th className="text-primary-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                    Phone
                  </th>
                  <th className="text-primary-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                    Role
                  </th>
                  <th className="text-primary-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                    Status
                  </th>
                  <th className="text-primary-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                    Joined Date
                  </th>
                  <th className="text-primary-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {users.map((user: User) => (
                  <tr key={user._id} className="hover:bg-muted/30 transition-colors">
                    <td className="text-foreground px-6 py-4 text-sm font-medium whitespace-nowrap">
                      {user._id.slice(-6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={getDisplayAvatar(user)} alt={getDisplayName(user)} />
                          <AvatarFallback>
                            {getDisplayName(user)
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <span className="text-foreground text-sm block truncate">{getDisplayName(user)}</span>
                          {user.isVerify && (
                            <span className="text-green-600 text-xs">✓ Verified</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                      {user.phoneNumber || 'N/A'}
                    </td>
                    <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                      <span className="bg-primary/10 text-primary rounded px-2 py-1 text-xs">
                        {user.role}
                      </span>
                    </td>
                    <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                      <span className={`rounded px-2 py-1 text-xs ${
                        user.status === 'isProgress' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                          title="Block User"
                          onClick={() => setBlockUser(user)}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                          title="View Details"
                          onClick={() => setSelectedUser(user)}
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

          {/* Mobile Card View */}
          <div className="space-y-3 p-3 md:hidden">
            {users.map((user: User) => (
              <div key={user._id} className="bg-muted/30 space-y-3 rounded-lg p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={getDisplayAvatar(user)} alt={getDisplayName(user)} />
                      <AvatarFallback>
                        {getDisplayName(user)
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-foreground truncate text-sm font-semibold">{getDisplayName(user)}</h3>
                      <p className="text-muted-foreground text-xs">{user._id.slice(-6)}</p>
                      {user.isVerify && (
                        <p className="text-green-600 text-xs">✓ Verified</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                      title="Block User"
                      onClick={() => setBlockUser(user)}
                    >
                      <Ban className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                      title="View Details"
                      onClick={() => setSelectedUser(user)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="text-foreground truncate">{user.email}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="text-foreground">{user.phoneNumber || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Role:</span>
                    <span className="bg-primary/10 text-primary rounded px-2 py-1">{user.role}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`rounded px-2 py-1 ${
                      user.status === 'isProgress' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Joined:</span>
                    <span className="text-foreground">{formatDate(user.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-border border-t p-3 sm:p-4">
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
        </>
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
          joinedDate: formatDate(selectedUser.createdAt),
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

      {/* Block User Confirmation Modal */}
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
