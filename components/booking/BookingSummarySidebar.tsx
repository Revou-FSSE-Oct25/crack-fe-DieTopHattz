"use client";

import { Ship, MapPin, Clock, Users, Car } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface BookingSummarySidebarProps {
  shipName: string;
  shipType: string;
  routeFrom: string;
  routeTo: string;
  departureTime: string;
  selectedClassName: string;  // Now expects a string, not an object
  price: number;
  passengerCount: number;
  vehicleFee?: number;
}

export function BookingSummarySidebar({
  shipName,
  shipType,
  routeFrom,
  routeTo,
  departureTime,
  selectedClassName,
  price,
  passengerCount,
  vehicleFee = 0,
}: BookingSummarySidebarProps) {
  const subtotal = price * passengerCount;
  const total = subtotal + vehicleFee;
  
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Ship Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Ship className="h-4 w-4 text-blue-600" />
            <span className="font-semibold">{shipName}</span>
          </div>
          <div className="text-sm text-gray-500 pl-6">{shipType}</div>
        </div>
        
        <Separator />
        
        {/* Route Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{routeFrom} → {routeTo}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>Departure: {departureTime} WITA</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-gray-400" />
            <span>{passengerCount} passenger(s) - {selectedClassName} class</span>
          </div>
        </div>
        
        <Separator />
        
        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Ticket Price ({passengerCount} × IDR {price.toLocaleString()})</span>
            <span>IDR {subtotal.toLocaleString()}</span>
          </div>
          {vehicleFee > 0 && (
            <div className="flex justify-between text-sm">
              <span>Vehicle Fee</span>
              <span>IDR {vehicleFee.toLocaleString()}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span className="text-blue-600">IDR {total.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}