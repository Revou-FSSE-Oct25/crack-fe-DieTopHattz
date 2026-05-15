"use client";

import { Ship, MapPin, Clock, Wind, Zap, Tv, Lock, Bath, Sun, Wifi, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Define the Ship type based on API response
interface ShipClass {
  name: string;
  price: number;
  description: string;
  seats?: number;
}

interface ShipType {
  id: string;
  name: string;
  operator: string;
  type: string;
  routeFrom: string;
  routeTo: string;
  departureTime: string;
  availableDates: string[];
  classes: {
    economy?: ShipClass;
    business?: ShipClass;
    vip?: ShipClass;
    executive?: ShipClass;
  };
  vehicleRates: {
    motorcycle?: number;
    car?: number;
    truck?: number;
  };
  amenities: string[];
  totalSeats: number;
  active: boolean;
}

interface ShipCardProps {
  ship: ShipType;
  passengerCount: number;
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
  "Wifi": Wifi,
  "WiFi": Wifi,
  "Food Court": Coffee,
  "Cafeteria": Coffee,
  "Snack Bar": Coffee,
  "Prayer Room": Sun,
  "Sun Deck": Sun,
  "Fine Dining": Coffee,
  "Spa": Bath,
  "Private Cabin": Lock,
};

export function ShipCard({ ship, passengerCount, onSelectClass }: ShipCardProps) {
  // Get badge color based on ship type
  const getShipTypeBadge = () => {
    if (ship.type === "passenger-vehicle") {
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Passenger + Vehicle</Badge>;
    }
    return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Passenger Only</Badge>;
  };

  // Convert classes object to array for rendering
  const getClassesArray = () => {
    const classesArray: ShipClass[] = [];
    if (ship.classes.economy) classesArray.push({ ...ship.classes.economy, name: "economy" });
    if (ship.classes.business) classesArray.push({ ...ship.classes.business, name: "business" });
    if (ship.classes.vip) classesArray.push({ ...ship.classes.vip, name: "vip" });
    if (ship.classes.executive) classesArray.push({ ...ship.classes.executive, name: "executive" });
    return classesArray;
  };

  const handleClassSelect = (e: React.MouseEvent, selectedClass: ShipClass) => {
    e.stopPropagation(); // Stop event from bubbling up
    e.preventDefault();
    console.log('🖱️ Class selected:', selectedClass.name);
    onSelectClass(ship.id, selectedClass);
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
              <div className="flex gap-2 mt-1">
                {getShipTypeBadge()}
                <span className="text-sm text-gray-500">by {ship.operator}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{ship.routeFrom} → {ship.routeTo}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Departure: {ship.departureTime} WITA</span>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {ship.amenities.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity] || Wind;
            return (
              <Badge key={amenity} variant="outline" className="flex items-center gap-1">
                <Icon className="h-3 w-3" />
                {amenity}
              </Badge>
            );
          })}
          {ship.amenities.length > 4 && (
            <Badge variant="outline">+{ship.amenities.length - 4} more</Badge>
          )}
        </div>

        {/* Class Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {getClassesArray().map((shipClass) => {
            const totalPrice = shipClass.price * passengerCount;
            const classDisplayName = shipClass.name.charAt(0).toUpperCase() + shipClass.name.slice(1);
            
            return (
              <div
                key={shipClass.name}
                className="border rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                onClick={(e) => handleClassSelect(e, shipClass)}
              >
                {/* Class Name */}
                <div className="font-semibold text-lg capitalize mb-2">
                  {classDisplayName}
                  {shipClass.name === "executive" && <span className="ml-2 text-xs text-yellow-600">⭐ Premium</span>}
                  {shipClass.name === "vip" && <span className="ml-2 text-xs text-purple-600">👑 VIP</span>}
                </div>
                
                {/* Description */}
                <div className="text-xs text-gray-500 mb-2">{shipClass.description}</div>
                
                {/* Seats info */}
                {shipClass.seats && (
                  <div className="text-xs text-gray-400 mb-2">🎫 {shipClass.seats} seats available</div>
                )}
                
                {/* Price */}
                <div className="mb-2">
                  <div className="text-xl font-bold text-blue-600">
                    IDR {totalPrice.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    Total for {passengerCount} passenger{passengerCount !== 1 ? 's' : ''}
                  </div>
                  <div className="text-xs text-gray-400">
                    (IDR {shipClass.price.toLocaleString()} per person)
                  </div>
                </div>
                
                {/* Select Button - Prevent double events */}
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClassSelect(e, shipClass);
                  }}
                >
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