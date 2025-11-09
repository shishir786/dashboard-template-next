"use client"

import React, { createContext, useContext, useMemo, useState } from "react"

export type UserItem = {
  id: string
  name: string
  email?: string
  avatar?: string
  createdAt: number
}

type UsersContextType = {
  users: UserItem[]
  getRecent: (n?: number) => UserItem[]
  getAll: () => UserItem[]
  addUser: (u: Omit<UserItem, "id" | "createdAt">) => void
  removeUser: (id: string) => void
}

const UsersContext = createContext<UsersContextType | null>(null)

function seedUsers() {
  const now = Date.now()
  const names = [
    "Alex Johnson",
    "Maria Garcia",
    "Chen Wei",
    "Fatima Khan",
    "Liam Smith",
    "Olivia Brown",
    "Noah Davis",
    "Emma Wilson",
    "Ethan Miller",
    "Ava Martinez",
    "Sophia Anderson",
    "William Thomas",
    "James Taylor",
    "Amelia Moore",
    "Mason Jackson",
    "Isabella White",
    "Lucas Harris",
    "Mia Martin",
    "Henry Thompson",
    "Charlotte Lee",
  ]

  return names.map((n, i) => ({
    id: `u${i + 1}`,
    name: n,
    email: `${n.split(" ")[0].toLowerCase()}@example.com`,
    createdAt: now - i * 1000 * 60 * 60, // each one hour apart
  }))
}

function useInternalUsers() {
  const [users, setUsers] = useState<UserItem[]>(() => seedUsers())

  const getRecent = (n = 10) => {
    return [...users].sort((a, b) => b.createdAt - a.createdAt).slice(0, n)
  }

  const getAll = () => {
    return [...users].sort((a, b) => b.createdAt - a.createdAt)
  }

  const addUser = (u: Omit<UserItem, "id" | "createdAt">) => {
    const item: UserItem = {
      id: `u${Math.random().toString(36).slice(2, 9)}`,
      createdAt: Date.now(),
      ...u,
    }
    setUsers((prev) => [item, ...prev])
  }

  const removeUser = (id: string) => {
    setUsers((prev) => prev.filter((p) => p.id !== id))
  }

  return { users, getRecent, getAll, addUser, removeUser }
}

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const api = useInternalUsers()

  const value = useMemo(() => api, [api.users])

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

export function useUsers() {
  const ctx = useContext(UsersContext)
  if (!ctx) throw new Error("useUsers must be used within UsersProvider")
  return ctx
}

export default UsersProvider
