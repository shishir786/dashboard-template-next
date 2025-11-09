"use client"

import React from "react"
import { UsersProvider, useUsers } from "@/context/users-context"
import RecentUser from "@/components/RecentUser"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

function UsersList() {
  const { getAll, removeUser } = useUsers()
  const users = getAll()

  return (
    <div className="flex flex-col gap-3">
      {users.map((u) => (
        <div key={u.id} className="flex items-center justify-between p-3 bg-card border rounded-md">
          <div>
            <div className="font-medium">{u.name}</div>
            {u.email && <div className="text-sm text-muted-foreground">{u.email}</div>}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-muted-foreground">{formatDistanceToNow(u.createdAt, { addSuffix: true })}</div>
            <button
              className="text-sm text-destructive"
              onClick={() => removeUser(u.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function UsersPage() {
  return (
    <UsersProvider>
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <RecentUser />
          </div>
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>All users</CardTitle>
              </CardHeader>
              <CardContent>
                <UsersList />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </UsersProvider>
  )
}
