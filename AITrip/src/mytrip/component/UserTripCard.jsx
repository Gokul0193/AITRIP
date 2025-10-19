import React from 'react';
import p1 from "../../assets/p1.jpg";
import p2 from "../../assets/p2.jpg";
import p3 from "../../assets/p3.jpg";
import p4 from "../../assets/p4.jpg";
import p5 from "../../assets/p5.jpg";
import p6 from "../../assets/p6.jpg";
import p7 from "../../assets/p7.jpg";
import p8 from "../../assets/p8.jpg";
import { Link } from 'react-router-dom';

const UserTripCard = ({ trip }) => {
  const photos = [p1, p2, p3, p4, p5, p6, p7, p8];
  const randomPhoto = photos[Math.floor(Math.random() * photos.length)];

  return (
    <Link to={`/view-trip/${trip.Id}`}>
      <div className="hover:scale-105 transition-all duration-300 cursor-pointer shadow-md rounded-2xl overflow-hidden w-full">
        <img
          src={randomPhoto}
          alt="trip"
          className="object-cover w-full h-56 sm:h-64 md:h-72 lg:h-80"
        />
        <div className="p-4">
          <h2 className="font-bold text-lg">{trip?.TripData?.location}</h2>
          <h2 className="text-sm text-gray-700">
            {trip?.TripData?.total_days} Days Trip with {trip?.TripData?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCard;
