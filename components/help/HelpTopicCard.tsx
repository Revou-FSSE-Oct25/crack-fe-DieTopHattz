"use client";

import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface HelpTopicCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

export function HelpTopicCard({ icon: Icon, title, description, onClick }: HelpTopicCardProps) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 border-0 shadow-md"
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
}