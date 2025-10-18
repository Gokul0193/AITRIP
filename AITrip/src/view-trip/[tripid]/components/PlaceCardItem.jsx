import React from "react";
import { Button } from "@/components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import p1 from "../../../assets/p1.jpg";
import p2 from "../../../assets/p2.jpg";
import p3 from "../../../assets/p3.jpg";
import p4 from "../../../assets/p4.jpg";
import p5 from "../../../assets/p5.jpg";
import p6 from "../../../assets/p6.jpg";
import p7 from "../../../assets/p7.jpg";
import p8 from "../../../assets/p8.jpg";

const PlaceCardItem = ({ place }) => {
  const photos = [p1, p2, p3, p4, p5, p6, p7, p8];

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName} ${place.geoCoordinates}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* 🔹 Outer card container — added responsive height & hover effect only for md+ */}
      <div className="border rounded-xl p-3 mt-2 flex flex-col md:flex-row justify-between items-center gap-4 hover:md:scale-105 transition-all duration-300 cursor-pointer hover:shadow-md h-auto md:h-[220px]">

        {/* 🔹 Image Section — size adapts based on screen */}
        <img
          src={photos[Math.floor(Math.random() * photos.length)]}
          alt={place.placeName}
          className="w-full sm:w-[180px] md:w-[130px] h-[180px] md:h-[130px] object-cover rounded-xl flex-shrink-0"
        />

        {/* 🔹 Content Section — padding & layout adjust with screen */}
        <div className="flex flex-col justify-between h-full w-full text-center md:text-left">
          <div>
            <h2 className="font-bold text-lg line-clamp-1">
              {place.placeName}
            </h2>
            <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-3">
              {place.placeDetails}
            </p>
          </div>

          <div className="mt-3 md:mt-0">
            <h2 className="font-bold text-sm">{place.ticketPricing}</h2>
            <h2 className="text-sm text-yellow-600">⭐ {place.rating} STAR</h2>

            {/* 🔹 Button slightly larger on mobile */}
            <Button className="w-20 md:w-16 mt-3 cursor-pointer">
              <FaMapLocationDot />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
