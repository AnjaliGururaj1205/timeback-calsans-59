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
            onClick={() => navigate("/")}
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
        
        {/* Why Our AI is Different Section */}
        <div className="text-center space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-cal text-brand-secondary">
            Why Our AI is Different
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-brand-secondary/90">
            Move beyond chatbots. Experience the next generation of AI-powered education that sees, understands, and adapts in real-time.
          </p>
        </div>

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