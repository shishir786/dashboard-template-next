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
    <div className="pb-4 px-4 sm:px-0 max-h-[86vh] overflow-y-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Notifications</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => markAllRead()}
          className="border border-transparent dark:border-[#746450] w-full sm:w-auto"
        >
          Mark all read
        </Button>
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="relative p-4 bg-card border rounded-lg shadow-sm text-card-foreground dark:border-[#746450] hover:shadow-md transition-shadow"
            >
              <div className="flex gap-3 sm:gap-4">
                {(notification as any).avatar ? (
                  <img
                    src={(notification as any).avatar}
                    alt="Avatar"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted-foreground/10 flex items-center justify-center text-sm text-muted-foreground flex-shrink-0">
                    {notification.title
                      ? notification.title
                          .split(" ")
                          .map((s) => s[0])
                          .slice(0, 2)
                          .join("")
                      : "N"}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base truncate sm:whitespace-normal">
                    {notification.title}
                  </h3>
                  {notification.body && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2 sm:line-clamp-none">
                      {notification.body}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 sm:py-20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <span className="text-3xl sm:text-4xl">🔔</span>
          </div>
          <p className="text-center text-muted-foreground text-sm sm:text-base">
            No notifications yet
          </p>
          <p className="text-center text-muted-foreground text-xs sm:text-sm mt-1">
            You're all caught up!
          </p>
        </div>
      )}
    </div>
  )
}

export default Notifications
