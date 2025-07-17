import { InteractiveComparison } from "@/components/InteractiveComparison";
import { TechnicalShowcase } from "@/components/TechnicalShowcase";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Comparison = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-primary">
      {/* Header with Back Button */}
      <div className="bg-brand-primary border-b border-brand-secondary/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Button
            onClick={() => navigate("/#ai-different-heading")}
            variant="ghost"
            className="text-brand-secondary hover:text-brand-secondary/80 hover:bg-brand-secondary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-20 space-y-20">

        {/* Interactive Comparison Table */}
        <div className="space-y-8">
          <InteractiveComparison />
        </div>

        {/* Technical Capabilities Showcase */}
        <div className="space-y-8">
          <TechnicalShowcase />
        </div>

      </div>
    </div>
  );
};

export default Comparison;