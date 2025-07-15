import { useState } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Data Dashboard");

  const tabs = [
    "100+ Labs",
    "Data Dashboard", 
    "Biological Age",
    "Personalized Protocol",
    "24/7 Concierge"
  ];

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Header with navigation tabs */}
      <div className="border-b border-border bg-surface-primary">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex space-x-8 overflow-x-auto" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={tab === activeTab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                  tab === activeTab
                    ? "border-warning text-text-primary"
                    : "border-transparent text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-text-primary mb-6">
            All your lab data and medical records in one place
          </h1>
          
          <div className="space-y-2 mb-8">
            <p className="text-text-secondary">
              Your test results will appear in your <span className="font-semibold text-text-primary">Superpower dashboard</span>.
            </p>
            <p className="text-text-secondary">
              Store all your <span className="font-semibold text-text-primary">medical history</span>. Real-time wearable tracking coming soon.
            </p>
          </div>

          <button className="text-warning hover:text-warning/80 font-medium transition-colors duration-200">
            View everything we test
          </button>
        </div>

        {/* Dashboard content area - where video/chart would go */}
        <div className="bg-surface-secondary rounded-2xl p-8 shadow-sm border border-border">
          <div className="aspect-video bg-surface-tertiary rounded-xl flex items-center justify-center relative overflow-hidden">
            {/* Placeholder for video or content */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-text-inverse" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-text-secondary font-medium text-lg">Dashboard Content</p>
              <p className="text-text-secondary/80 text-sm mt-2">Video or data visualization would appear here</p>
            </div>
          </div>
        </div>

        {/* Additional dashboard sections could go here */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Health Metrics", "Test Results", "Recommendations"].map((section) => (
            <div key={section} className="bg-surface-secondary border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-3">{section}</h3>
              <p className="text-text-secondary text-sm">Content for {section.toLowerCase()} will be displayed here.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;