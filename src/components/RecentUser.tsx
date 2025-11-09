"use client"

import React from "react"
import { useUsers } from "@/context/users-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

export default function RecentUser({ max = 10 }: { max?: number }) {
  const { getRecent } = useUsers()
  const items = getRecent(max)

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
                {formatDistanceToNow(u.createdAt, { addSuffix: true })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
