"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Calendar, Shield } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface User {
  id: string
  name: string
  email: string
  phone: string
  joinedDate?: string
  joinedAt?: string
  userType?: string
  avatar: string
}

interface UserDetailsModalProps {
  open: boolean
  onClose: () => void
  user: User | null
  onBlock?: () => void
}

export default function UserDetailsModal({
  open,
  onClose,
  user,
  onBlock,
}: UserDetailsModalProps) {
  if (!user) return null

  const joinedDate = user.joinedDate || user.joinedAt

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()} modal={false}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">User Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* User Avatar and Name */}
          <div className="flex items-center gap-4 pb-4 border-b border-border">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
              <p className="text-sm text-muted-foreground">ID: {user.id}</p>
            </div>
          </div>

          {/* User Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground truncate">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Phone Number</p>
                <p className="text-sm font-medium text-foreground">{user.phone}</p>
              </div>
            </div>

            {user.userType && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">User Type</p>
                  <p className="text-sm font-medium text-foreground">{user.userType}</p>
                </div>
              </div>
            )}

            {joinedDate && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Joined Date</p>
                  <p className="text-sm font-medium text-foreground">{joinedDate}</p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Close
            </Button>
            {onBlock && (
              <Button
                variant="default"
                className="flex-1"
                onClick={onBlock}
              >
                Block User
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
