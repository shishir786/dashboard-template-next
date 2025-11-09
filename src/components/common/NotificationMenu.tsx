"use client"

import React, { useEffect, useRef } from "react"
import Link from "next/link"
import { useNotifications } from "@/context/notification-context"
import { Clock } from "lucide-react"

export default function NotificationMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { getRecent, markRead, markAllRead } = useNotifications()
  const ref = useRef<HTMLDivElement | null>(null)
  const items = getRecent(3)

  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [open, onClose])

  if (!open) return null

  return (
    <div ref={ref} className="absolute right-0 mt-2 w-[320px] z-50">
      <div className="rounded-lg bg-card border border-border shadow-md p-2">
        <div className="flex items-center justify-between px-2 py-1">
          <div className="text-sm font-medium">Notifications</div>
          <button
            onClick={() => {
              markAllRead()
            }}
            className="text-xs text-muted-foreground hover:underline border border-transparent dark:border-[#F4B057] rounded-sm px-2 py-1"
          >
            Read all
          </button>
        </div>

        <div className="divide-y mt-1">
          {items.map((it) => (
            <div key={it.id} className={`flex gap-2 items-start px-3 py-2 ${it.read ? 'opacity-60' : ''}`}>
              <div className="text-muted-foreground pt-1"><Clock className="w-4 h-4" /></div>
              <div className="flex-1">
                <div className="text-sm font-medium">{it.title}</div>
                <div className="text-xs text-muted-foreground">{it.body}</div>
              </div>
              <div className="pl-2">
                {!it.read && (
                  <button
                    onClick={() => markRead(it.id)}
                    className="text-xs text-primary hover:underline"
                  >
                    Mark
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-2">
          <Link href="/notifications" className="block text-center rounded-md bg-primary px-3 py-2 text-white text-sm">
            All notifications
          </Link>
        </div>
      </div>
    </div>
  )
}
