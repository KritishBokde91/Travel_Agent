import React,{useState,useEffect} from 'react'
import { Plane, MapPin, Calendar, Users, Sparkles, ChevronRight, Globe, Star, Clock } from 'lucide-react';

function Home() {

     const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: <Calendar className="w-8 h-8" />, title: "Smart Scheduling", desc: "AI-powered itinerary optimization" },
    { icon: <MapPin className="w-8 h-8" />, title: "Local Insights", desc: "Hidden gems and local recommendations" },
    { icon: <Users className="w-8 h-8" />, title: "Group Planning", desc: "Seamless collaboration for group trips" }
  ];

  const destinations = [
    { name: "Paris", image: "🗼", color: "from-rose-400 to-pink-600" },
    { name: "Tokyo", image: "🏯", color: "from-purple-400 to-indigo-600" },
    { name: "New York", image: "🏙️", color: "from-blue-400 to-cyan-600" },
    { name: "Bali", image: "🌺", color: "from-green-400 to-teal-600" }
  ];

  return (
    <div className=' min-h-screen bg-white text-indigo-900 overflow-hidden'>
  
     <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float-slow"></div>
        <div className="absolute w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-medium" style={{top: '20%', right: '10%'}}></div>
        <div className="absolute w-64 h-64 bg-indigo-150 rounded-full mix-blend-multiply filter blur-xl opacity-35 animate-float-fast" style={{bottom: '30%', left: '15%'}}></div>
        <div className="absolute w-72 h-72 bg-indigo-50 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-float-reverse" style={{top: '60%', right: '30%'}}></div>
        <div className="absolute w-56 h-56 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-diagonal" style={{bottom: '10%', right: '20%'}}></div>
        <div className="absolute w-88 h-88 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-horizontal" style={{top: '40%', left: '60%'}}></div>
      </div>
      
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-30px) translateX(20px) rotate(90deg); }
          50% { transform: translateY(-20px) translateX(-30px) rotate(180deg); }
          75% { transform: translateY(10px) translateX(10px) rotate(270deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-25px) translateX(-20px) rotate(120deg); }
          66% { transform: translateY(15px) translateX(25px) rotate(240deg); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(-40px) translateX(40px) rotate(180deg); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(360deg); }
          25% { transform: translateY(25px) translateX(-15px) rotate(270deg); }
          50% { transform: translateY(-15px) translateX(25px) rotate(180deg); }
          75% { transform: translateY(-30px) translateX(-10px) rotate(90deg); }
        }
        
        @keyframes float-diagonal {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(-35px) translateX(-35px) rotate(180deg); }
        }
        
        @keyframes float-horizontal {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(-10px) translateX(-50px) rotate(180deg); }
        }
        
        .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 12s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 8s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 18s ease-in-out infinite reverse; }
        .animate-float-diagonal { animation: float-diagonal 10s ease-in-out infinite; }
        .animate-float-horizontal { animation: float-horizontal 14s ease-in-out infinite; }
      `}</style>
  
  
  <header className="relative z-50 bg-white/80 backdrop-blur-sm border-b border-indigo-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-indigo-900">
                Trip Assistants
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-indigo-600 hover:text-indigo-900 transition-colors font-medium">Features</a>
              <a href="#about" className="text-indigo-600 hover:text-indigo-900 transition-colors font-medium">About</a>
              <a href="#contact" className="text-indigo-600 hover:text-indigo-900 transition-colors font-medium">Contact</a>
            </nav>
          </div>
        </div>
      </header>


    <section className="relative z-40 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center space-x-2 bg-indigo-50 rounded-full px-6 py-3 mb-8 border border-indigo-200">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-700">Welcome to the Future of Travel Planning</span>
              </div>
              
              <h1 className="inter text-6xl md:text-8xl font-bold mb-6 text-indigo-900">
                Trip  <span className='  p-2 rounded-2xl'>Assistants</span> 
              </h1>
              
              <p className="inter text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto ">
                Your intelligent travel companion powered by advanced AI. Plan perfect itineraries, discover hidden gems, and create unforgettable memories with our PS-06 Travel Planning Agent.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group relative px-40 py-4 bg-indigo-600 text-white rounded-full font-semibold text-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  <span className="flex items-center">
                    Get Started
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
              
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home