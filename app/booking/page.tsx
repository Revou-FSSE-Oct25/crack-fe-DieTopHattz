"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarIcon, Filter, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ShipCard } from '@/components/booking/ShipCard';
import { ProgressIndicator } from '@/components/booking/ProgressIndicator';
import { api } from '@/lib/api';

interface Route {
  from: string;
  to: string;
}

interface ShipClass {
  name: string;
  price: number;
  description: string;
  seats?: number;
}

interface Ship {
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

export default function FindFerriesPage() {
  const router = useRouter();
  
  // Search filters
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShipType, setSelectedShipType] = useState('all');
  const [selectedRoute, setSelectedRoute] = useState('all');
  const [passengerCount, setPassengerCount] = useState(1);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filteredShips, setFilteredShips] = useState<Ship[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const steps = ['Select Ticket', 'Passenger Details', 'Payment'];
  
  // Load available routes on mount
  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const routesData = await api.getAvailableRoutes();
        setRoutes(routesData);
        console.log('📡 Routes loaded:', routesData);
      } catch (error) {
        console.error('Failed to load routes:', error);
      }
    };
    loadRoutes();
  }, []);
  
  // Handle search
  const handleSearch = async () => {
    if (!selectedDate) {
      alert('Please select a departure date');
      return;
    }
    
    setLoading(true);
    
    try {
      let routeFrom, routeTo;
      if (selectedRoute !== 'all') {
        const selected = routes.find(r => `${r.from}|||${r.to}` === selectedRoute);
        if (selected) {
          routeFrom = selected.from;
          routeTo = selected.to;
        }
      }
      
      const searchParams: any = {
        date: selectedDate,
      };
      
      if (routeFrom && routeFrom !== 'undefined') searchParams.routeFrom = routeFrom;
      if (routeTo && routeTo !== 'undefined') searchParams.routeTo = routeTo;
      if (selectedShipType !== 'all' && selectedShipType !== 'undefined') {
        searchParams.type = selectedShipType;
      }
      
      console.log('🔍 Search params:', searchParams);
      
      const ships = await api.searchShips(searchParams);
      
      console.log('🚢 Ships found:', ships.length);
      setFilteredShips(ships);
      setHasSearched(true);
    } catch (error) {
      console.error('Search failed:', error);
      alert('Failed to search ferries. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle class selection - UPDATED WITH DEBUG LOGS
  const handleSelectClass = async (ship: Ship, selectedClass: ShipClass) => {
    console.log('🚢 1. handleSelectClass STARTED');
    console.log('   Ship:', ship.name);
    console.log('   Class:', selectedClass.name);
    console.log('   Passenger Count:', passengerCount);
    console.log('   Date:', selectedDate);
    
    try {
      const selection = {
        shipId: ship.id,
        shipName: ship.name,
        operator: ship.operator,
        routeFrom: ship.routeFrom,
        routeTo: ship.routeTo,
        departureTime: ship.departureTime,
        selectedClass: selectedClass.name,
        classPrice: selectedClass.price,
        passengerCount: passengerCount,
        departureDate: selectedDate,
      };
      
      console.log('💾 2. Saving to sessionStorage:', selection);
      sessionStorage.setItem('ferrySelection', JSON.stringify(selection));
      
      // Verify it was saved
      const saved = sessionStorage.getItem('ferrySelection');
      console.log('✅ 3. Verification - saved data:', saved);
      
      console.log('🔀 4. About to navigate to /booking/passenger');
      router.push('/booking/passenger');
      
    } catch (error) {
      console.error('❌ Selection failed:', error);
      alert('Failed to select ferry. Please try again.');
    }
  };
  
  const resetFilters = () => {
    setSelectedDate('');
    setSelectedShipType('all');
    setSelectedRoute('all');
    setPassengerCount(1);
    setHasSearched(false);
    setFilteredShips([]);
  };
  
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Find Your Ferry</h1>
          <p className="text-blue-100">Search, compare, and book your ferry tickets</p>
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="container mx-auto px-4 mt-6">
        <ProgressIndicator currentStep={1} steps={steps} />
      </div>
      
      {/* Search Filters */}
      <div className="container mx-auto px-4 mt-6">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-5">
              {/* Date Picker */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Departure Date</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={today}
                    className="pl-9 w-full h-10"
                  />
                </div>
              </div>
              
              {/* Route Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Route</Label>
                <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="All Routes" />
                  </SelectTrigger>
                  <SelectContent 
                    side="bottom" 
                    align="start" 
                    position="popper" 
                    className="z-50 bg-white border border-gray-200 rounded-md shadow-lg"
                    sideOffset={5}
                  >
                    <SelectItem value="all">All Routes</SelectItem>
                    {routes.map((route) => (
                      <SelectItem key={`${route.from}|||${route.to}`} value={`${route.from}|||${route.to}`}>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{route.from} → {route.to}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Ship Type Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Ship Type</Label>
                <Select value={selectedShipType} onValueChange={setSelectedShipType}>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="All Ship Types" />
                  </SelectTrigger>
                  <SelectContent 
                    side="bottom" 
                    align="start" 
                    position="popper" 
                    className="z-50 bg-white border border-gray-200 rounded-md shadow-lg"
                    sideOffset={5}
                  >
                    <SelectItem value="all">All Ships</SelectItem>
                    <SelectItem value="passenger-only">Passenger Only</SelectItem>
                    <SelectItem value="passenger-vehicle">Passenger + Vehicle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Passenger Count */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Passengers</Label>
                <div className="flex items-center gap-2 h-10">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 w-8"
                    onClick={() => setPassengerCount(Math.max(1, passengerCount - 1))}
                    disabled={passengerCount <= 1}
                  >
                    -
                  </Button>
                  <div className="flex items-center justify-center gap-2 flex-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="font-semibold min-w-[20px] text-center">{passengerCount}</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 w-8"
                    onClick={() => setPassengerCount(Math.min(10, passengerCount + 1))}
                    disabled={passengerCount >= 10}
                  >
                    +
                  </Button>
                </div>
                <p className="text-xs text-gray-400">Up to 10 passengers</p>
              </div>
              
              {/* Search Button Column */}
              <div className="space-y-2">
                <div className="text-sm font-medium opacity-0">Action</div>
                <div className="flex gap-2">
                  <Button onClick={handleSearch} disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 h-10">
                    <Filter className="mr-2 h-4 w-4" />
                    {loading ? 'Searching...' : 'Search'}
                  </Button>
                  {hasSearched && (
                    <Button onClick={resetFilters} variant="outline" className="flex-1 h-10">
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Results Section */}
      <div className="container mx-auto px-4 py-8">
        {!hasSearched ? (
          <div className="text-center py-12">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
              <CalendarIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">No search yet</h3>
            <p className="text-gray-500 mt-2">
              Please select a departure date and search for available ferries
            </p>
          </div>
        ) : loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-2">Searching for ferries...</p>
          </div>
        ) : filteredShips.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 mb-4">
              <CalendarIcon className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">No ferries found</h3>
            <p className="text-gray-500 mt-2">
              No ferries available for your search criteria. Please try different filters.
            </p>
            <Button variant="outline" onClick={resetFilters} className="mt-4">
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h2 className="text-xl font-semibold">
                {filteredShips.length} Ferry{filteredShips.length !== 1 ? 's' : ''} Found
              </h2>
              <div className="flex gap-3 text-sm text-gray-500">
                {selectedDate && <span>📅 {selectedDate}</span>}
                {selectedRoute !== 'all' && selectedRoute !== 'undefined' && (
                  <span>📍 {routes.find(r => `${r.from}|||${r.to}` === selectedRoute)?.from} → {routes.find(r => `${r.from}|||${r.to}` === selectedRoute)?.to}</span>
                )}
                {selectedShipType !== 'all' && selectedShipType !== 'undefined' && (
                  <span>🚢 {selectedShipType === 'passenger-only' ? 'Passenger Only' : 'Passenger + Vehicle'}</span>
                )}
                <span>👥 {passengerCount} passenger{passengerCount !== 1 ? 's' : ''}</span>
              </div>
            </div>
            
            {filteredShips.map((ship) => (
              <ShipCard
                key={ship.id}
                ship={ship}
                passengerCount={passengerCount}
                onSelectClass={(shipId, selectedClass) => {
                  const fullShip = filteredShips.find(s => s.id === shipId);
                  if (fullShip) {
                    handleSelectClass(fullShip, selectedClass);
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}