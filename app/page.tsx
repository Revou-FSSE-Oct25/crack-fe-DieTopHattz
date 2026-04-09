"use client";

import { Button } from "@/components/ui/button";
import { 
  Ship, 
  Compass, 
  Shield, 
  Clock, 
  Users, 
  Globe, 
  ArrowRight,
  CheckCircle,
  Star,
  Heart,
  Award,
  MapPin,
  Coffee,
  Wifi,
  Battery,
  Crown
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // Vision and Mission content
  const visionStatement = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";
  
  const missionStatement = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.";

  // Why choose us - key differentiators
  const differentiators = [
    {
      icon: Clock,
      title: "Real-Time Accuracy",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      color: "blue",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      color: "green",
    },
    {
      icon: Users,
      title: "24/7 Customer Support",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      color: "purple",
    },
    {
      icon: Globe,
      title: "Extensive Network",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
      color: "orange",
    },
  ];

  // Services/features list
  const features = [
    "Lorem ipsum dolor sit amet consectetur",
    "Sed do eiusmod tempor incididunt ut labore",
    "Ut enim ad minim veniam quis nostrud",
    "Duis aute irure dolor in reprehenderit",
    "Excepteur sint occaecat cupidatat non",
    "Nemo enim ipsam voluptatem quia voluptas",
  ];

  // Stats/achievements
  const stats = [
    { value: "50+", label: "Ferry Routes", icon: Ship },
    { value: "100K+", label: "Happy Passengers", icon: Users },
    { value: "99%", label: "On-Time Departure", icon: Clock },
    { value: "24/7", label: "Customer Support", icon: Heart },
  ];

  // Values section
  const values = [
    {
      icon: Award,
      title: "Reliability",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore.",
    },
    {
      icon: Star,
      title: "Transparency",
      description: "Ut enim ad minim veniam, quis nostrud exercitation.",
    },
    {
      icon: Compass,
      title: "Local Expertise",
      description: "Duis aute irure dolor in reprehenderit voluptate.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* ========== HERO SECTION WITH BACKGROUND IMAGE ========== */}
      {/* ========== HERO SECTION WITH BACKGROUND IMAGE ========== */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/ferry-hero.jpg"
            alt="Ferry crossing Indonesian waters"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        {/* Lighter Gradient Overlay - Shows image much better */}
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-blue-900/60 via-blue-800/40 to-blue-700/30" />
        
        {/* Background decorative blur elements (lighter version) */}
        <div className="absolute inset-0 z-10">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-300/5 blur-3xl" />
        </div>
        
        {/* Content Container */}
        <div className="container relative z-20 mx-auto px-4 py-20 md:py-28 lg:py-36">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full bg-white/20 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm mb-6">
              <Ship className="mr-2 h-4 w-4" />
              <span>Indonesia's Leading Ferry Platform</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Connecting Islands,
              <span className="block text-blue-100">Bridging Journeys</span>
            </h1>
            
            <p className="mt-6 text-base text-white/90 sm:text-lg md:text-xl max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold" asChild>
                <Link href="/routes">Get Started →</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="#vision">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Wave divider - made slightly transparent */}
        <div className="absolute bottom-0 left-0 right-0 z-20 opacity-90">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 32L48 42.7C96 53.3 192 74.7 288 80C384 85.3 480 74.7 576 64C672 53.3 768 42.7 864 48C960 53.3 1056 74.7 1152 80C1248 85.3 1344 74.7 1392 69.3L1440 64V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V32Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ========== VISION SECTION ========== */}
      <section id="vision" className="px-4 py-20 md:py-28">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Vision */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 mb-4">
                <Compass className="mr-1 h-3 w-3" />
                Our Vision
              </div>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">
                Our Vision
              </h2>
              <div className="h-1 w-20 bg-blue-600 rounded mb-6 mx-auto md:mx-0" />
              <p className="text-gray-600 leading-relaxed">
                {visionStatement}
              </p>
            </div>
            
            {/* Mission */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm text-green-700 mb-4">
                <Ship className="mr-1 h-3 w-3" />
                Our Mission
              </div>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">
                Our Mission
              </h2>
              <div className="h-1 w-20 bg-green-600 rounded mb-6 mx-auto md:mx-0" />
              <p className="text-gray-600 leading-relaxed">
                {missionStatement}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US SECTION ========== */}
      <section className="bg-gray-50 px-4 py-20 md:py-28">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 mb-4">
              <Star className="mr-1 h-3 w-3" />
              Why Choose Us
            </div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">
              Why Choose FerryGo?
            </h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item, index) => {
              const Icon = item.icon;
              const colorClasses = {
                blue: "bg-blue-100 text-blue-600",
                green: "bg-green-100 text-green-600",
                purple: "bg-purple-100 text-purple-600",
                orange: "bg-orange-100 text-orange-600",
              };
              return (
                <div key={index} className="text-center group">
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${colorClasses[item.color as keyof typeof colorClasses]} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="px-4 py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/20 mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-4xl font-bold">{stat.value}</div>
                  <div className="text-sm text-blue-100 mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== OUR VALUES SECTION ========== */}
      <section className="px-4 py-20 md:py-28">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700 mb-4">
              <Heart className="mr-1 h-3 w-3" />
              Our Values
            </div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">
              The Values That Guide Us
            </h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== FEATURES LIST SECTION ========== */}
      <section className="bg-gray-50 px-4 py-20 md:py-28">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 mb-4">
                <CheckCircle className="mr-1 h-3 w-3" />
                What We Offer
              </div>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">
                Everything You Need for <br />a Smooth Journey
              </h2>
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-8 bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/routes">
                  Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-blue-500 pb-2">
                    <span>FerryGo Premium Pass</span>
                    <span className="text-blue-200">Starting from</span>
                  </div>
                  <div className="text-3xl font-bold">IDR 99K</div>
                  <div className="flex gap-2 text-sm">
                    <span>✓ Lorem ipsum</span>
                    <span>✓ Dolor sit amet</span>
                  </div>
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    Learn More
                  </Button>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-blue-200/50 blur-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-blue-300/50 blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIAL PLACEHOLDER ========== */}
      <section className="px-4 py-20 md:py-28">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700 mb-4">
            <Star className="mr-1 h-3 w-3 fill-yellow-500" />
            Testimonials
          </div>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">
            What Our Customers Say
          </h2>
          <div className="mt-8 bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="text-6xl text-gray-300 mb-4">"</div>
            <p className="text-gray-600 text-lg italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <div className="mt-6">
              <div className="font-semibold text-gray-900">- Customer Name</div>
              <div className="text-sm text-gray-500">Regular Traveler</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA SECTION ========== */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Ready to Experience the Difference?
              </h2>
              <p className="mt-2 text-blue-100 max-w-md mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <Button size="lg" className="mt-6 bg-white text-blue-600 hover:bg-gray-100 font-semibold" asChild>
                <Link href="/routes">Book Your Ferry Now →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// // app/page.tsx
// "use client";

// import { Button } from "@/components/ui/button";
// import { 
//   Ship, 
//   Clock, 
//   Shield, 
//   Tag, 
//   MapPin, 
//   CalendarDays,
//   ArrowRight,
//   CheckCircle2,
//   Building2,
//   Anchor,
//   Users,
//   Globe
// } from "lucide-react";
// import Link from "next/link";

// export default function Home() {
//   // Service highlights (matching the 3-column layout from Dharma Indah)
//   const highlights = [
//     {
//       icon: Shield,
//       title: "NUMBER 1 SAFETY",
//       description: "Kami selalu menjamin keselamatan dan kesehatan penumpang dan anak buah kapal kami dengan mematuhi dan menerapkan protokol kesehatan yang diterbitkan oleh pemerintah setempat",
//       color: "blue"
//     },
//     {
//       icon: Clock,
//       title: "SAVE YOUR TIME",
//       description: "Dengan menggunakan kapal kami sebagai sarana transportasi anda, anda dapat menghemat waktu perjalanan anda dengan proses booking yang cepat, simpel dan mudah serta perjalanan kapal yang cepat dan menyenangkan",
//       color: "green"
//     },
//     {
//       icon: Tag,
//       title: "BEST PRICE",
//       description: "Harga yang kami tawarkan merupakan harga terbaik yang kami sesuaikan dengan pelayanan yang kami tawarkan dan tentunya sesuai dengan keinginan konsumen kami",
//       color: "orange"
//     }
//   ];

//   // Company stats (matching the counter display)
//   const stats = [
//     { value: "35+", label: "Unit Kapal", icon: Ship },
//     { value: "4", label: "Kantor Cabang", icon: Building2 },
//     { value: "20+", label: "Rute Pelayaran", icon: Anchor },
//     { value: "2002", label: "Tahun Berdiri", icon: CalendarDays }
//   ];

//   // Sample schedule data (matching the table-like display)
//   const featuredSchedules = [
//     { route: "KENDARI - RAHA - BAUBAU", schedule: "Setiap Hari (07.30 & 13.00 WITA)" },
//     { route: "AMBON - NAMLEA", schedule: "Setiap Hari (20.30 WIT)" },
//     { route: "KUPANG - SABU", schedule: "Senin, Rabu, Jumat (21.00 WITA)" },
//     { route: "MANADO - SOFIFI - GITA", schedule: "Selasa, Kamis, Sabtu (18.00 WITA)" }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
      
//       {/* ========== HERO SECTION ========== */}
//       {/* Simplified hero with company name and tagline - similar to Dharma Indah's clean header */}
//       <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
//         <div className="absolute inset-0 bg-black/20" />
//         <div className="container mx-auto px-4 py-16 md:py-24">
//           <div className="max-w-3xl">
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
//               FerryGo
//             </h1>
//             <p className="text-xl md:text-2xl text-blue-100 mb-6">
//               Let's Explore Indonesia Together
//             </p>
//             <p className="text-base text-blue-50 mb-8 max-w-2xl">
//               Penyedia jasa transportasi laut terpercaya yang menghubungkan berbagai gugusan pulau di Indonesia dengan armada modern dan pelayanan terbaik.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
//                 <Link href="/routes">Cari Tiket →</Link>
//               </Button>
//               <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
//                 <Link href="#schedules">Lihat Jadwal</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========== HIGHLIGHTS SECTION (3-Column Layout) ========== */}
//       {/* This matches Dharma Indah's "Number 1 Safety", "Save Your Time", "Best Price" section */}
//       <section className="py-16 px-4 bg-gray-50">
//         <div className="container mx-auto">
//           <div className="grid md:grid-cols-3 gap-8">
//             {highlights.map((item, index) => {
//               const Icon = item.icon;
//               const colorClasses = {
//                 blue: "bg-blue-100 text-blue-600",
//                 green: "bg-green-100 text-green-600",
//                 orange: "bg-orange-100 text-orange-600"
//               };
//               return (
//                 <div key={index} className="text-center group">
//                   <div className={`mx-auto w-16 h-16 rounded-full ${colorClasses[item.color as keyof typeof colorClasses]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
//                     <Icon className="h-8 w-8" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
//                   <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ========== COMPANY STORY SECTION ========== */}
//       {/* "Who We Are" and "Company Story" section from Dharma Indah */}
//       <section className="py-16 px-4">
//         <div className="container mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 mb-4">
//                 <Users className="mr-1 h-3 w-3" />
//                 Who We Are
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Company Story</h2>
//               <div className="w-20 h-1 bg-blue-600 rounded mb-6" />
//               <p className="text-gray-600 leading-relaxed mb-4">
//                 PT Pelayaran FerryGo merupakan perusahaan yang bergerak di bidang penyedia jasa transportasi laut berupa kapal penumpang dan kapal barang yang berpusat di [Kota, Indonesia].
//               </p>
//               <p className="text-gray-600 leading-relaxed mb-6">
//                 FerryGo didirikan sejak Tahun 2024 dengan komitmen untuk menghubungkan berbagai pulau di Indonesia. Dengan tekad yang kuat serta kerja keras dan pantang menyerah, hingga saat ini, FerryGo terus berkembang dan melayani berbagai rute populer di Indonesia.
//               </p>
//               <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" asChild>
//                 <Link href="/about">Pelajari Lebih Lanjut <ArrowRight className="ml-2 h-4 w-4" /></Link>
//               </Button>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               {stats.map((stat, index) => {
//                 const Icon = stat.icon;
//                 return (
//                   <div key={index} className="bg-gray-50 rounded-lg p-6 text-center border border-gray-100">
//                     <div className="flex justify-center mb-3">
//                       <Icon className="h-8 w-8 text-blue-600" />
//                     </div>
//                     <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
//                     <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========== VISION & MISSION SECTION ========== */}
//       {/* Two-column layout for Vision and Mission */}
//       <section className="py-16 px-4 bg-blue-50">
//         <div className="container mx-auto">
//           <div className="text-center max-w-3xl mx-auto mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Visi & Misi Kami</h2>
//             <div className="w-20 h-1 bg-blue-600 rounded mx-auto" />
//           </div>
//           <div className="grid md:grid-cols-2 gap-8">
//             <div className="bg-white rounded-xl p-8 shadow-sm">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                 <Globe className="h-6 w-6 text-blue-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-3">VISI KAMI</h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Menjadi pelayaran handal yang dapat menjangkau & menghubungkan tiap gugusan pulau di Indonesia.
//               </p>
//             </div>
//             <div className="bg-white rounded-xl p-8 shadow-sm">
//               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
//                 <Anchor className="h-6 w-6 text-green-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-3">MISI KAMI</h3>
//               <ul className="space-y-2 text-gray-600">
//                 <li className="flex items-start gap-2">
//                   <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
//                   <span>Menyediakan jasa pelayaran di Indonesia yang inovatif & kompetitif</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
//                   <span>Memberikan pelayanan yang maksimal kepada konsumen</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
//                   <span>Kepuasan konsumen adalah kebanggaan kami</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========== SCHEDULES PREVIEW SECTION ========== */}
//       {/* Matches the "Jadwal Keberangkatan Kapal" section from Dharma Indah */}
//       <section id="schedules" className="py-16 px-4">
//         <div className="container mx-auto">
//           <div className="text-center max-w-3xl mx-auto mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Jadwal Keberangkatan Kapal</h2>
//             <p className="text-gray-600">Temukan Waktu Keberangkatan yang Sesuai dengan Kebutuhan Anda.</p>
//           </div>
//           <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
//             {featuredSchedules.map((schedule, index) => (
//               <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow">
//                 <div className="flex items-start gap-3">
//                   <CalendarDays className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                   <div>
//                     <h4 className="font-semibold text-gray-900">{schedule.route}</h4>
//                     <p className="text-sm text-gray-500 mt-1">{schedule.schedule}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="text-center mt-8">
//             <Button variant="outline" asChild>
//               <Link href="/routes">Lihat Semua Jadwal →</Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* ========== NEWS / ANNOUNCEMENTS SECTION ========== */}
//       {/* Matches the "our news / PENGUMUMAN" section */}
//       <section className="py-16 px-4 bg-gray-50">
//         <div className="container mx-auto">
//           <div className="text-center max-w-3xl mx-auto mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pengumuman & Berita</h2>
//             <p className="text-gray-600">Informasi terbaru seputar layanan dan jadwal FerryGo</p>
//           </div>
//           <div className="max-w-3xl mx-auto space-y-4">
//             <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-1">Pendaftaran Tiket Promo Lebaran 2025</h3>
//                   <p className="text-sm text-gray-500">Bagi para calon penumpang yang ingin mendapatkan tiket promo dapat melakukan pendaftaran melalui website.</p>
//                 </div>
//                 <Button variant="link" className="text-blue-600 whitespace-nowrap" asChild>
//                   <Link href="/news/1">Baca Selengkapnya +</Link>
//                 </Button>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-1">Rute Baru: Bali - Lombok - Nusa Tenggara</h3>
//                   <p className="text-sm text-gray-500">Mulai bulan depan, FerryGo akan melayani rute baru menuju Lombok dan sekitarnya.</p>
//                 </div>
//                 <Button variant="link" className="text-blue-600 whitespace-nowrap" asChild>
//                   <Link href="/news/2">Baca Selengkapnya +</Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========== FINAL CTA SECTION ========== */}
//       {/* Call to action before footer */}
//       <section className="py-16 px-4 bg-blue-700 text-white">
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl font-bold mb-4">Siap Memesan Tiket Kapal?</h2>
//           <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
//             Proses booking yang cepat, simpel dan mudah. Dapatkan harga terbaik untuk perjalanan Anda.
//           </p>
//           <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
//             <Link href="/routes">Booking Sekarang →</Link>
//           </Button>
//         </div>
//       </section>
//     </div>
//   );
// }