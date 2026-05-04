"use client";

import { useState, useEffect } from 'react';
import { Plus, RefreshCw, TrendingUp, Users as UsersIcon, Calendar, Ship as ShipIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCards } from '@/components/admin/StatsCards';
import { MOCK_BOOKINGS } from '@/lib/mock-db';

// Mock data - in real app, fetch from backend
const mockStats = {
  totalShips: 8,
  totalBookings: 12,
  totalUsers: 45,
  totalRevenue: 12500000,
};

const recentBookings = MOCK_BOOKINGS.slice(0, 5);

export default function AdminDashboard() {
  const [stats, setStats] = useState(mockStats);
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={refreshData}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="h-4 w-4" />
            Add Ship
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Quick Actions */}
      <div className="grid gap-5 md:grid-cols-3">
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <ShipIcon className="h-4 w-4 text-blue-600" />
              Ship Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">Manage ferry ships, schedules, and routes</p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href="/admin/ships">Manage Ships →</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-600" />
              Booking Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">View and manage all customer bookings</p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href="/admin/bookings">View Bookings →</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <UsersIcon className="h-4 w-4 text-purple-600" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">Manage registered users and permissions</p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href="/admin/users">Manage Users →</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Booking ID</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Customer</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Ship</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Date</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Total</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-xs">{booking.bookingId}</td>
                    <td className="py-3 px-2">{booking.booker.fullName}</td>
                    <td className="py-3 px-2">{booking.shipName}</td>
                    <td className="py-3 px-2">{booking.departureDate}</td>
                    <td className="py-3 px-2">IDR {booking.totalAmount.toLocaleString()}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {booking.status}
                      </span>
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