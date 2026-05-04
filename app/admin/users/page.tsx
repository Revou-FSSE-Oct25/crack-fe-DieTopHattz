"use client";

import { useState } from 'react';
import { Search, Shield, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Mock users data
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', bookings: 3, joined: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', bookings: 5, joined: '2024-02-20' },
  { id: 3, name: 'Admin User', email: 'admin@ferrygo.com', role: 'admin', bookings: 0, joined: '2024-01-01' },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users] = useState(mockUsers);

  const filteredUsers = searchQuery
    ? users.filter(u => 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-500 mt-1">Manage registered users and permissions</p>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>All Users</CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Name</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Email</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Role</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Bookings</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Joined</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{user.name}</td>
                    <td className="py-3 px-2">{user.email}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-2">{user.bookings}</td>
                    <td className="py-3 px-2">{user.joined}</td>
                    <td className="py-3 px-2">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Shield className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                          <UserX className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}