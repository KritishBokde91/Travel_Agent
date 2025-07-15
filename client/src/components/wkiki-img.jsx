import React, { useEffect, useState } from "react";
import { fetchWikipediaImages } from "./wiki"; // or place it in the same file

const WikipediaImageViewer = ({ location }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getImages() {
      const wikiImages = await fetchWikipediaImages(location);
      setImages(wikiImages);
    }

    getImages();
  }, [location]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {images.slice(0, 4).map((url, i) => (
        <img key={i} src={url} alt={location} className="w-full h-48 object-cover rounded-lg" />
      ))}
    </div>
  );
};

export default WikipediaImageViewer;
