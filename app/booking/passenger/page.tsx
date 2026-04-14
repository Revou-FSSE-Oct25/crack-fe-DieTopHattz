"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressIndicator } from '@/components/booking/ProgressIndicator';
import { PassengerForm } from '@/components/booking/PassengerForm';
import { BookingSummarySidebar } from '@/components/booking/BookingSummarySidebar';
import { getShipById } from '@/lib/mock-db';

export default function PassengerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState<any>(null);
  const [ship, setShip] = useState<any>(null);
  const [passengerCount, setPassengerCount] = useState(1);
  
  const steps = ['Select Ticket', 'Passenger Details', 'Payment'];
  
  useEffect(() => {
    const savedSelection = sessionStorage.getItem('ferrySelection');
    if (!savedSelection) {
      router.push('/booking');
      return;
    }
    
    const parsed = JSON.parse(savedSelection);
    setSelection(parsed);
    setPassengerCount(parsed.passengers || 1);
    
    const fetchedShip = getShipById(parsed.shipId);
    if (!fetchedShip) {
      router.push('/booking');
      return;
    }
    
    setShip(fetchedShip);
    setLoading(false);
  }, [router]);
  
  const handleSubmit = (data: {
    booker: {
      fullName: string;
      phone: string;
      email: string;
    };
    passengers: Array<{
      fullName: string;
      dateOfBirth: string;
      idNumber: string;
    }>;
    vehicle: {
      hasVehicle: boolean;
      type?: 'motorcycle' | 'car' | 'truck';
    };
  }) => {
    // CRITICAL: Extract class name as a STRING from the selection
    const classNameString = selection?.selectedClass?.name || 'Standard';
    const classPriceNumber = selection?.selectedClass?.price || 0;
    
    // Create a clean booking data object
    const bookingData = {
      shipId: selection.shipId,
      date: selection.date,
      passengers: selection.passengers,
      selectedClass: classNameString, // Store as STRING, not object
      selectedClassPrice: classPriceNumber, // Store price separately
      booker: data.booker,
      passengerDetails: data.passengers,
      vehicle: data.vehicle,
    };
    
    console.log('Saving booking data:', bookingData); // Debug log
    
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    router.push('/booking/payment');
  };
  
  const handleBack = () => {
    router.push('/booking');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          Loading...
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Passenger Details</h1>
          <p className="text-blue-100">
            Please provide booker and passenger information
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-6">
        <ProgressIndicator currentStep={2} steps={steps} />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PassengerForm
              passengerCount={passengerCount}
              shipType={ship?.type || 'passenger-only'}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          </div>
          
          <div>
            <BookingSummarySidebar
              shipName={ship?.name || ''}
              shipType={ship?.type === 'passenger-vehicle' ? 'Passenger + Vehicle Ferry' : 'Passenger Only Ferry'}
              routeFrom={ship?.route.from || ''}
              routeTo={ship?.route.to || ''}
              departureTime={ship?.departureTime || ''}
              selectedClassName={selection?.selectedClass?.name || ''}
              price={selection?.selectedClass?.price || 0}
              passengerCount={passengerCount}
              vehicleFee={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}