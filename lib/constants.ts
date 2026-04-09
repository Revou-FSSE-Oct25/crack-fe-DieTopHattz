// Port data for ferry routes
export const PORTS = [
  { id: "bali-benoa", name: "Bali (Benoa)", region: "Bali", code: "BEN" },
  { id: "bali-padangbai", name: "Bali (Padang Bai)", region: "Bali", code: "PAD" },
  { id: "lombok-bangsal", name: "Lombok (Bangsal)", region: "Lombok", code: "BAN" },
  { id: "lombok-lembar", name: "Lombok (Lembar)", region: "Lombok", code: "LEM" },
  { id: "nusa-penida", name: "Nusa Penida", region: "Nusa Penida", code: "NPE" },
  { id: "gilimanuk", name: "Gilimanuk (Bali)", region: "Bali", code: "GIL" },
  { id: "ketapang", name: "Ketapang (Java)", region: "Java", code: "KET" },
  { id: "labuan-bajo", name: "Labuan Bajo", region: "Flores", code: "LBJ" },
] as const;

// Ferry operators
export const OPERATORS = [
  { id: "fastferry", name: "FastFerry Express", logo: "/images/fastferry.png" },
  { id: "seacat", name: "SeaCat", logo: "/images/seacat.png" },
  { id: "bluewater", name: "BlueWater Lines", logo: "/images/bluewater.png" },
] as const;

// Ferry classes/types
export const FERRY_CLASSES = [
  { id: "economy", name: "Economy", description: "Standard seating with AC" },
  { id: "business", name: "Business", description: "Premium seating, meal included" },
  { id: "vip", name: "VIP", description: "Luxury cabin, priority boarding" },
] as const;

// Navigation links
export const NAVIGATION_LINKS = [
  { name: "Home", href: "/" },
  { name: "Find Ferries", href: "/search" },
  { name: "My Bookings", href: "/bookings" },
  { name: "Help", href: "/help" },
] as const;

// Footer sections
export const FOOTER_SECTIONS = {
  company: {
    title: "FerryGo",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/faqs" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  },
  destinations: {
    title: "Popular Routes",
    links: [
      { name: "Bali to Lombok", href: "/routes/bali-lombok" },
      { name: "Bali to Nusa Penida", href: "/routes/bali-nusa-penida" },
      { name: "Java to Bali", href: "/routes/java-bali" },
      { name: "Bali to Gili Islands", href: "/routes/bali-gili" },
    ],
  },
} as const;