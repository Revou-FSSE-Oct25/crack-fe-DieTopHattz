"use client";

import { useState } from 'react';
import { Plus, Edit, Trash2, Ship } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SHIPS } from '@/lib/mock-db';

export default function ShipsPage() {
  const [ships, setShips] = useState(SHIPS);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ship Management</h1>
          <p className="text-gray-500 mt-1">Manage ferry ships, routes, and classes</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus className="h-4 w-4" />
          Add New Ship
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ships.map((ship) => (
          <Card key={ship.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Ship className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-800">{ship.name}</h3>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-2">{ship.route.from} → {ship.route.to}</p>
              <p className="text-sm text-gray-500 mb-2">Departure: {ship.departureTime} WITA</p>
              <p className="text-xs text-gray-400 mt-2">{ship.classes.length} classes available</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}