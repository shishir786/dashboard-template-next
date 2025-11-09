"use client"

import React, { createContext, useContext, useMemo, useState } from "react"

export type NotificationItem = {
  id: string
  title: string
  body?: string
  createdAt: number
  read?: boolean
}

type NotificationContextType = {
  notifications: NotificationItem[]
  getRecent: (n?: number) => NotificationItem[]
  markRead: (id: string) => void
  markAllRead: () => void
  addNotification: (n: Omit<NotificationItem, "id" | "createdAt">) => void
}

const NotificationContext = createContext<NotificationContextType | null>(
  null,
)

function useInternalNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const now = Date.now()
    return [
      { id: "n1", title: "New sign-up", body: "A new user signed up.", createdAt: now - 1000 * 60 * 60 * 2, read: false },
      { id: "n2", title: "Server report", body: "Daily report is ready.", createdAt: now - 1000 * 60 * 60 * 6, read: false },
      { id: "n3", title: "Payment received", body: "$120 received.", createdAt: now - 1000 * 60 * 60 * 24, read: true },
      { id: "n4", title: "Reminder", body: "Meeting at 3PM.", createdAt: now - 1000 * 60 * 60 * 48, read: true },
      { id: "n5", title: "Alert", body: "High memory usage.", createdAt: now - 1000 * 60 * 15, read: false },
    ]
  })

  const getRecent = (n = 3) => {
    return [...notifications].sort((a, b) => b.createdAt - a.createdAt).slice(0, n)
  }

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((p) => (p.id === id ? { ...p, read: true } : p)))
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((p) => ({ ...p, read: true })))
  }

  const addNotification = (n: Omit<NotificationItem, "id" | "createdAt">) => {
    const item: NotificationItem = {
      id: `n${Math.random().toString(36).slice(2, 9)}`,
      createdAt: Date.now(),
      ...n,
    }
    setNotifications((prev) => [item, ...prev])
  }

  return { notifications, getRecent, markRead, markAllRead, addNotification }
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const api = useInternalNotifications()

  const value = useMemo(() => api, [api.notifications])

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider")
  return ctx
}

export default NotificationProvider
