"use client";

import { useState, useEffect } from 'react';
import { User, Phone, Mail, IdCard, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PassengerFormProps {
  passengerCount: number;
  shipType: 'passenger-only' | 'passenger-vehicle';
  onSubmit: (data: {
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
  }) => void;
  onBack: () => void;
}

export function PassengerForm({ passengerCount, shipType, onSubmit, onBack }: PassengerFormProps) {
  const [hasVehicle, setHasVehicle] = useState(false);
  const [vehicleType, setVehicleType] = useState<'motorcycle' | 'car' | 'truck'>('car');
  
  // Booker details
  const [booker, setBooker] = useState({
    fullName: '',
    phone: '',
    email: '',
  });
  
  // Passenger details - dynamic based on passengerCount
  const [passengers, setPassengers] = useState(
    Array(passengerCount).fill(null).map((_, index) => ({
      id: index + 1,
      fullName: '',
      dateOfBirth: '',
      idNumber: '',
    }))
  );
  
  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Update passengers when passengerCount changes
  useEffect(() => {
    if (passengers.length !== passengerCount) {
      const newPassengers = Array(passengerCount).fill(null).map((_, index) => {
        if (index < passengers.length) {
          return passengers[index];
        }
        return {
          id: index + 1,
          fullName: '',
          dateOfBirth: '',
          idNumber: '',
        };
      });
      setPassengers(newPassengers);
    }
  }, [passengerCount]);
  
  const updatePassenger = (index: number, field: string, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };
  
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Validate booker
    if (!booker.fullName.trim()) {
      newErrors['booker_name'] = 'Booker full name is required';
    }
    if (!booker.phone.trim()) {
      newErrors['booker_phone'] = 'Phone number is required';
    } else if (!/^[0-9+\-\s]{10,15}$/.test(booker.phone)) {
      newErrors['booker_phone'] = 'Please enter a valid phone number';
    }
    if (!booker.email.trim()) {
      newErrors['booker_email'] = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(booker.email)) {
      newErrors['booker_email'] = 'Please enter a valid email address';
    }
    
    // Validate each passenger
    passengers.forEach((passenger, index) => {
      if (!passenger.fullName.trim()) {
        newErrors[`passenger_${index}_name`] = `Passenger ${index + 1} name is required`;
      }
      if (!passenger.dateOfBirth) {
        newErrors[`passenger_${index}_dob`] = `Passenger ${index + 1} date of birth is required`;
      }
      if (!passenger.idNumber.trim()) {
        newErrors[`passenger_${index}_id`] = `Passenger ${index + 1} ID/Passport number is required`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        booker,
        passengers,
        vehicle: {
          hasVehicle: shipType === 'passenger-vehicle' && hasVehicle,
          type: hasVehicle ? vehicleType : undefined,
        },
      });
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Booker Details Card - No background, same style as passenger cards */}
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
            {errors.booker_name && <p className="text-sm text-red-500">{errors.booker_name}</p>}
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
              {errors.booker_phone && <p className="text-sm text-red-500">{errors.booker_phone}</p>}
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
              {errors.booker_email && <p className="text-sm text-red-500">{errors.booker_email}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Passenger Details Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Passenger Details</h3>
          <p className="text-sm text-gray-500">{passengerCount} passenger(s)</p>
        </div>
        
        {passengers.map((passenger, index) => (
          <Card key={passenger.id}>
            <CardHeader>
              <CardTitle className="text-md font-semibold">
                Passenger {passenger.id}
              </CardTitle>
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
                  {errors[`passenger_${index}_name`] && (
                    <p className="text-sm text-red-500">{errors[`passenger_${index}_name`]}</p>
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
                  {errors[`passenger_${index}_dob`] && (
                    <p className="text-sm text-red-500">{errors[`passenger_${index}_dob`]}</p>
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
                  {errors[`passenger_${index}_id`] && (
                    <p className="text-sm text-red-500">{errors[`passenger_${index}_id`]}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Vehicle Selection (only for passenger-vehicle ships) */}
      {shipType === 'passenger-vehicle' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              Vehicle Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Radio Buttons for "Bring Vehicle" Option - Using native radios (they work) */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={!hasVehicle}
                  onChange={() => setHasVehicle(false)}
                  className="h-4 w-4 text-blue-600 accent-blue-600"
                />
                <span>No Vehicle</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={hasVehicle}
                  onChange={() => setHasVehicle(true)}
                  className="h-4 w-4 text-blue-600 accent-blue-600"
                />
                <span>Bring Vehicle</span>
              </label>
            </div>

            {/* Vehicle Type Selection - Using native radios for consistency */}
            {hasVehicle && (
              <div className="space-y-2">
                <Label>Vehicle Type</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={vehicleType === 'motorcycle'}
                      onChange={() => setVehicleType('motorcycle')}
                      className="h-4 w-4 text-blue-600 accent-blue-600"
                    />
                    <span>Motorcycle</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={vehicleType === 'car'}
                      onChange={() => setVehicleType('car')}
                      className="h-4 w-4 text-blue-600 accent-blue-600"
                    />
                    <span>Car</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
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
      )}
      
      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          ← Back to Search
        </Button>
        <Button onClick={handleSubmit} className="flex-1 bg-blue-600 hover:bg-blue-700">
          Continue to Payment →
        </Button>
      </div>
    </div>
  );
}