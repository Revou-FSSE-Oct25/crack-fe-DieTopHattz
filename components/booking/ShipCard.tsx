"use client";

import { Ship, MapPin, Clock, Wind, Zap, Tv, Lock, Bath, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ship as ShipType, ShipClass } from "@/lib/mock-db";

interface ShipCardProps {
  ship: ShipType;
  passengerCount: number;  // ← NEW prop
  onSelectClass: (shipId: string, selectedClass: ShipClass) => void;
}

// Icon mapping for amenities
const amenityIcons: Record<string, React.ElementType> = {
  "AC": Wind,
  "Power outlet": Zap,
  "Window": Sun,
  "Storage locker": Lock,
  "TV": Tv,
  "Private bathroom": Bath,
  "Wifi": Wind,
};

export function ShipCard({ ship, passengerCount, onSelectClass }: ShipCardProps) {
  // Get badge color based on ship type
  const getShipTypeBadge = () => {
    if (ship.type === "passenger-vehicle") {
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Passenger + Vehicle</Badge>;
    }
    return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Passenger Only</Badge>;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <CardContent className="p-6">
        {/* Ship Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <Ship className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold text-gray-900">{ship.name}</h3>
              {getShipTypeBadge()}
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{ship.route.from} → {ship.route.to}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Departure: {ship.departureTime} WITA</span>
            </div>
          </div>
        </div>

        {/* Class Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {ship.classes.map((shipClass) => {
            const totalPrice = shipClass.price * passengerCount;
            
            return (
              <div
                key={shipClass.name}
                className="border rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                onClick={() => onSelectClass(ship.id, shipClass)}
              >
                {/* Class Name */}
                <div className="font-semibold text-lg capitalize mb-2">
                  {shipClass.name}
                  {shipClass.name === "executive" && <span className="ml-2 text-xs text-yellow-600">⭐ Premium</span>}
                </div>
                
                {/* Bed Type */}
                <div className="text-sm text-gray-700 mb-1">{shipClass.beds}</div>
                
                {/* Privacy */}
                <div className="text-xs text-gray-500 mb-3">{shipClass.privacy}</div>
                
                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {shipClass.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || Wind;
                    return (
                      <div key={amenity} className="flex items-center gap-1 text-xs text-gray-500" title={amenity}>
                        <Icon className="h-3 w-3" />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>
                
                {/* Price - NOW SHOWS TOTAL FOR ALL PASSENGERS */}
                <div className="mb-1">
                  <div className="text-xl font-bold text-blue-600">
                    IDR {totalPrice.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    Total for {passengerCount} passenger{passengerCount !== 1 ? 's' : ''}
                  </div>
                </div>
                
                {/* Select Button */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2">
                  Select
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}