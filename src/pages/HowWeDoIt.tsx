import { useState } from 'react';

const HowWeDoIt = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = [
    "Bloom's 2 Sigma",
    "Mastery Based Progression", 
    "Personalized & Adaptive Learning",
    "Zone of Proximal Development"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Timeback</div>
          <div className="flex space-x-8">
            <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="/how-we-do-it" className="text-blue-600 border-b-2 border-blue-600 pb-1">How We Do It</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-12 overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === index
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Academic backing for why your kid only needs 2 hours a day, theoretically predicted by learning science
          </h1>
          
          <div className="text-lg text-gray-600 mb-4">
            Your child's learning outcomes will appear in your <span className="font-semibold text-gray-900">Superpower dashboard</span>.
          </div>
          <div className="text-lg text-gray-600 mb-8">
            Store all your <span className="font-semibold text-gray-900">learning analytics</span>. Real-time progress tracking coming soon.
          </div>
          
          <button className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
            View everything we teach →
          </button>
        </div>

        {/* Dashboard Mockup */}
        <div className="flex justify-center items-center space-x-8">
          {/* Main Dashboard */}
          <div className="bg-black rounded-3xl p-8 shadow-2xl max-w-2xl">
            <div className="bg-gray-100 rounded-2xl p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-500">Dashboard</div>
              </div>

              {/* Learning Metrics */}
              <div className="space-y-4">
                {[
                  { metric: "Reading Comprehension", level: "Advanced", color: "bg-green-500", progress: "85%" },
                  { metric: "Mathematical Reasoning", level: "Mastery", color: "bg-blue-500", progress: "92%" },
                  { metric: "Critical Thinking", level: "Proficient", color: "bg-yellow-500", progress: "78%" },
                  { metric: "Problem Solving", level: "Advanced", color: "bg-purple-500", progress: "88%" },
                  { metric: "Creative Writing", level: "Developing", color: "bg-orange-500", progress: "65%" },
                  { metric: "Scientific Method", level: "Mastery", color: "bg-teal-500", progress: "94%" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 ${item.color} rounded`}></div>
                      <div>
                        <div className="font-medium text-gray-900">{item.metric}</div>
                        <div className="text-sm text-gray-500">{item.level}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 ${item.color} rounded-full`} 
                          style={{ width: item.progress }}
                        ></div>
                      </div>
                      <div className="text-sm font-medium text-gray-700">{item.progress}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-6xl font-bold text-gray-300 opacity-20 rotate-12 select-none">
                  timeback
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80">
            <div className="text-sm text-gray-500 mb-2">superpower</div>
            <div className="font-semibold text-gray-900 mb-4">Twin</div>
            
            <div className="space-y-6">
              <div>
                <div className="text-sm text-gray-500 mb-1">Current Focus</div>
                <div className="text-lg font-medium text-gray-900">Algebraic Thinking</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Next Milestone</div>
                <div className="text-lg font-medium text-gray-900">Geometry Basics</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Learning Streak</div>
                <div className="text-lg font-medium text-orange-600">14 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeDoIt;