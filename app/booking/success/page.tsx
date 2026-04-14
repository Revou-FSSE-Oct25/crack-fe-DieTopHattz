"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Download, Printer, Home, Ship } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BookingSuccessPage() {
  const router = useRouter();
  const [bookingConfirmation, setBookingConfirmation] = useState<any>(null);
  
  useEffect(() => {
    const savedConfirmation = sessionStorage.getItem('bookingConfirmation');
    if (!savedConfirmation) {
      router.push('/booking');
      return;
    }
    
    setBookingConfirmation(JSON.parse(savedConfirmation));
  }, [router]);
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert('Download ticket feature will be available soon');
  };
  
  if (!bookingConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          Loading...
        </div>
      </div>
    );
  }
  
  const total = (bookingConfirmation.selectedClass?.price || 0) * (bookingConfirmation.passengers || 1);
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Success Card */}
        <Card className="text-center overflow-hidden">
          <div className="bg-green-50 p-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700">Booking Confirmed!</CardTitle>
            <p className="text-gray-600 mt-2">Your ferry ticket has been successfully booked</p>
          </div>
          
          <CardContent className="p-6 space-y-6">
            {/* Booking ID */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Booking ID</p>
              <p className="text-xl font-mono font-bold text-gray-900">{bookingConfirmation.bookingId}</p>
            </div>
            
            {/* Booking Summary */}
            <div className="text-left space-y-3">
              <h3 className="font-semibold text-gray-900">Trip Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Ship</span>
                  <span className="font-medium">{bookingConfirmation.selectedFerry?.operator || bookingConfirmation.shipName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Route</span>
                  <span className="font-medium">{bookingConfirmation.routeFrom} → {bookingConfirmation.routeTo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Departure</span>
                  <span className="font-medium">{bookingConfirmation.departureTime} WITA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Class</span>
                  <span className="font-medium capitalize">{bookingConfirmation.selectedClass?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Passengers</span>
                  <span className="font-medium">{bookingConfirmation.passengers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Paid</span>
                  <span className="font-bold text-green-600">IDR {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleDownload} className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download Ticket
              </Button>
              <Button variant="outline" onClick={handlePrint} className="flex-1">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
            
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Important Info */}
        <Card className="mt-6 bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Ship className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Important Information</p>
                <p className="text-xs text-yellow-700 mt-1">
                  Please arrive at the port at least 1 hour before departure. 
                  Bring your booking ID and valid ID for check-in.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}