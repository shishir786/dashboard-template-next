"use client"

import React from "react"
import { useNotifications } from "@/context/notification-context"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

import { formatDistanceToNow } from "date-fns"

const Notifications = () => {
  const { notifications, markAllRead } = useNotifications()

  if (!notifications) return null

  return (
    <div className="pb-4 max-h-[86vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => markAllRead()}
          className="border border-transparent dark:border-[#746450]"
        >
          Mark all read
        </Button>
      </div>

      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="relative p-3 bg-card border rounded-lg mb-2 shadow-sm text-card-foreground dark:border-[#746450]"
          >
            <div className="flex gap-4">
              {(notification as any).avatar ? (
                <img
                  src={(notification as any).avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-muted-foreground/10 flex items-center justify-center text-sm text-muted-foreground ">
                  {notification.title
                    ? notification.title
                        .split(" ")
                        .map((s) => s[0])
                        .slice(0, 2)
                        .join("")
                    : "N"}
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold">{notification.title}</h3>
                {notification.body && (
                  <p className="text-sm text-muted-foreground">{notification.body}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-muted-foreground py-10">No notifications.</p>
      )}
    </div>
  )
}

export default Notifications
