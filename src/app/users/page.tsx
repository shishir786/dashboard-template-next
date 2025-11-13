"use client"

import React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Search, Eye, Ban, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const seedUsers = [
  { id: '1', name: 'John Doe', phone: '123-456-7890', joinedAt: '2023-01-01', email: 'jdfkfdsaf@gmail.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: '2', name: 'Jane Smith', phone: '987-654-3210', joinedAt: '2023-02-15', email: 'janesmith@email.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
  { id: '3', name: 'Robert Brown', phone: '555-123-4567', joinedAt: '2023-03-10', email: 'robertbrown@email.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert' },
  { id: '4', name: 'Emily Clark', phone: '444-555-6666', joinedAt: '2023-04-20', email: 'emilyclark@email.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
  { id: '5', name: 'Michael Johnson', phone: '222-333-4444', joinedAt: '2023-05-30', email: 'michaeljohnson@email.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
  { id: '6', name: 'Sarah Williams', phone: '333-444-5555', joinedAt: '2023-06-15', email: 'sarahwilliams@email.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: '7', name: 'David Lee', phone: '666-777-8888', joinedAt: '2023-07-25', email: 'davidlee@email.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
]

function UsersTable({ users, onBlockUser }: { users: typeof seedUsers, onBlockUser: (id: string) => void }) {
  return (
    <div className="bg-card rounded-b-lg shadow-sm border border-border overflow-hidden">
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
                      onClick={() => onBlockUser(u.id)}
                      title="Block User"
                    >
                      <Ban className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
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
  )
}

export default function UsersPage() {
  const [users, setUsers] = React.useState(seedUsers)
  const [query, setQuery] = React.useState('')
  const [activeTab, setActiveTab] = React.useState<'clients' | 'providers'>('providers')

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.email.toLowerCase().includes(query.toLowerCase())
  )

  function blockUser(id: string) {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top header */}
      <div className="bg-custom text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold">User List</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search User"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 bg-sidebar text-sidebar w-64 border-primary-foreground/20"
            />
          </div>
          <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            Blocked Users
          </Button>
        </div>
      </div>

      {/* Tabs and controls */}
      <div className="p-4 bg-card border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant={activeTab === 'clients' ? 'default' : 'outline'}
              onClick={() => setActiveTab('clients')}
              className="px-6"
            >
              Clients
            </Button>
            <Button
              variant={activeTab === 'providers' ? 'default' : 'outline'}
              onClick={() => setActiveTab('providers')}
              className="px-6"
            >
              Providers
            </Button>
          </div>
          <Button variant="outline" className="gap-2">
            <span className="text-sm">date</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table area */}
      <div>
        <UsersTable users={filtered} onBlockUser={blockUser} />
      </div>
    </div>
  )
}
