import { Download } from "lucide-react";
interface Props {
  activeStep: number;
  onNext: () => void;
  onBack: () => void;
  totalSteps: number;
}

const FormNavigation = ({ activeStep, onNext, onBack, totalSteps }: Props) => {
  const isLastStep = activeStep === totalSteps - 1;
  const isFirstStep = activeStep === 0;
  return (
    <div className="flex justify-between items-center mt-10">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        disabled={isFirstStep}
        className={`
          px-6 py-2.5 rounded-xl font-medium transition-all duration-200
          border border-violet-300 text-violet-600
          hover:bg-violet-100
          disabled:opacity-40 disabled:cursor-not-allowed
        `}
      >
        Back
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={onNext}
        className="
    inline-flex items-center justify-center gap-2
    px-8 py-2.5 rounded-xl font-semibold text-white
    bg-gradient-to-r from-violet-500 to-purple-600
    shadow-lg
    hover:shadow-xl hover:scale-[1.02]
    transition-all duration-200
    disabled:opacity-40 disabled:cursor-not-allowed
  "
      >
        {isLastStep && <Download size={18} />}
        {isLastStep ? "Download" : "Next"}
      </button>
    </div>
  );
};

export default FormNavigation;
