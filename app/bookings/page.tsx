"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Ship, 
  AlertCircle, 
  ChevronRight,
  Search,
  Ticket,
  CalendarCheck,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BookingCard } from '@/components/booking/BookingCard';
import { getBookingsByEmail, cancelBooking, Booking } from '@/lib/mock-db';

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const userEmail = 'john@example.com'; // Mock user email
  
  useEffect(() => {
    const loadBookings = () => {
      const userBookings = getBookingsByEmail(userEmail);
      setBookings(userBookings);
      setFilteredBookings(userBookings);
      setLoading(false);
    };
    
    loadBookings();
  }, [userEmail]);
  
  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(booking => 
        booking.shipName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.routeFrom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.routeTo.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBookings(filtered);
    }
  }, [searchQuery, bookings]);
  
  const handleViewDetails = (bookingId: string) => {
    router.push(`/bookings/${bookingId}`);
  };
  
  const handleCancelBooking = (bookingId: string) => {
    const success = cancelBooking(bookingId);
    if (success) {
      const updatedBookings = getBookingsByEmail(userEmail);
      setBookings(updatedBookings);
      alert('Booking cancelled successfully');
    } else {
      alert('Unable to cancel booking');
    }
  };
  
  const handleDownloadTicket = (bookingId: string) => {
    alert(`Download ticket for booking ${bookingId}`);
  };
  
  const getFilteredBookingsByStatus = (status: string) => {
    if (status === 'all') return filteredBookings;
    return filteredBookings.filter(b => b.status === status);
  };
  
  const getStatusCount = (status: string) => {
    if (status === 'all') return filteredBookings.length;
    return filteredBookings.filter(b => b.status === status).length;
  };
  
  // Tab configuration
  const tabs = [
    { id: 'all', label: 'All', icon: Ticket, color: 'blue', count: getStatusCount('all') },
    { id: 'confirmed', label: 'Upcoming', icon: CalendarCheck, color: 'green', count: getStatusCount('confirmed') },
    { id: 'completed', label: 'Completed', icon: CheckCircle, color: 'blue', count: getStatusCount('completed') },
    { id: 'cancelled', label: 'Cancelled', icon: XCircle, color: 'red', count: getStatusCount('cancelled') },
  ];
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-8 relative">
          <div>
            <h1 className="text-3xl font-bold mb-1">My Bookings</h1>
            <p className="text-blue-100">View and manage your ferry journeys</p>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 py-6">
        {bookings.length === 0 ? (
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 text-center">
              <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg mb-6">
                <Ship className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Bookings Yet</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                You haven't made any ferry bookings. Start your island adventure today!
              </p>
              <Button 
                onClick={() => router.push('/booking')} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                Book Your First Ferry
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        ) : (
          <>
            {/* Search Bar */}
            <div className="mb-5">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by ship, route, or booking ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 border-gray-200 focus:border-blue-300 bg-white"
                />
              </div>
            </div>
            
            {/* Horizontal Filters - Between search and results */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  const colorClasses = {
                    blue: isActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50',
                    green: isActive ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50',
                    red: isActive ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50',
                  };
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        colorClasses[tab.color as keyof typeof colorClasses]
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{tab.label}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Results */}
            {getFilteredBookingsByStatus(activeTab).length === 0 ? (
              <Card className="border-0 shadow-sm">
                <CardContent className="text-center py-12">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                    <AlertCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">
                    No {activeTab === 'all' ? '' : activeTab} bookings found
                  </p>
                  {searchQuery && (
                    <p className="text-sm text-gray-400 mt-1">
                      Try adjusting your search
                    </p>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {getFilteredBookingsByStatus(activeTab).map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onViewDetails={handleViewDetails}
                    onCancel={handleCancelBooking}
                    onDownload={handleDownloadTicket}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}