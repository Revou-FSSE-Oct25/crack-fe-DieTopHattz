// lib/mock-db.ts

export interface ShipClass {
  name: string;        // "executive", "vip", "economyPlus", "economy"
  price: number;
  beds: string;        // "2 bunk beds", "1 bunk bed", "Open bunk beds", "Seats only"
  privacy: string;     // "Private room", "Open area (no walls)", "Open seating"
  amenities: string[]; // ["AC", "Power outlet", etc.]
}

export interface Ship {
  id: string;
  name: string;
  type: "passenger-only" | "passenger-vehicle";
  route: { from: string; to: string };
  departureTime: string;
  availableDates: string[];  // YYYY-MM-DD format
  classes: ShipClass[];
}

// Mock ship data
export const SHIPS: Ship[] = [
  {
    id: "1",
    name: "FastFerry Express",
    type: "passenger-vehicle",
    route: { from: "Bali (Benoa)", to: "Lombok (Bangsal)" },
    departureTime: "09:00",
    availableDates: ["2026-05-11", "2026-05-12", "2026-05-13", "2026-05-14", "2026-05-15"],
    classes: [
      { 
        name: "executive", 
        price: 350000, 
        beds: "2 bunk beds",
        privacy: "Private room",
        amenities: ["AC", "Power outlet", "Window", "Storage locker"]
      },
      { 
        name: "vip", 
        price: 250000, 
        beds: "1 bunk bed",
        privacy: "Private room",
        amenities: ["AC", "Power outlet", "Storage locker"]
      },
      { 
        name: "economyPlus", 
        price: 150000, 
        beds: "Open bunk beds",
        privacy: "Open area (no walls)",
        amenities: ["AC"]
      },
      { 
        name: "economy", 
        price: 100000, 
        beds: "Seats only",
        privacy: "Open seating",
        amenities: ["AC"]
      },
    ],
  },
  {
    id: "2",
    name: "Budget Ferry",
    type: "passenger-only",
    route: { from: "Bali (Padang Bai)", to: "Nusa Penida" },
    departureTime: "08:30",
    availableDates: ["2026-05-11", "2026-05-12", "2026-05-13", "2026-05-14", "2026-05-15"],
    classes: [
      { 
        name: "economy", 
        price: 75000, 
        beds: "Seats only",
        privacy: "Open seating",
        amenities: ["AC"]
      },
    ],
  },
  {
    id: "3",
    name: "MidLine Ferry",
    type: "passenger-vehicle",
    route: { from: "Bali (Benoa)", to: "Lombok (Bangsal)" },
    departureTime: "14:00",
    availableDates: ["2026-05-11", "2026-05-12", "2026-05-13", "2026-05-14", "2026-05-15"],
    classes: [
      { 
        name: "vip", 
        price: 200000, 
        beds: "1 bunk bed",
        privacy: "Private room",
        amenities: ["AC", "Power outlet"]
      },
      { 
        name: "economyPlus", 
        price: 120000, 
        beds: "Open bunk beds",
        privacy: "Open area (no walls)",
        amenities: ["AC"]
      },
      { 
        name: "economy", 
        price: 80000, 
        beds: "Seats only",
        privacy: "Open seating",
        amenities: ["AC"]
      },
    ],
  },
  {
    id: "4",
    name: "Luxury Ferry",
    type: "passenger-vehicle",
    route: { from: "Bali (Benoa)", to: "Lombok (Bangsal)" },
    departureTime: "11:00",
    availableDates: ["2026-05-11", "2026-05-12", "2026-05-13", "2026-05-14", "2026-05-15"],
    classes: [
      { 
        name: "executive", 
        price: 400000, 
        beds: "2 bunk beds",
        privacy: "Private room",
        amenities: ["AC", "Power outlet", "Window", "Storage locker", "TV", "Private bathroom"]
      },
      { 
        name: "vip", 
        price: 300000, 
        beds: "1 bunk bed",
        privacy: "Private room",
        amenities: ["AC", "Power outlet", "Window", "Storage locker"]
      },
    ],
  },
  {
    id: "5",
    name: "Economy Express",
    type: "passenger-only",
    route: { from: "Java (Ketapang)", to: "Bali (Gilimanuk)" },
    departureTime: "07:00",
    availableDates: ["2026-05-11", "2026-05-12", "2026-05-13", "2026-05-14", "2026-05-15"],
    classes: [
      { 
        name: "economy", 
        price: 50000, 
        beds: "Seats only",
        privacy: "Open seating",
        amenities: ["AC"]
      },
    ],
  },
  {
    id: "6",
    name: "SeaLink Ferry",
    type: "passenger-vehicle",
    route: { from: "Bali (Padang Bai)", to: "Lombok (Bangsal)" },
    departureTime: "10:30",
    availableDates: ["2026-05-11", "2026-05-12", "2026-05-13", "2026-05-14", "2026-05-15"],
    classes: [
      { 
        name: "vip", 
        price: 220000, 
        beds: "1 bunk bed",
        privacy: "Private room",
        amenities: ["AC", "Power outlet", "Window"]
      },
      { 
        name: "economy", 
        price: 90000, 
        beds: "Seats only",
        privacy: "Open seating",
        amenities: ["AC"]
      },
    ],
  },
  {
    id: "7",
    name: "Gili Express",
    type: "passenger-only",
    route: { from: "Bali (Padang Bai)", to: "Gili Islands" },
    departureTime: "09:00",
    availableDates: ["2026-05-11", "2026-05-12", "2026-05-13", "2026-05-14", "2026-05-15"],
    classes: [
      { 
        name: "economy", 
        price: 125000, 
        beds: "Seats only",
        privacy: "Open seating",
        amenities: ["AC", "Sun deck access"]
      },
    ],
  },
  {
    id: "8",
    name: "BlueWater Ferry",
    type: "passenger-vehicle",
    route: { from: "Java (Ketapang)", to: "Bali (Gilimanuk)" },
    departureTime: "09:30",
    availableDates: ["2026-05-11", "2026-05-12", "2026-05-13", "2026-05-14", "2026-05-15"],
    classes: [
      { 
        name: "executive", 
        price: 280000, 
        beds: "2 bunk beds",
        privacy: "Private room",
        amenities: ["AC", "Power outlet", "Window", "Storage locker"]
      },
      { 
        name: "economy", 
        price: 70000, 
        beds: "Seats only",
        privacy: "Open seating",
        amenities: ["AC"]
      },
    ],
  },
];

// ========== HELPER FUNCTIONS ==========

// Get unique routes from ships
export const getUniqueRoutes = (): { from: string; to: string }[] => {
  const routes = SHIPS.map(ship => ship.route);
  // Remove duplicates based on from and to
  const uniqueRoutes = routes.filter((route, index, self) =>
    index === self.findIndex(r => r.from === route.from && r.to === route.to)
  );
  return uniqueRoutes;
};

// Get ships by date only
export const getShipsByDate = (date: string): Ship[] => {
  return SHIPS.filter(ship => ship.availableDates.includes(date));
};

// Get ships by date and ship type
export const getShipsByDateAndType = (date: string, shipType: string): Ship[] => {
  return SHIPS.filter(ship => {
    const dateAvailable = ship.availableDates.includes(date);
    const typeMatch = shipType === "all" || ship.type === shipType;
    return dateAvailable && typeMatch;
  });
};

// Get ships by date, ship type, and route (full filter)
export const getShipsByDateAndTypeAndRoute = (
  date: string, 
  shipType: string, 
  routeFrom: string, 
  routeTo: string
): Ship[] => {
  return SHIPS.filter(ship => {
    // Filter by available dates
    const dateAvailable = ship.availableDates.includes(date);
    
    // Filter by ship type
    const typeMatch = shipType === "all" || ship.type === shipType;
    
    // Filter by route
    const routeMatch = routeFrom === "all" || (ship.route.from === routeFrom && ship.route.to === routeTo);
    
    return dateAvailable && typeMatch && routeMatch;
  });
};

// Get ship by ID
export const getShipById = (id: string): Ship | undefined => {
  return SHIPS.find(ship => ship.id === id);
};

// Get available dates for a specific ship
export const getAvailableDatesForShip = (shipId: string): string[] => {
  const ship = SHIPS.find(s => s.id === shipId);
  return ship ? ship.availableDates : [];
};

// Get all unique ship types
export const getShipTypes = (): string[] => {
  const types = SHIPS.map(ship => ship.type);
  return [...new Set(types)];
};

// Search ships by name (for future search feature)
export const searchShipsByName = (query: string): Ship[] => {
  const lowerQuery = query.toLowerCase();
  return SHIPS.filter(ship => 
    ship.name.toLowerCase().includes(lowerQuery)
  );
};

// Add these interfaces and mock data at the bottom of the file

export interface Booking {
  id: string;
  bookingId: string;
  shipId: string;
  shipName: string;
  shipType: 'passenger-only' | 'passenger-vehicle';
  routeFrom: string;
  routeTo: string;
  departureDate: string;
  departureTime: string;
  selectedClass: string;
  classPrice: number;
  passengerCount: number;
  passengers: Array<{
    fullName: string;
    dateOfBirth: string;
    idNumber: string;
  }>;
  booker: {
    fullName: string;
    phone: string;
    email: string;
  };
  vehicle: {
    hasVehicle: boolean;
    type?: 'motorcycle' | 'car' | 'truck';
  };
  totalAmount: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  bookingDate: string;
  paymentMethod: string;
}

// Mock bookings for demo
export const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    bookingId: 'FRY-1702300000000-ABC123',
    shipId: '1',
    shipName: 'FastFerry Express',
    shipType: 'passenger-vehicle',
    routeFrom: 'Bali (Benoa)',
    routeTo: 'Lombok (Bangsal)',
    departureDate: '2024-08-15',
    departureTime: '09:00',
    selectedClass: 'Executive',
    classPrice: 350000,
    passengerCount: 2,
    passengers: [
      { fullName: 'John Doe', dateOfBirth: '1990-01-01', idNumber: '1234567890' },
      { fullName: 'Jane Doe', dateOfBirth: '1992-02-02', idNumber: '0987654321' },
    ],
    booker: {
      fullName: 'John Doe',
      phone: '+62 812 3456 7890',
      email: 'john@example.com',
    },
    vehicle: {
      hasVehicle: true,
      type: 'car',
    },
    totalAmount: 350000 * 2 + 100000, // 2 passengers + vehicle fee
    status: 'confirmed',
    bookingDate: '2024-07-01',
    paymentMethod: 'Credit Card',
  },
  {
    id: '2',
    bookingId: 'FRY-1702400000000-DEF456',
    shipId: '2',
    shipName: 'Budget Ferry',
    shipType: 'passenger-only',
    routeFrom: 'Bali (Padang Bai)',
    routeTo: 'Nusa Penida',
    departureDate: '2024-08-20',
    departureTime: '08:30',
    selectedClass: 'Economy',
    classPrice: 75000,
    passengerCount: 1,
    passengers: [
      { fullName: 'John Doe', dateOfBirth: '1990-01-01', idNumber: '1234567890' },
    ],
    booker: {
      fullName: 'John Doe',
      phone: '+62 812 3456 7890',
      email: 'john@example.com',
    },
    vehicle: {
      hasVehicle: false,
    },
    totalAmount: 75000,
    status: 'completed',
    bookingDate: '2024-07-05',
    paymentMethod: 'QRIS',
  },
  {
    id: '3',
    bookingId: 'FRY-1702500000000-GHI789',
    shipId: '4',
    shipName: 'Luxury Ferry',
    shipType: 'passenger-vehicle',
    routeFrom: 'Bali (Benoa)',
    routeTo: 'Lombok (Bangsal)',
    departureDate: '2024-09-10',
    departureTime: '11:00',
    selectedClass: 'VIP',
    classPrice: 300000,
    passengerCount: 2,
    passengers: [
      { fullName: 'John Doe', dateOfBirth: '1990-01-01', idNumber: '1234567890' },
      { fullName: 'Sarah Doe', dateOfBirth: '1995-03-03', idNumber: '1122334455' },
    ],
    booker: {
      fullName: 'John Doe',
      phone: '+62 812 3456 7890',
      email: 'john@example.com',
    },
    vehicle: {
      hasVehicle: true,
      type: 'motorcycle',
    },
    totalAmount: 300000 * 2 + 75000, // 2 passengers + motorcycle fee
    status: 'confirmed',
    bookingDate: '2024-07-10',
    paymentMethod: 'Bank Transfer',
  },
];

// Helper function to get bookings for a user (by email)
export const getBookingsByEmail = (email: string): Booking[] => {
  // In a real app, this would filter by user email
  // For demo, return all bookings
  return MOCK_BOOKINGS;
};

// Helper function to get booking by ID
export const getBookingById = (id: string): Booking | undefined => {
  return MOCK_BOOKINGS.find(booking => booking.id === id);
};

// Helper function to cancel booking
export const cancelBooking = (id: string): boolean => {
  const booking = MOCK_BOOKINGS.find(b => b.id === id);
  if (booking && booking.status === 'confirmed') {
    booking.status = 'cancelled';
    return true;
  }
  return false;
};