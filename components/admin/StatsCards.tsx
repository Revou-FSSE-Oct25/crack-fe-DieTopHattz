"use client";

import { Ship, Calendar, Users, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardsProps {
  stats: {
    totalShips: number;
    totalBookings: number;
    totalUsers: number;
    totalRevenue: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Ships',
      value: stats.totalShips,
      icon: Ship,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Revenue',
      value: `IDR ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="border-0 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
                </div>
                <div className={`h-12 w-12 ${card.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}