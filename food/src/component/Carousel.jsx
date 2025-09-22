import React, { useState, useEffect } from "react";

const Carousel = ({ setSearchQuery }) => {
  const images = [
    "https://previews.123rf.com/images/yourapechkin/yourapechkin2411/yourapechkin241102496/238132195-a-charming-breakfast-of-baked-eggs-sliced-bread-and-fresh-tomatoes-on-a-rustic-wooden-table.jpg",
    "https://previews.123rf.com/images/rez_art/rez_art2006/rez_art200600068/149699011-vietnamese-food-collage-with-beef-pho-and-bahn-mi.jpg",
    "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  ];

  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(input);
  };

  // Auto-slide logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  return (
    <div
      className="relative w-full h-[700px] mx-auto overflow-hidden rounded-lg shadow-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image */}
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
      />

      {/* Indicators (dots) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 flex bg-white/80 p-3 rounded-lg shadow-md w-2/3 max-w-6xl"
      >
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search..."
          className="flex-grow px-3 py-2 rounded-l-lg border outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Carousel;
