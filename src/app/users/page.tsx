"use client"

import React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Search, Eye, Ban } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BlockedUsersModal from "@/components/common/modals/BlockedUsersModal"
import UserDetailsModal from "@/components/common/modals/UserDetailsModal"
import BlockUserModal from "@/components/common/modals/BlockUserModal"

const seedUsers = [
  { id: '1', name: 'John Doe', phone: '123-456-7890', joinedAt: '2023-01-01', email: 'jdfkfdsaf@gmail.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: '2', name: 'Jane Smith', phone: '987-654-3210', joinedAt: '2023-02-15', email: 'janesmith@email.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
  { id: '3', name: 'Robert Brown', phone: '555-123-4567', joinedAt: '2023-03-10', email: 'robertbrown@email.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert' },
  { id: '4', name: 'Emily Clark', phone: '444-555-6666', joinedAt: '2023-04-20', email: 'emilyclark@email.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
  { id: '5', name: 'Michael Johnson', phone: '222-333-4444', joinedAt: '2023-05-30', email: 'michaeljohnson@email.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
  { id: '6', name: 'Sarah Williams', phone: '333-444-5555', joinedAt: '2023-06-15', email: 'sarahwilliams@email.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: '7', name: 'David Lee', phone: '666-777-8888', joinedAt: '2023-07-25', email: 'davidlee@email.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
]

function UsersTable({
  users,
  onViewUser,
  onBlockUser
}: {
  users: typeof seedUsers
  onViewUser: (user: User) => void
  onBlockUser: (user: User) => void
}) {
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-card rounded-b-lg shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">No</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">User Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Joined Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u, idx) => (
                <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{idx + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={u.avatar} alt={u.name} />
                        <AvatarFallback>{u.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{u.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{u.joinedAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{u.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => onBlockUser(u)}
                        title="Block User"
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
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
      <div className="md:hidden space-y-3 p-4">
        {users.map((u, idx) => (
          <div key={u.id} className="bg-card rounded-lg border border-border p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarImage src={u.avatar} alt={u.name} />
                  <AvatarFallback>{u.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{u.name}</h3>
                  <p className="text-xs text-muted-foreground">#{idx + 1}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => onBlockUser(u)}
                  title="Block User"
                >
                  <Ban className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
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
                <span className="text-foreground truncate ml-2">{u.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="text-foreground">{u.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Joined:</span>
                <span className="text-foreground">{u.joinedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

type User = typeof seedUsers[0]

export default function UsersPage() {
  const [users, setUsers] = React.useState(seedUsers)
  const [blockedUsers, setBlockedUsers] = React.useState<User[]>([])
  const [query, setQuery] = React.useState('')
  const [activeTab, setActiveTab] = React.useState<'clients' | 'providers'>('providers')
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)
  const [blockUser, setBlockUser] = React.useState<User | null>(null)
  const [showBlockedUsers, setShowBlockedUsers] = React.useState(false)

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.email.toLowerCase().includes(query.toLowerCase())
  )

  function handleBlockConfirm() {
    if (blockUser) {
      setBlockedUsers((prev) => [...prev, blockUser])
      setUsers((prev) => prev.filter((u) => u.id !== blockUser.id))
      setBlockUser(null)
    }
  }

  function handleUnblock(id: string) {
    const user = blockedUsers.find((u) => u.id === id)
    if (user) {
      setUsers((prev) => [...prev, user])
      setBlockedUsers((prev) => prev.filter((u) => u.id !== id))
    }
  }

  function handleDelete(id: string) {
    setBlockedUsers((prev) => prev.filter((u) => u.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold">User List</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search User"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 bg-background text-foreground w-full border-primary-foreground/20"
              />
            </div>
            <Button
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 whitespace-nowrap"
              onClick={() => setShowBlockedUsers(true)}
            >
              Blocked ({blockedUsers.length})
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs and controls */}
      <div className="p-4 bg-card border-b border-border">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
          <Button
            variant={activeTab === 'clients' ? 'default' : 'outline'}
            onClick={() => setActiveTab('clients')}
            className="px-4 sm:px-6 whitespace-nowrap"
          >
            Clients
          </Button>
          <Button
            variant={activeTab === 'providers' ? 'default' : 'outline'}
            onClick={() => setActiveTab('providers')}
            className="px-4 sm:px-6 whitespace-nowrap"
          >
            Providers
          </Button>
        </div>
      </div>

      {/* Table area */}
      <div>
        <UsersTable
          users={filtered}
          onViewUser={setSelectedUser}
          onBlockUser={setBlockUser}
        />
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

      {/* Block User Modal */}
      <BlockUserModal
        open={!!blockUser}
        onClose={() => setBlockUser(null)}
        user={blockUser}
        onConfirm={handleBlockConfirm}
      />

      {/* Blocked Users Modal */}
      <BlockedUsersModal
        open={showBlockedUsers}
        onClose={() => setShowBlockedUsers(false)}
        blockedUsers={blockedUsers}
        onUnblock={handleUnblock}
        onDelete={handleDelete}
      />
    </div>
  )
}
