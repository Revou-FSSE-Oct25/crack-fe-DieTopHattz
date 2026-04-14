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
    availableDates: ["2026-04-11", "2026-04-12", "2026-04-13", "2026-04-14", "2026-04-15"],
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
    availableDates: ["2026-04-11", "2026-04-12", "2026-04-13", "2026-04-14", "2026-04-15"],
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
    availableDates: ["2026-04-11", "2026-04-12", "2026-04-13", "2026-04-14", "2026-04-15"],
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
    availableDates: ["2026-04-11", "2026-04-12", "2026-04-13", "2026-04-14", "2026-04-15"],
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
    availableDates: ["2026-04-11", "2026-04-12", "2026-04-13", "2026-04-14", "2026-04-15"],
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
    availableDates: ["2026-04-11", "2026-04-12", "2026-04-13", "2026-04-14", "2026-04-15"],
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
    availableDates: ["2026-04-11", "2026-04-12", "2026-04-13", "2026-04-14", "2026-04-15"],
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
    availableDates: ["2026-04-11", "2026-04-12", "2026-04-13", "2026-04-14", "2026-04-15"],
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