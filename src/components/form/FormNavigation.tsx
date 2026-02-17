import React from "react";

interface Props {
  activeStep: number;
  onNext: () => void;
  onBack: () => void;
  totalSteps: number;
}
const FormNavigation = ({ activeStep, onNext, onBack, totalSteps }: Props) => {
  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={onBack}
        disabled={activeStep === 0}
        className="px-4 py-2 border border-[#1b1b5f] rounded disabled:opacity-50"
      >
        Back
      </button>
      <button
        onClick={onNext}
        disabled={activeStep === totalSteps - 1}
        className="px-4 py-2 bg-[#1b1b5f] text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default FormNavigation;
