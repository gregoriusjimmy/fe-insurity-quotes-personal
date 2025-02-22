import { ChevronLeft } from "lucide-react";

type BackButtonProps = {
  onBack: () => void;
};

const BackButton = ({ onBack }: BackButtonProps) => {
  return (
    <button
      onClick={onBack}
      className="flex items-center hover:bg-primary-400/10 px-1 py-2 rounded-md w-fit mb-4"
    >
      <ChevronLeft className="w-5 h-5 mr-1" />
      <span className="font-bold text-xl ">Back</span>
    </button>
  );
};

export default BackButton;
