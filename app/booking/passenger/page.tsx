"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Phone, Mail, IdCard, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ProgressIndicator } from '@/components/booking/ProgressIndicator';
import { api } from '@/lib/api';

interface FerrySelection {
  shipId: string;
  shipName: string;
  operator: string;
  routeFrom: string;
  routeTo: string;
  departureTime: string;
  selectedClass: string;
  classPrice: number;
  passengerCount: number;
  departureDate: string;
}

interface Passenger {
  id: number;
  fullName: string;
  dateOfBirth: string;
  idNumber: string;
}

export default function PassengerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [ferrySelection, setFerrySelection] = useState<FerrySelection | null>(null);
  const [error, setError] = useState('');
  
  // Booker details
  const [booker, setBooker] = useState({
    fullName: '',
    phone: '',
    email: '',
  });
  
  // Vehicle selection
  const [hasVehicle, setHasVehicle] = useState(false);
  const [vehicleType, setVehicleType] = useState<'motorcycle' | 'car' | 'truck'>('car');
  
  // Passenger details
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  
  // Validation errors
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  
  const steps = ['Select Ticket', 'Passenger Details', 'Payment'];
  
  useEffect(() => {
    console.log('🔍 Passenger page loaded');
    
    const selection = sessionStorage.getItem('ferrySelection');
    console.log('📦 Session data:', selection);
    
    if (!selection) {
      console.log('❌ No ferry selection found, redirecting to /booking');
      router.push('/booking');
      return;
    }
    
    try {
      const parsed = JSON.parse(selection);
      console.log('✅ Parsed selection:', parsed);
      setFerrySelection(parsed);
      
      // Initialize passenger array based on passenger count
      const initialPassengers: Passenger[] = [];
      for (let i = 0; i < parsed.passengerCount; i++) {
        initialPassengers.push({
          id: i + 1,
          fullName: '',
          dateOfBirth: '',
          idNumber: '',
        });
      }
      setPassengers(initialPassengers);
      setLoading(false);
    } catch (error) {
      console.error('Error parsing selection:', error);
      router.push('/booking');
    }
  }, [router]);
  
  const updatePassenger = (index: number, field: string, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };
  
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    // Validate booker
    if (!booker.fullName.trim()) errors.bookerName = 'Full name is required';
    if (!booker.phone.trim()) errors.bookerPhone = 'Phone number is required';
    if (!booker.email.trim()) errors.bookerEmail = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(booker.email)) errors.bookerEmail = 'Invalid email format';
    
    // Validate passengers
    passengers.forEach((passenger, index) => {
      if (!passenger.fullName.trim()) {
        errors[`passenger_${index}_name`] = `Passenger ${index + 1} name is required`;
      }
      if (!passenger.dateOfBirth) {
        errors[`passenger_${index}_dob`] = `Passenger ${index + 1} date of birth is required`;
      }
      if (!passenger.idNumber.trim()) {
        errors[`passenger_${index}_id`] = `Passenger ${index + 1} ID/Passport number is required`;
      }
    });
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setSubmitting(true);
    setError('');
    
    try {
      // Create booking in backend
      const bookingData = {
        shipId: ferrySelection?.shipId,
        selectedClass: ferrySelection?.selectedClass,
        classPrice: ferrySelection?.classPrice,
        passengerCount: ferrySelection?.passengerCount,
        passengerDetails: passengers,
        bookerDetails: booker,
        vehicleType: hasVehicle ? vehicleType : null,
        departureDate: ferrySelection?.departureDate,
      };
      
      console.log('📝 Creating booking:', bookingData);
      
      const booking = await api.createBooking(bookingData);
      console.log('✅ Booking created:', booking);
      console.log('✅ Booking ID:', booking?.id);
      console.log('✅ Booking amount:', booking?.totalAmount);
      
      // Verify booking ID exists
      if (!booking || !booking.id) {
        throw new Error('Booking creation failed - no ID returned');
      }
      
      // Calculate amount safely
      const classPrice = ferrySelection?.classPrice || 0;
      const passengerCount = ferrySelection?.passengerCount || 1;
      const calculatedAmount = classPrice * passengerCount;
      const finalAmount = booking.totalAmount || calculatedAmount;
      
      // Store booking ID for payment
      sessionStorage.setItem('currentBookingId', booking.id);
      sessionStorage.setItem('currentBookingAmount', String(finalAmount));
      
      console.log('💾 Stored in sessionStorage - currentBookingId:', sessionStorage.getItem('currentBookingId'));
      console.log('💾 Stored amount:', sessionStorage.getItem('currentBookingAmount'));
      console.log('🔀 Redirecting to /booking/payment');
      
      // Navigate to payment page
      router.push('/booking/payment');
      
    } catch (err: any) {
      console.error('❌ Booking failed:', err);
      setError(err.message || 'Failed to create booking. Please try again.');
      setSubmitting(false);
    }
  };
  
  const handleBack = () => {
    router.push('/booking');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  const totalPrice = (ferrySelection?.classPrice || 0) * (ferrySelection?.passengerCount || 1);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Passenger Details</h1>
          <p className="text-blue-100">Please provide your information to continue</p>
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="container mx-auto px-4 mt-6">
        <ProgressIndicator currentStep={2} steps={steps} />
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {error && (
              <Alert className="bg-red-50 border-red-200">
                <AlertDescription className="text-red-600">{error}</AlertDescription>
              </Alert>
            )}
            
            {/* Booker Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Booker Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      value={booker.fullName}
                      onChange={(e) => setBooker({ ...booker, fullName: e.target.value })}
                      className="pl-9"
                      placeholder="Enter full name"
                    />
                  </div>
                  {formErrors.bookerName && <p className="text-sm text-red-500">{formErrors.bookerName}</p>}
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        value={booker.phone}
                        onChange={(e) => setBooker({ ...booker, phone: e.target.value })}
                        className="pl-9"
                        placeholder="+62 812 3456 7890"
                      />
                    </div>
                    {formErrors.bookerPhone && <p className="text-sm text-red-500">{formErrors.bookerPhone}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        type="email"
                        value={booker.email}
                        onChange={(e) => setBooker({ ...booker, email: e.target.value })}
                        className="pl-9"
                        placeholder="booker@example.com"
                      />
                    </div>
                    {formErrors.bookerEmail && <p className="text-sm text-red-500">{formErrors.bookerEmail}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Passenger Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Passenger Details</h2>
              {passengers.map((passenger, index) => (
                <Card key={passenger.id}>
                  <CardHeader>
                    <CardTitle className="text-md">Passenger {passenger.id}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Full Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            value={passenger.fullName}
                            onChange={(e) => updatePassenger(index, 'fullName', e.target.value)}
                            className="pl-9"
                            placeholder="Enter full name"
                          />
                        </div>
                        {formErrors[`passenger_${index}_name`] && (
                          <p className="text-sm text-red-500">{formErrors[`passenger_${index}_name`]}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Date of Birth *</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            type="date"
                            value={passenger.dateOfBirth}
                            onChange={(e) => updatePassenger(index, 'dateOfBirth', e.target.value)}
                            className="pl-9"
                          />
                        </div>
                        {formErrors[`passenger_${index}_dob`] && (
                          <p className="text-sm text-red-500">{formErrors[`passenger_${index}_dob`]}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label>ID / Passport Number *</Label>
                        <div className="relative">
                          <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            value={passenger.idNumber}
                            onChange={(e) => updatePassenger(index, 'idNumber', e.target.value)}
                            className="pl-9"
                            placeholder="KTP / SIM / Passport number"
                          />
                        </div>
                        {formErrors[`passenger_${index}_id`] && (
                          <p className="text-sm text-red-500">{formErrors[`passenger_${index}_id`]}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Vehicle Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  Vehicle Information (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!hasVehicle}
                      onChange={() => setHasVehicle(false)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <span>No Vehicle</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={hasVehicle}
                      onChange={() => setHasVehicle(true)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <span>Bring Vehicle</span>
                  </label>
                </div>
                
                {hasVehicle && (
                  <div className="space-y-2">
                    <Label>Vehicle Type</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="vehicleType"
                          checked={vehicleType === 'motorcycle'}
                          onChange={() => setVehicleType('motorcycle')}
                          className="h-4 w-4 text-blue-600 accent-blue-600"
                        />
                        <span>Motorcycle</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="vehicleType"
                          checked={vehicleType === 'car'}
                          onChange={() => setVehicleType('car')}
                          className="h-4 w-4 text-blue-600 accent-blue-600"
                        />
                        <span>Car</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="vehicleType"
                          checked={vehicleType === 'truck'}
                          onChange={() => setVehicleType('truck')}
                          className="h-4 w-4 text-blue-600 accent-blue-600"
                        />
                        <span>Truck</span>
                      </label>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                ← Back to Search
              </Button>
              <Button onClick={handleSubmit} disabled={submitting} className="flex-1 bg-blue-600 hover:bg-blue-700">
                {submitting ? 'Processing...' : `Continue to Payment →`}
              </Button>
            </div>
          </div>
          
          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">{ferrySelection?.shipName}</p>
                  <p className="text-sm text-gray-500">{ferrySelection?.routeFrom} → {ferrySelection?.routeTo}</p>
                  <p className="text-sm text-gray-500">Departure: {ferrySelection?.departureTime} WITA</p>
                  <p className="text-sm text-gray-500">Date: {ferrySelection?.departureDate}</p>
                  <p className="text-sm text-gray-500">Class: {ferrySelection?.selectedClass}</p>
                  <p className="text-sm text-gray-500">Passengers: {ferrySelection?.passengerCount}</p>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">IDR {totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}