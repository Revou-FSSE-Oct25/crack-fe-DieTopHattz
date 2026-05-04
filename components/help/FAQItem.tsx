"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQItemProps {
  value: string;
  question: string;
  answer: string;
}

export function FAQItem({ value, question, answer }: FAQItemProps) {
  return (
    <AccordionItem value={value} className="border rounded-lg mb-3 px-4 bg-white">
      <AccordionTrigger className="hover:no-underline py-4 text-left font-medium text-gray-800">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-gray-600 leading-relaxed pb-4">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}