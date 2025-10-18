  import React, { useEffect, useState } from "react";
  import { Button } from "@/components/ui/button";
  import { FaShareNodes } from "react-icons/fa6";
  import p1 from "../../../assets/p1.jpg";
  import p2 from "../../../assets/p2.jpg";
  import p3 from "../../../assets/p3.jpg";
  import p4 from "../../../assets/p4.jpg";
  import p5 from "../../../assets/p5.jpg";
  import p6 from "../../../assets/p6.jpg";
  import p7 from "../../../assets/p7.jpg";
  import p8 from "../../../assets/p8.jpg";

  const Information = ({ trip }) => {
  const photos=[p1,p2,p3,p4,p5,p6,p7,p8];
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  useEffect(()=>{
  trip&&setSelectedPhoto(photos[Math.floor(Math.random()*photos.length)]);
  },[trip])

    return (
      <div>
      <img
    src={selectedPhoto}
    alt="Place"
    className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] w-full object-cover rounded-xl"
  />


        <div className="flex justify-between items-center sm:flex-row flex-col mt-5">
          <div className="my-5 flex flex-col gap-2">
            <h2 className="font-bold text-2xl">{trip?.userSelection.location}</h2>

            <div className="flex gap-4 ">
              <h2 className="p-2 px-3 bg-gray-200 rounded-xl text-gray-600 text-xs md:text-md ff">
                📅 {trip?.userSelection.days} Day
              </h2>
              <h2 className="p-2 px-3 bg-gray-200 rounded-xl text-gray-600 text-xs md:text-md">
                💵 {trip?.userSelection.budget} Budget
              </h2>
              <h2 className="p-2 px-3 bg-gray-200 rounded-xl text-gray-600 text-xs md:text-md ">
                🍷 Travellers: {trip?.userSelection.travelWith}
              </h2>
            </div>
          </div>

          <Button className="w-28">
            <FaShareNodes />
          </Button>
        </div>
      </div>
    );
  };

  export default Information;
