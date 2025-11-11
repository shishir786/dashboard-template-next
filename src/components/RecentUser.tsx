"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

// Local placeholder data so this component no longer depends on a shared UsersContext.
// The user will implement their own API integration in this component later.
const seedUsers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', avatar: '', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', avatar: '', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) },
  { id: '3', name: 'Carol Lee', email: 'carol@example.com', avatar: '', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10) },
]

export default function RecentUser({ max = 10 }: { max?: number }) {
  const items = seedUsers.slice(0, max)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {items.map((u) => (
            <div key={u.id} className="flex items-center gap-3">
              <Avatar>
                {u.avatar ? <AvatarImage src={u.avatar} alt={u.name} /> : <AvatarFallback>{u.name.split(" ")[0][0]}</AvatarFallback>}
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{u.name}</div>
                {u.email && <div className="text-sm text-muted-foreground">{u.email}</div>}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(u.createdAt as Date, { addSuffix: true })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
