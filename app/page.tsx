import { SearchForm } from "@/components/ferry/SearchForm";
import { Anchor, Clock, CreditCard, Shield, ChevronRight } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Anchor,
      title: "50+ Ferry Routes",
      description: "Connect to islands across Indonesia and beyond",
    },
    {
      icon: Clock,
      title: "Real-Time Schedules",
      description: "Always up-to-date departure times",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Multiple payment methods with bank-level security",
    },
    {
      icon: Shield,
      title: "24/7 Support",
      description: "Our team is here to help you anytime",
    },
  ];

  const popularRoutes = [
    { from: "Bali", to: "Lombok", duration: "2h 30m", price: "IDR 150K" },
    { from: "Bali", to: "Nusa Penida", duration: "45m", price: "IDR 75K" },
    { from: "Java", to: "Bali", duration: "4h", price: "IDR 200K" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative mx-auto px-4 py-12 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Book Your Ferry Journey
            </h1>
            <p className="mt-3 text-base text-blue-100 md:text-xl">
              Fast, easy, and secure ferry tickets to paradise islands
            </p>
          </div>
        </div>
      </section>

      {/* Search Form Section */}
      <section className="container mx-auto -mt-8 md:-mt-16 px-4">
        <div className="rounded-lg bg-white p-5 shadow-lg md:p-8">
          <SearchForm />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-center mb-8 md:text-3xl">
          Why Choose FerryGo?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center p-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-base font-semibold md:text-lg">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 md:text-3xl">
            Popular Routes
          </h2>
          <div className="space-y-3 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
            {popularRoutes.map((route, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{route.from}</p>
                    <p className="text-sm text-gray-500">to</p>
                    <p className="font-semibold text-gray-900">{route.to}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                <div className="mt-3 flex justify-between items-center pt-3 border-t">
                  <span className="text-sm text-gray-500">{route.duration}</span>
                  <span className="font-semibold text-blue-600">{route.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}