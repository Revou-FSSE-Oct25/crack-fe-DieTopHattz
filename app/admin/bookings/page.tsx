"use client";

import { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MOCK_BOOKINGS } from '@/lib/mock-db';

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookings] = useState(MOCK_BOOKINGS);

  const filteredBookings = searchQuery
    ? bookings.filter(b => 
        b.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.booker.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : bookings;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Booking Management</h1>
        <p className="text-gray-500 mt-1">View and manage all customer bookings</p>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>All Bookings</CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by ID or customer..."
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
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Booking ID</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Customer</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Ship</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Date</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Passengers</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Total</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-xs">{booking.bookingId}</td>
                    <td className="py-3 px-2">{booking.booker.fullName}</td>
                    <td className="py-3 px-2">{booking.shipName}</td>
                    <td className="py-3 px-2">{booking.departureDate}</td>
                    <td className="py-3 px-2">{booking.passengerCount}</td>
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
                    <td className="py-3 px-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
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