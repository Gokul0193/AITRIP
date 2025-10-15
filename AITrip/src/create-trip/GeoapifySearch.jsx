import { useState } from "react";
import axios from "axios";

function GeoapifySearch({locationData}) {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1); // For keyboard nav

  console.log(query);
  
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(-1);

    if (value.length > 2) {
      try {
        const res = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=e9fad19990f94076bcb971670b462c35`
        );
        setResults(res.data.features);
      } catch (err) {
        console.error(err);
      }
    } else {
      setResults([]);
    }
  };

  const handleSelect = (place) => {
    setQuery(place.properties.formatted);
    console.log(place.properties);
    
    setResults([]);
    locationData(place.properties.formatted)
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        handleSelect(results[activeIndex]);
      }
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Enter destination..."
        value={query}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        className="border p-2 w-full"
      />

      {results.length > 0 && (
        <ul className="absolute z-10 border bg-white mt-1 w-full max-h-40 overflow-y-auto">
          {results.map((place, index) => (
            <li
              key={place.properties.place_id}
              className={`p-2 cursor-pointer ${
                index === activeIndex ? "bg-gray-200" : ""
              }`}
              onMouseDown={() => handleSelect(place)} // onMouseDown to avoid blur
              onMouseEnter={() => setActiveIndex(index)}
            >
              {place.properties.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GeoapifySearch;
