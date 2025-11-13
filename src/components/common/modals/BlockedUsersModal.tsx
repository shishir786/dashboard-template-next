"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserCheck, Trash2 } from "lucide-react"
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
  joinedAt: string
  avatar: string
}

interface BlockedUsersModalProps {
  open: boolean
  onClose: () => void
  blockedUsers: User[]
  onUnblock: (id: string) => void
  onDelete: (id: string) => void
}

export default function BlockedUsersModal({
  open,
  onClose,
  blockedUsers,
  onUnblock,
  onDelete,
}: BlockedUsersModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()} modal={false}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Blocked Users ({blockedUsers.length})
          </DialogTitle>
        </DialogHeader>

        {blockedUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <UserCheck className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Blocked Users
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              You haven't blocked any users yet. Blocked users will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[60vh]">
            <div className="space-y-3">
              {blockedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">
                        {user.name}
                      </h4>
                      <p className="text-sm text-muted-foreground truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUnblock(user.id)}
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      Unblock
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(user.id)}
                      title="Delete User Permanently"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
