"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Ship, MapPin, Clock, Calendar, Users, Car, CreditCard, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getBookingById, Booking } from '@/lib/mock-db';

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const id = params.id as string;
    const foundBooking = getBookingById(id);
    if (foundBooking) {
      setBooking(foundBooking);
    }
    setLoading(false);
  }, [params.id]);
  
  const getStatusBadge = () => {
    if (!booking) return null;
    switch (booking.status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-700">Confirmed</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-700">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          Loading booking details...
        </div>
      </div>
    );
  }
  
  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Booking Not Found</h1>
          <p className="text-gray-600 mb-6">The booking you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/bookings">Back to My Bookings</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => router.push('/bookings')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to My Bookings
        </Button>
        
        {/* Header */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Booking Details</h1>
            <p className="text-gray-500 font-mono">{booking.bookingId}</p>
          </div>
          {getStatusBadge()}
        </div>
        
        <div className="space-y-6">
          {/* Trip Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-blue-600" />
                Trip Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Ship</p>
                  <p className="font-medium">{booking.shipName}</p>
                  <p className="text-sm text-gray-500">{booking.shipType === 'passenger-vehicle' ? 'Passenger + Vehicle Ferry' : 'Passenger Only Ferry'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Class</p>
                  <p className="font-medium capitalize">{booking.selectedClass}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Route</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{booking.routeFrom} → {booking.routeTo}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{formatDate(booking.departureDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{booking.departureTime} WITA</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Passenger Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Passenger Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {booking.passengers.map((passenger, index) => (
                <div key={index} className="border-b last:border-b-0 pb-3 last:pb-0">
                  <p className="font-medium">Passenger {index + 1}</p>
                  <div className="grid gap-2 md:grid-cols-3 text-sm mt-1">
                    <p><span className="text-gray-500">Name:</span> {passenger.fullName}</p>
                    <p><span className="text-gray-500">Date of Birth:</span> {passenger.dateOfBirth}</p>
                    <p><span className="text-gray-500">ID/Passport:</span> {passenger.idNumber}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          {/* Vehicle Details (if applicable) */}
          {booking.vehicle.hasVehicle && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-blue-600" />
                  Vehicle Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium capitalize">{booking.vehicle.type}</p>
              </CardContent>
            </Card>
          )}
          
          {/* Payment Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Ticket Price ({booking.passengerCount} × IDR {booking.classPrice.toLocaleString()})</span>
                <span>IDR {(booking.classPrice * booking.passengerCount).toLocaleString()}</span>
              </div>
              {booking.vehicle.hasVehicle && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Vehicle Fee</span>
                  <span>IDR 100,000</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total Paid</span>
                <span className="text-blue-600">IDR {booking.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment Method</span>
                <span>{booking.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Booking Date</span>
                <span>{formatDate(booking.bookingDate)}</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Ticket
            </Button>
            <Button variant="outline" className="flex-1">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}