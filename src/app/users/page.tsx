"use client"

import React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"

// Seed users that mimic the screenshot dataset. Keep this page self-contained.
const seedUsers = [
  { id: '1', name: 'John Doe', phone: '123-456-7890', joinedAt: '2023-01-01', email: 'jdfkfdsaf@gmail.com', avatar: '' },
  { id: '2', name: 'Jane Smith', phone: '987-654-3210', joinedAt: '2023-02-15', email: 'janesmith@email.com', avatar: '' },
  { id: '3', name: 'Robert Brown', phone: '555-123-4567', joinedAt: '2023-03-10', email: 'robertbrown@email.com', avatar: '' },
  { id: '4', name: 'Emily Clark', phone: '444-555-6666', joinedAt: '2023-04-20', email: 'emilyclark@email.com', avatar: '' },
  { id: '5', name: 'Michael Johnson', phone: '222-333-4444', joinedAt: '2023-05-30', email: 'michaeljohnson@email.com', avatar: '' },
  { id: '6', name: 'Sarah Williams', phone: '333-444-5555', joinedAt: '2023-06-15', email: 'sarahwilliams@email.com', avatar: '' },
  { id: '7', name: 'David Lee', phone: '666-777-8888', joinedAt: '2023-07-25', email: 'davidlee@email.com', avatar: '' },
]

function UsersTable() {
  const [users, setUsers] = React.useState(seedUsers)
  const [query, setQuery] = React.useState('')

  const filtered = users.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()))

  function removeUser(id: string) {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  return (
    <div className="bg-sidebar rounded-md shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-sidebar">
          <thead className="bg-sidebar">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-sidebar divide-y divide-sidebar">
            {filtered.map((u, idx) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{idx + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                  <Avatar>
                    {u.avatar ? <AvatarImage src={u.avatar} alt={u.name} /> : <AvatarFallback>{u.name.split(' ')[0][0]}</AvatarFallback>}
                  </Avatar>
                  <span className="text-sm text-gray-700">{u.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.joinedAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-4">
                  <button className="text-red-500" onClick={() => removeUser(u.id)} title="Block">🚫</button>
                  <button className="text-blue-600" title="View">👁️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function UsersPage() {
  return (
    <div className="min-h-screen">
      {/* Top header */}
      <div className="bg-[#08335b] text-white p-4 rounded-t-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="text-white text-2xl">←</button>
          <h2 className="text-lg font-semibold">User List</h2>
        </div>
        <div className="flex items-center gap-3">
          <input
            placeholder="Search User"
            className="px-3 py-2 rounded-md text-sm text-gray-700"
          />
          <button className="bg-white text-[#08335b] px-4 py-2 rounded-md">Blocked Users</button>
        </div>
      </div>

      {/* Tabs and controls */}
      <div className="p-4 bg-white border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border rounded-md">Clients</button>
            <button className="px-4 py-2 bg-[#08335b] text-white rounded-md">Providers</button>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 border rounded-md px-3 py-2">
              <span className="text-sm">date</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Table area */}
      <div className="p-6 bg-[#f8fafc]">
        <div className="container mx-auto">
          <UsersTable />
        </div>
      </div>
    </div>
  )
}
