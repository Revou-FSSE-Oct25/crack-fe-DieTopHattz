"use client";

import { useState } from 'react';
import { Ship, MapPin, Clock, Users, Calendar, Download, XCircle, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Booking } from '@/lib/mock-db';

interface BookingCardProps {
  booking: Booking;
  onViewDetails: (bookingId: string) => void;
  onCancel: (bookingId: string) => void;
  onDownload: (bookingId: string) => void;
}

export function BookingCard({ booking, onViewDetails, onCancel, onDownload }: BookingCardProps) {
  const [isCancelling, setIsCancelling] = useState(false);
  
  const getStatusBadge = () => {
    switch (booking.status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Confirmed</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Cancelled</Badge>;
      default:
        return <Badge>Pending</Badge>;
    }
  };
  
  const handleCancel = async () => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      setIsCancelling(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onCancel(booking.id);
      setIsCancelling(false);
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          {/* Left Section - Booking Info */}
          <div className="flex-1 space-y-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <Ship className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">{booking.shipName}</h3>
                {getStatusBadge()}
              </div>
              <p className="text-sm text-gray-500 font-mono">
                Booking ID: {booking.bookingId}
              </p>
            </div>
            
            {/* Route and Schedule */}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{booking.routeFrom} → {booking.routeTo}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>Departure: {booking.departureTime} WITA</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{formatDate(booking.departureDate)}</span>
              </div>
            </div>
            
            {/* Details */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>🎫 {booking.selectedClass} class</span>
              <span>👥 {booking.passengerCount} passenger(s)</span>
              {booking.vehicle.hasVehicle && (
                <span>🚗 {booking.vehicle.type} included</span>
              )}
              <span>💰 Total: IDR {booking.totalAmount.toLocaleString()}</span>
            </div>
          </div>
          
          {/* Right Section - Actions */}
          <div className="flex flex-row lg:flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(booking.id)}
              className="flex-1 lg:w-auto"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload(booking.id)}
              className="flex-1 lg:w-auto"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            {booking.status === 'confirmed' && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isCancelling}
                className="flex-1 lg:w-auto text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <XCircle className="mr-2 h-4 w-4" />
                {isCancelling ? 'Cancelling...' : 'Cancel'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}