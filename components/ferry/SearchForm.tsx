"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, Users, Car, ArrowRightLeft } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PORTS } from "@/lib/constants";

// Form validation schema
const searchSchema = z.object({
  departurePort: z.string().min(1, "Please select departure port"),
  arrivalPort: z.string().min(1, "Please select arrival port"),
  departureDate: z.string().min(1, "Please select departure date"),
  passengers: z.number().min(1, "At least 1 passenger").max(50),
  vehicles: z.number().min(0).max(10),
});

type SearchFormData = z.infer<typeof searchSchema>;

export function SearchForm() {
  const [isSearching, setIsSearching] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      departurePort: "",
      arrivalPort: "",
      departureDate: "",
      passengers: 1,
      vehicles: 0,
    },
  });

  const departurePort = watch("departurePort");
  const arrivalPort = watch("arrivalPort");

  const onSubmit = async (data: SearchFormData) => {
    setIsSearching(true);
    console.log("Searching ferries:", data);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSearching(false);
  };

  const availableArrivalPorts = PORTS.filter(
    (port) => port.id !== departurePort
  );
  const availableDeparturePorts = PORTS.filter(
    (port) => port.id !== arrivalPort
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Route Selection */}
      <div className="space-y-4 md:space-y-0 md:grid md:gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="departurePort" className="text-sm font-medium">
            Departure Port
          </Label>
          <Select
            onValueChange={(value) => setValue("departurePort", value)}
            value={departurePort}
          >
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Select departure port" />
            </SelectTrigger>
            <SelectContent>
              {availableDeparturePorts.map((port) => (
                <SelectItem key={port.id} value={port.id}>
                  {port.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.departurePort && (
            <p className="text-sm text-red-500">{errors.departurePort.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="arrivalPort" className="text-sm font-medium">
            Arrival Port
          </Label>
          <Select
            onValueChange={(value) => setValue("arrivalPort", value)}
            value={arrivalPort}
          >
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Select arrival port" />
            </SelectTrigger>
            <SelectContent>
              {availableArrivalPorts.map((port) => (
                <SelectItem key={port.id} value={port.id}>
                  {port.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.arrivalPort && (
            <p className="text-sm text-red-500">{errors.arrivalPort.message}</p>
          )}
        </div>
      </div>

      {/* Swap Ports Button */}
      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => {
            const temp = watch("departurePort");
            setValue("departurePort", watch("arrivalPort"));
            setValue("arrivalPort", temp);
          }}
        >
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Swap Ports
        </Button>
      </div>

      {/* Date and Travelers */}
      <div className="space-y-4 md:space-y-0 md:grid md:gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="departureDate" className="text-sm font-medium">
            Departure Date
          </Label>
          <div className="relative">
            <Input
              id="departureDate"
              type="date"
              {...register("departureDate")}
              min={format(new Date(), "yyyy-MM-dd")}
              className="pl-10 h-12"
            />
            <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
          {errors.departureDate && (
            <p className="text-sm text-red-500">{errors.departureDate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="passengers" className="text-sm font-medium">
            Passengers
          </Label>
          <div className="relative">
            <Input
              id="passengers"
              type="number"
              {...register("passengers", { valueAsNumber: true })}
              min={1}
              max={50}
              className="pl-10 h-12"
            />
            <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
          {errors.passengers && (
            <p className="text-sm text-red-500">{errors.passengers.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="vehicles" className="text-sm font-medium">
            Vehicles (Optional)
          </Label>
          <div className="relative">
            <Input
              id="vehicles"
              type="number"
              {...register("vehicles", { valueAsNumber: true })}
              min={0}
              max={10}
              className="pl-10 h-12"
            />
            <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
          {errors.vehicles && (
            <p className="text-sm text-red-500">{errors.vehicles.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full bg-blue-600 hover:bg-blue-700 md:w-auto md:px-8 h-12 text-base"
        disabled={isSearching}
      >
        {isSearching ? "Searching..." : "Search Ferries"}
      </Button>
    </form>
  );
}