import React, { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Typewriter } from "react-simple-typewriter";


const Flip_Book = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [playedPages, setPlayedPages] = useState({});

  const markPagePlayed = (pageIndex) => {
    if (!playedPages[pageIndex]) {
      setPlayedPages((prev) => ({ ...prev, [pageIndex]: true }));
    }
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
    <div className="book-container w-full absolute z-10 flex mt-96 items-center justify-center h-screen">
      <HTMLFlipBook
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
  );
};

export default Flip_Book;
