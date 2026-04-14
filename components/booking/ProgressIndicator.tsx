"use client";

import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  steps: string[];
}

export function ProgressIndicator({ currentStep, steps }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-2 md:gap-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={step} className="flex items-center">
              {/* Step Circle */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all
                  ${isCompleted ? "bg-green-500 text-white" : ""}
                  ${isCurrent ? "bg-blue-600 text-white ring-4 ring-blue-100" : ""}
                  ${!isCompleted && !isCurrent ? "bg-gray-200 text-gray-500" : ""}
                `}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : stepNumber}
              </div>
              
              {/* Step Label */}
              <span
                className={`ml-2 text-sm font-medium hidden sm:inline
                  ${isCurrent ? "text-blue-600" : ""}
                  ${isCompleted ? "text-green-600" : ""}
                  ${!isCompleted && !isCurrent ? "text-gray-500" : ""}
                `}
              >
                {step}
              </span>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`mx-2 h-px w-8 md:mx-4 md:w-16
                    ${stepNumber < currentStep ? "bg-green-500" : "bg-gray-200"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}