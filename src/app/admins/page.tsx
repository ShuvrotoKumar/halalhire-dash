"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, Eye, Ban, ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BlockedUsersModal from "../users/BlockedUsersModal";
import UserDetailsModal from "../users/UserDetailsModal";
import BlockUserModal from "./BlockUserModal";
import CreateAdminModal from "./CreateAdminModal";
import EditAdminModal from "./EditAdminModal";
import { useGetSingleUserQuery, useGetAllUserQuery } from "@/redux/api/userApi";

const seedAdmins = [
  {
    id: "1",
    name: "Admin John",
    phone: "123-456-7890",
    joinedAt: "2023-01-01",
    email: "admin.john@gmail.com",
    role: "Super Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminJohn",
  },
  {
    id: "2",
    name: "Admin Jane",
    phone: "987-654-3210",
    joinedAt: "2023-02-15",
    email: "admin.jane@email.com",
    role: "Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminJane",
  },
  {
    id: "3",
    name: "Admin Robert",
    phone: "555-123-4567",
    joinedAt: "2023-03-10",
    email: "admin.robert@email.com",
    role: "Editor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminRobert",
  },
  {
    id: "4",
    name: "Admin Emily",
    phone: "444-555-6666",
    joinedAt: "2023-04-20",
    email: "admin.emily@email.com",
    role: "Moderator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminEmily",
  },
  {
    id: "5",
    name: "Admin Michael",
    phone: "222-333-4444",
    joinedAt: "2023-05-30",
    email: "admin.michael@email.com",
    role: "Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminMichael",
  },
  {
    id: "6",
    name: "Admin Sarah",
    phone: "333-444-5555",
    joinedAt: "2023-06-15",
    email: "admin.sarah@email.com",
    role: "Editor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminSarah",
  },
  {
    id: "7",
    name: "Admin David",
    phone: "666-777-8888",
    joinedAt: "2023-07-25",
    email: "admin.david@email.com",
    role: "Moderator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminDavid",
  },
  {
    id: "8",
    name: "Admin Lisa",
    phone: "777-888-9999",
    joinedAt: "2023-08-10",
    email: "admin.lisa@email.com",
    role: "Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminLisa",
  },
  {
    id: "9",
    name: "Admin Tom",
    phone: "888-999-0000",
    joinedAt: "2023-09-05",
    email: "admin.tom@email.com",
    role: "Editor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminTom",
  },
  {
    id: "10",
    name: "Admin Anna",
    phone: "999-000-1111",
    joinedAt: "2023-10-20",
    email: "admin.anna@email.com",
    role: "Moderator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminAnna",
  },
  {
    id: "11",
    name: "Admin Chris",
    phone: "111-222-3333",
    joinedAt: "2023-11-12",
    email: "admin.chris@email.com",
    role: "Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminChris",
  },
  {
    id: "12",
    name: "Admin Maria",
    phone: "222-333-4444",
    joinedAt: "2023-12-01",
    email: "admin.maria@email.com",
    role: "Editor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminMaria",
  },
];

function AdminsTable({
  admins,
  onViewAdmin,
  onBlockAdmin,
  onEditAdmin,
  startIndex,
}: {
  admins: Admin[];
  onViewAdmin: (admin: Admin) => void;
  onBlockAdmin: (admin: Admin) => void;
  onEditAdmin: (admin: Admin) => void;
  startIndex: number;
}) {
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
                  Admin Name
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Role
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
              {admins.map((a, idx) => (
                <tr key={a._id} className="hover:bg-muted/30 transition-colors">
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {startIndex + idx + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={a.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${a.email}`} alt={a.name} />
                        <AvatarFallback>
                          {a.name
                            ? a.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-foreground text-sm font-medium">{a.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-secondary text-secondary-foreground rounded px-2 py-1 text-xs font-medium">
                      {a.role}
                    </span>
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {a.phoneNumber}
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {a.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                        onClick={() => onEditAdmin(a)}
                        title="Edit Admin"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                        onClick={() => onBlockAdmin(a)}
                        title="Block Admin"
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                        onClick={() => onViewAdmin(a)}
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
        {admins.map((a, idx) => (
          <div key={a._id} className="bg-card border-border rounded-lg border p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={a.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${a.email}`} alt={a.name} />
                  <AvatarFallback>
                    {a.name
                      ? a.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="text-foreground truncate font-semibold">{a.name}</h3>
                  <p className="text-muted-foreground text-xs">#{startIndex + idx + 1}</p>
                </div>
              </div>
              <div className="flex flex-shrink-0 gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                  onClick={() => onEditAdmin(a)}
                  title="Edit Admin"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                  onClick={() => onBlockAdmin(a)}
                  title="Block Admin"
                >
                  <Ban className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                  onClick={() => onViewAdmin(a)}
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Role:</span>
                <span className="bg-secondary text-secondary-foreground rounded px-2 py-0.5 text-xs font-medium">
                  {a.role}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground ml-2 truncate">{a.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="text-foreground">{a.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Joined:</span>
                <span className="text-foreground">{a.createdAt ? new Date(a.createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Define Admin type based on API response
interface Admin {
  _id: string;
  name?: string;
  email: string;
  phoneNumber?: string;
  role: string;
  photo?: string;
  createdAt?: string;
  status?: string;
}

export default function AdminsPage() {
  const [blockedAdmins, setBlockedAdmins] = React.useState<Admin[]>([]);
  const [query, setQuery] = React.useState("");
  const [selectedAdmin, setSelectedAdmin] = React.useState<Admin | null>(null);
  const [blockAdmin, setBlockAdmin] = React.useState<Admin | null>(null);
  const [editingAdmin, setEditingAdmin] = React.useState<Admin | null>(null);
  const [showBlockedAdmins, setShowBlockedAdmins] = React.useState(false);
  const [showCreateAdmin, setShowCreateAdmin] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // Fetch all users using getAllUser endpoint
  const { data: usersData, isLoading, error } = useGetAllUserQuery({ 
    page: currentPage, 
    limit: 100 // Get more users to filter locally
  });

  // Try alternative API call if the first one doesn't work
  const { data: altUsersData } = useGetSingleUserQuery({ 
    page: 1, 
    limit: 100,
    // Try without userId parameter
  });

  console.log("getAllUser API Response:", usersData);
  console.log("getSingleUser API Response:", altUsersData);
  console.log("Is Loading:", isLoading);
  console.log("Error:", error);
  
  // Log the entire response structure for debugging
  React.useEffect(() => {
    if (usersData) {
      console.log("Full getAllUser Response Structure:", JSON.stringify(usersData, null, 2));
    }
    if (altUsersData) {
      console.log("Full getSingleUser Response Structure:", JSON.stringify(altUsersData, null, 2));
    }
  }, [usersData, altUsersData]);
  
  // Filter users to show only admin roles
  const admins = React.useMemo(() => {
    // Use the working data source
    const workingData = usersData || altUsersData;
    
    if (!workingData) {
      console.log("No data available from either API call");
      return [];
    }
    
    console.log("Using working data:", workingData);
    
    // Handle different possible response structures
    let usersArray = [];
    
    // Try multiple possible structures based on the API response
    if (Array.isArray(workingData)) {
      usersArray = workingData;
    } else if (workingData.data && Array.isArray(workingData.data)) {
      usersArray = workingData.data;
    } else if (workingData.data && workingData.data.data && Array.isArray(workingData.data.data)) {
      usersArray = workingData.data.data;
    } else if (workingData.users && Array.isArray(workingData.users)) {
      usersArray = workingData.users;
    } else if (workingData.data && workingData.data.users && Array.isArray(workingData.data.users)) {
      usersArray = workingData.data.users;
    } else {
      console.log("No valid user array found in response. Available keys:", Object.keys(workingData));
      // Try to find any array in the response
      const findArray = (obj: any): any[] => {
        for (const key in obj) {
          if (Array.isArray(obj[key])) {
            return obj[key];
          }
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            const found = findArray(obj[key]);
            if (found.length > 0) return found;
          }
        }
        return [];
      };
      usersArray = findArray(workingData);
      console.log("Found array using deep search:", usersArray.length, "users");
    }
    
    console.log("Users array found:", usersArray.length, "users");
    
    if (usersArray.length === 0) return [];
    
    // Filter for user role only (exclude admin and superAdmin)
    const filteredAdmins = usersArray.filter((user: any) => {
      const role = user.role;
      console.log(`User: ${user.name}, Role: ${role}, Email: ${user.email}`);
      // Only include users with 'user' role, exclude admin and superAdmin
      return role === 'user' && role !== 'admin' && role !== 'superAdmin';
    });
    
    console.log("Filtered users:", filteredAdmins.length, "users");
    
    return filteredAdmins.map((user: any) => ({
      _id: user._id,
      name: user.name || 'Unknown',
      email: user.email,
      phoneNumber: user.phoneNumber || user.phone || 'N/A',
      role: user.role,
      photo: user.photo || user.avatar,
      createdAt: user.createdAt || user.joinedDate,
      status: user.status
    }));
  }, [usersData, altUsersData]);

  const filtered = admins.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.email.toLowerCase().includes(query.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAdmins = filtered.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  function handleBlockConfirm() {
    if (blockAdmin) {
      setBlockedAdmins((prev) => [...prev, blockAdmin]);
      setAdmins((prev) => prev.filter((a) => a.id !== blockAdmin.id));
      setBlockAdmin(null);
    }
  }

  function handleUnblock(id: string) {
    const admin = blockedAdmins.find((a) => a.id === id);
    if (admin) {
      setAdmins((prev) => [...prev, admin]);
      setBlockedAdmins((prev) => prev.filter((a) => a.id !== id));
    }
  }

  function handleDelete(id: string) {
    setBlockedAdmins((prev) => prev.filter((a) => a.id !== id));
  }

  function handleCreateAdmin(newAdmin: {
    name: string;
    email: string;
    password: string;
    avatar?: string;
  }) {
    const admin: Admin = {
      id: `${admins.length + blockedAdmins.length + 1}`,
      name: newAdmin.name,
      email: newAdmin.email,
      role: "Admin", // Default role for new admins
      phone: "000-000-0000",
      joinedAt: new Date().toISOString().split("T")[0],
      avatar: newAdmin.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${newAdmin.name}`,
    };
    setAdmins((prev) => [admin, ...prev]);
  }

  function handleUpdateAdmin(updatedAdmin: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  }) {
    if (editingAdmin) {
      setAdmins((prev) =>
        prev.map((a) => (a.id === editingAdmin.id ? { ...a, ...updatedAdmin } : a)),
      );
      setEditingAdmin(null);
    }
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Top header */}
      <div className="bg-primary text-primary-foreground rounded-t-lg p-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Admin List</h2>
          </div>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search Admin"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-background text-foreground border-primary-foreground/20 w-full pl-9"
              />
            </div>
            <Button
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 whitespace-nowrap"
              onClick={() => setShowCreateAdmin(true)}
            >
              Create Admin
            </Button>
            <Button
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 whitespace-nowrap"
              onClick={() => setShowBlockedAdmins(true)}
            >
              Blocked ({blockedAdmins.length})
            </Button>
          </div>
        </div>
      </div>

      {/* Table area */}
      <div>
        {isLoading ? (
          <div className="bg-card border-border rounded-b-lg border p-8 text-center">
            <div className="text-muted-foreground">Loading admins...</div>
          </div>
        ) : error ? (
          <div className="bg-card border-border rounded-b-lg border p-8 text-center">
            <div className="text-destructive">Error loading admins. Please try again.</div>
          </div>
        ) : admins.length === 0 ? (
          <div className="bg-card border-border rounded-b-lg border p-8 text-center">
            <div className="text-muted-foreground">No admins found.</div>
          </div>
        ) : (
          <AdminsTable
            admins={paginatedAdmins}
            onViewAdmin={setSelectedAdmin}
            onBlockAdmin={setBlockAdmin}
            onEditAdmin={setEditingAdmin}
            startIndex={startIndex}
          />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-card border-border rounded-b-lg border-t p-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-muted-foreground text-sm">
              Showing {startIndex + 1} to {Math.min(endIndex, filtered.length)} of {filtered.length}{" "}
              admins
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Previous</span>
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="h-8 w-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-8"
              >
                <span className="mr-1 hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Admin Modal */}
      <UserDetailsModal
        open={!!selectedAdmin}
        onClose={() => setSelectedAdmin(null)}
        user={selectedAdmin}
        onBlock={() => {
          if (selectedAdmin) {
            setBlockAdmin(selectedAdmin);
            setSelectedAdmin(null);
          }
        }}
      />

      {/* Block Admin Modal */}
      <BlockUserModal
        open={!!blockAdmin}
        onClose={() => setBlockAdmin(null)}
        user={blockAdmin}
        onConfirm={handleBlockConfirm}
      />

      {/* Blocked Admins Modal */}
      <BlockedUsersModal
        open={showBlockedAdmins}
        onClose={() => setShowBlockedAdmins(false)}
        blockedUsers={blockedAdmins}
        onUnblock={handleUnblock}
        onDelete={handleDelete}
      />

      {/* Create Admin Modal */}
      <CreateAdminModal
        open={showCreateAdmin}
        onClose={() => setShowCreateAdmin(false)}
        onConfirm={handleCreateAdmin}
      />

      {/* Edit Admin Modal */}
      <EditAdminModal
        open={!!editingAdmin}
        onClose={() => setEditingAdmin(null)}
        onConfirm={handleUpdateAdmin}
        admin={editingAdmin}
      />
    </div>
  );
}
