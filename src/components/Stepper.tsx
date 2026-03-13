import React from "react";

type StepperProps = {
  steps: { label: string }[];
  activeStep: number;
  onStepClick?: (index: number) => void;
};

const Stepper = ({ steps, activeStep, onStepClick }: StepperProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      {/* ROW 1: Circles + Connectors */}
      <div className="flex items-center w-full">
        {steps.map((_, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;

          return (
            <React.Fragment key={index}>
              {/* Circle */}
              <button
                type="button"
                onClick={() => {
                  if (onStepClick && index <= activeStep) {
                    onStepClick(index);
                  }
                }}
                className={`
                  w-9 h-9 shrink-0 rounded-full flex items-center justify-center
                  text-sm font-semibold transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-violet-500 text-white"
                      : isActive
                        ? "border-2 border-violet-500 text-violet-600 bg-white"
                        : "bg-gray-200 text-gray-500"
                  }
                `}
              >
                {isCompleted ? "✓" : index + 1}
              </button>

              {/* Connector */}
              {index !== steps.length - 1 && (
                <div className="flex-1 h-1 bg-gray-200">
                  <div
                    className={`h-full transition-all duration-300 ${
                      index < activeStep ? "bg-violet-500 w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/*  ROW 2: Labels */}
      <div className="flex justify-between mt-3">
        {steps.map((step, index) => {
          const isActive = index === activeStep;

          return (
            <div key={index} className="text-center w-9">
              <span
                className={`text-xs md:text-sm font-medium ${
                  isActive ? "text-violet-700" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
