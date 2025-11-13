"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
  avatar: string
}

interface BlockUserModalProps {
  open: boolean
  onClose: () => void
  user: User | null
  onConfirm: () => void
}

export default function BlockUserModal({
  open,
  onClose,
  user,
  onConfirm,
}: BlockUserModalProps) {
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()} modal={false}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-destructive">
            Block User
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-destructive/10 rounded-lg">
            <Avatar className="h-12 w-12 flex-shrink-0">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to block this user? This action will prevent them from accessing the platform.
          </p>

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={onConfirm}
            >
              Block User
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
