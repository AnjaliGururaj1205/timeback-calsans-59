
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#1abeff' }}>
      {/* Navigation */}
      <nav className="fixed top-4 right-4 z-10">
        <div className="flex gap-4">
          <Link 
            to="/" 
            className="text-lg font-medium hover:underline font-cal"
            style={{ color: '#0f33bb' }}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-lg font-medium hover:underline font-cal"
            style={{ color: '#0f33bb' }}
          >
            About
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="flex items-start justify-center gap-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold font-cal leading-tight" style={{ color: '#0f33bb' }}>
            About
          </h1>
          <img 
            src="/lovable-uploads/5faf787d-d6d8-4378-8afd-217044d5ccca.png" 
            alt="TimeBack" 
            className="mt-1"
            style={{ height: '50.26px' }}
          />
        </div>
        
        <div className="space-y-6 text-lg animate-fade-in-up delay-200 font-cal" style={{ color: '#0f33bb' }}>
          <p>
            TimeBack is the AI-powered EducationOS behind <a 
              href="https://alpha.school" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold underline hover:underline font-cal"
              style={{ color: '#0f33bb' }}
            >
              Alpha
            </a> schools, empowering kids to master their academics in just 2 hours a day—freeing up the rest of the day for what they love. Built on learning science, it generates personalized lessons, optimal lesson plans, and AI coaching to create self-driven learners. Independent standardized tests confirm learning gains up to 10× faster.
          </p>
        </div>

        {/* Interactive Bubbles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 animate-fade-in-up delay-400">
          <div 
            className="bg-white/90 hover:bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => window.open('/', '_blank')}
          >
            <h3 className="text-xl font-bold font-cal mb-3" style={{ color: '#0f33bb' }}>
              Parents
            </h3>
            <p className="text-sm font-cal leading-relaxed" style={{ color: '#0f33bb' }}>
              Unlock your child's full potential with just 2 hours of school a day. Give them time back to explore passions, deepen learning, and grow at their own pace — all with proven results and AI-powered support.
            </p>
          </div>
          
          <div 
            className="bg-white/90 hover:bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => window.open('/', '_blank')}
          >
            <h3 className="text-xl font-bold font-cal mb-3" style={{ color: '#0f33bb' }}>
              Entrepreneurs
            </h3>
            <p className="text-sm font-cal leading-relaxed" style={{ color: '#0f33bb' }}>
              Launch your own AI-powered school with our turnkey platform. Join the education revolution with proven technology and full support.
            </p>
          </div>
          
          <div 
            className="bg-white/90 hover:bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => window.open('/', '_blank')}
          >
            <h3 className="text-xl font-bold font-cal mb-3" style={{ color: '#0f33bb' }}>
              Schools
            </h3>
            <p className="text-sm font-cal leading-relaxed" style={{ color: '#0f33bb' }}>
              Supercharge your curriculum with AI-driven mastery learning. Seamlessly integrate TimeBack into your existing system to boost outcomes and personalize instruction.
            </p>
          </div>
          
          <div 
            className="bg-white/90 hover:bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => window.open('/', '_blank')}
          >
            <h3 className="text-xl font-bold font-cal mb-3" style={{ color: '#0f33bb' }}>
              Government
            </h3>
            <p className="text-sm font-cal leading-relaxed" style={{ color: '#0f33bb' }}>
              Deliver cost-effective, high-impact education at scale. Empower every student with mastery-based, AI-supported learning — reducing operational load while raising academic performance.
            </p>
          </div>
          
          <div 
            className="bg-white/90 hover:bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer md:col-span-2 lg:col-span-1"
            onClick={() => window.open('/', '_blank')}
          >
            <h3 className="text-xl font-bold font-cal mb-3" style={{ color: '#0f33bb' }}>
              Philanthropists
            </h3>
            <p className="text-sm font-cal leading-relaxed" style={{ color: '#0f33bb' }}>
              Back a breakthrough in education with exponential impact. Accelerate access to high-quality, low-time education for underserved communities — with measurable outcomes and sustainable scalability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
