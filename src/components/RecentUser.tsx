"use client"

import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Eye, Ban, ChevronLeft, ChevronRight } from "lucide-react"
import UserDetailsModal from "@/components/common/modals/UserDetailsModal"
import BlockUserModal from "@/components/common/modals/BlockUserModal"

const recentUsers = [
  {
    id: 'S001',
    name: 'DS',
    email: 'ds@example.com',
    phone: '123-456-7890',
    userType: 'Admin',
    joinedDate: '1/10/2023',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DS'
  },
  {
    id: 'S002',
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    phone: '234-567-8901',
    userType: 'User',
    joinedDate: '3/15/2023',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
  },
  {
    id: 'S003',
    name: 'John Smith',
    email: 'johnsmith@example.com',
    phone: '345-678-9012',
    userType: 'User',
    joinedDate: '5/22/2023',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  {
    id: 'S004',
    name: 'Alice Johnson',
    email: 'alicej@example.com',
    phone: '456-789-0123',
    userType: 'Moderator',
    joinedDate: '7/3/2023',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice'
  },
  {
    id: 'S005',
    name: 'Bob Brown',
    email: 'bobb@example.com',
    phone: '567-890-1234',
    userType: 'User',
    joinedDate: '9/18/2023',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob'
  },
]

type User = typeof recentUsers[0]

export default function RecentUser() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [blockUser, setBlockUser] = useState<User | null>(null)
  const [users, setUsers] = useState(recentUsers)
  const totalPages = 3

  const handleBlockConfirm = () => {
    if (blockUser) {
      setUsers(users.filter(u => u.id !== blockUser.id))
      setBlockUser(null)
    }
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden dark:border-[#F4B057]">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Recent Users</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-primary">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                S.ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                Phone No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                User Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                Joined Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground font-medium">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-foreground">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {user.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {user.userType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {user.joinedDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      title="Block User"
                      onClick={() => setBlockUser(user)}
                    >
                      <Ban className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
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

      {/* Pagination */}
      <div className="p-4 border-t border-border flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* View User Modal */}
      <UserDetailsModal
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
        onBlock={() => {
          if (selectedUser) {
            setBlockUser(selectedUser)
            setSelectedUser(null)
          }
        }}
      />

      {/* Block User Confirmation Modal */}
      <BlockUserModal
        open={!!blockUser}
        onClose={() => setBlockUser(null)}
        user={blockUser}
        onConfirm={handleBlockConfirm}
      />
    </div>
  )
}
