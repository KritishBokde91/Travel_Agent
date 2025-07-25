import { ArrowBigLeftDash , ArrowBigRightDash, Bot, Download } from "lucide-react";
import React, { useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Typewriter } from "react-simple-typewriter";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const Flip_Book = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [playedPages, setPlayedPages] = useState({});
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const flipBookRef = useRef(null);

  const markPagePlayed = (pageIndex) => {
    if (!playedPages[pageIndex]) {
      setPlayedPages((prev) => ({ ...prev, [pageIndex]: true }));
    }
  };

  const goToPreviousPage = () => {
    if (flipBookRef.current && currentPage > 0) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const goToNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  // PDF Generation Function (for your own project)
 const createPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Hello from jsPDF!", 20, 20);
    
    doc.setFontSize(12);
    doc.text("This PDF was generated in a React app using jsPDF.", 20, 30);

    doc.save("example.pdf");
  };




  const pageContents = {
    2: {
      title: "Transportation",
      image: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d",
      text: `
• Getting to Pachmarhi:
- Train: The nearest railway station is Pipariya (PPI). Tickets ₹500–₹1500.
- Bus: Cheaper alternative to Pipariya.
- Pipariya to Pachmarhi: Shared jeep (₹150–₹200), taxi (₹800–₹1200).

• Local Transportation:
- Jeep Safari: ₹1800–₹2500 per jeep (6–8 people). Negotiate!
- Walking: Great for nearby places.
- Auto-rickshaws: Always agree on fare.
`,
    },
    3: {
      title: "Where to Stay",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
      text: `
• Budget Hotels/Guesthouses:
- ₹800–₹1500 per night.
- Options: Hotel Utkarsh, Hotel Pandav, MPT Glen View.

• Hostels:
- Great for solo travelers. Shared options available.
- Book on: MakeMyTrip, GoIbibo, Oyo, etc.
`,
    },
    4: {
      title: "Food",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      text: `
• Local Eateries:
- Meals: ₹100–₹200. Try regional dishes!

• Street Food:
- Affordable and tasty. Try samosas, poha, chaat.

• Tip:
- Avoid restaurants near attractions—they charge more.
- Bring snacks and water while exploring.
`,
    },
    5: {
      title: "Places to Visit",
      image: "https://images.unsplash.com/photo-1601758173925-78a37f94f3d4",
      text: `
• Must-See Attractions:
- Pandav Caves: Historic and serene.
- Bee Fall: Great for a dip.
- Dhoopgarh: Highest peak in Satpura.
- Jata Shankar Caves: Sacred spot.
- Handi Khoh: Deep forest gorge.
- Rajendra Giri & Priyadarshini Point: Amazing views.

• Safari Tip:
- Confirm pricing and routes before booking.
`,
    },
  };

  return (
    <>
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      {/* Main Navigation Container */}
      <div className="relative">
        {/* Glow Effect Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/40 via-purple-200/40 to-pink-200/40 rounded-3xl blur-xl animate-pulse"></div>
        
        {/* Glass Morphism Container */}
        <div className="relative backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl shadow-2xl p-2">
          {/* Inner Container with Gradient Border */}
          <div className="bg-gradient-to-r from-gray-200 via-blue-100 to-gray-200 rounded-2xl p-0.5">
            <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl h-16 w-80 flex items-center justify-around px-4 shadow-inner">
              
              {/* Previous Button */}
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
                className="group relative h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-blue-400/30"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
                <ArrowBigLeftDash className="relative z-10 group-hover:animate-pulse text-white" size={20} />
                
                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-2xl bg-white/30 opacity-0 group-active:opacity-100 group-active:animate-ping"></div>
              </button>

              {/* Bot Icon */}
              <div className="group relative h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-emerald-400/30 cursor-pointer">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
                <Bot className="relative z-10 group-hover:animate-bounce text-white" size={20} />
                
                {/* Floating Particles Effect */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-300 rounded-full animate-ping"></div>
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-teal-300 rounded-full animate-ping animation-delay-200"></div>
              </div>

              {/* Download Button with PDF functionality */}
              <button
                onClick={createPDF}
                disabled={isGeneratingPDF}
                className="group relative h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-orange-400/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
                {isGeneratingPDF ? (
                  <div className="relative z-10 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Download className="relative z-10 group-hover:animate-bounce text-white" size={20} />
                )}
                
                {/* Progress Bar Effect */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full group-hover:w-full w-0 transition-all duration-500"></div>
              </button>

              {/* Next Button */}
              <button
                onClick={goToNextPage}
                className="group relative h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 cursor-pointer transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-blue-400/30"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
                <ArrowBigRightDash className="relative z-10 group-hover:animate-pulse text-white" size={20} />
                
                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-2xl bg-white/30 opacity-0 group-active:opacity-100 group-active:animate-ping"></div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Page Indicator */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/80 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-md border border-gray-200">
            Page {currentPage + 1}
          </div>
        </div>
      </div>
      
      {/* Floating Orbs Animation */}
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-300/40 rounded-full animate-ping animation-delay-1000"></div>
      <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-purple-300/40 rounded-full animate-ping animation-delay-2000"></div>
    </div>
      
      <div className="book-container overflow-hidden w-full absolute z-10 flex mt-96 items-center justify-center h-screen">
        <HTMLFlipBook
          ref={flipBookRef}
          width={500}
          height={650}
          showCover={true}
          drawShadow={true}
          flippingTime={700}
          useMouseEvents={true}
          startPage={0}
          className="my-flipbook drop-shadow-2xl"
          onFlip={(e) => setCurrentPage(e.data)}
        >
          {/* Cover */}
          <div className="page w-full h-full bg-white p-10 border-[8px] border-gray-300 rounded-3xl font-sans">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-2">
                <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 uppercase">
                  The Travel AI
                </h1>
                <p className="text-lg font-medium text-yellow-600">Represent</p>
                <h2 className="text-3xl font-bold text-blue-800 mt-4">
                    How to make the trip enjoyable in Pachmarhi
                </h2>
                <p className="text-sm text-gray-500">Issue #07 | July 2025</p>
              </div>
              <div className="mt-6 w-full h-72 rounded-xl overflow-hidden shadow-lg border">
                <img
                  className="w-full h-full object-cover"
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Pachmarhi_valley_Madhya_Pradesh_INDIA.jpg"
                  alt="Pachmarhi Cover"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-700 font-semibold mt-6">
                <span>Camping Gear</span>
                <span>Top 10 Parks</span>
                <span>Survival Tips</span>
              </div>
            </div>
          </div>

          {/* Contents Page */}
          <div className="page bg-white p-10 border-[6px] border-gray-300 font-sans">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Contents</h2>
            <ul className="text-md leading-8 text-gray-800 space-y-1 pl-2">
              <li>02 — Transportation Tips</li>
              <li>03 — Where to Stay</li>
              <li>04 — Delicious Food Finds</li>
              <li>05 — Places to Visit</li>
            </ul>
          </div>

          {/* Article Pages */}
          {Object.entries(pageContents).map(([index, { title, text, image }]) => (
            <div
              key={index}
              className={`page bg-white p-8 ${index % 2 == 0 ? " rounded-r-2xl":" rounded-l-2xl"}   border-[6px] border-gray-200 font-serif flex flex-col gap-4`}
            >
              <h2 className="text-3xl font-extrabold text-blue-900 border-b pb-2">{title}</h2>
              <div className="flex gap-6">
                <div className="w-1/2 text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                  {!playedPages[index] && currentPage.toString() === index ? (
                    <Typewriter
                      words={[text.trim()]}
                      typeSpeed={30}
                      delaySpeed={1000}
                      onLoopDone={() => markPagePlayed(index)}
                      onType={() => {
                        if (!playedPages[index]) markPagePlayed(index);
                      }}
                    />
                  ) : (
                    text
                  )}
                </div>
                <div className="w-1/2 h-64 mt-2 overflow-hidden rounded-lg shadow-md border">
                  <img className="h-full w-full object-cover" src={image} alt={title} />
                </div>
              </div>
            </div>
          ))}

          <div className="page bg-white p-10 border-[8px] border-gray-300 rounded-l-3xl font-sans flex flex-col items-center justify-center text-center">
            <div>
              <div className="h-44 w-54 scale-90 rounded-2xl bg-red-200">
              </div>
            </div>
            <div className="h-44 w-54 ml-52 scale-90 rounded-2xl bg-red-200">
            </div>
            <div className="h-44 w-54 rounded-2xl scale-90 bg-red-200">
            </div>
          </div>

          {/* Back Cover */}
          <div className="page bg-white p-10 border-[8px] border-gray-300 rounded-l-3xl font-sans flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold text-blue-800">Thank You for Reading!</h2>
            <p className="text-md mt-3 text-gray-700">
              For more travel guides, gear reviews, and hidden gems, visit our magazine site!
            </p>
            <a className="mt-4 text-blue-600 underline" href="https://yourmagazine.com">
              www.yourmagazine.com
            </a>
          </div>
        </HTMLFlipBook>
      </div>
      
      {/* PDF Generation Status */}
      {isGeneratingPDF && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Generating PDF...
          </div>
        </div>
      )}
    </>
  );
};

export default Flip_Book;