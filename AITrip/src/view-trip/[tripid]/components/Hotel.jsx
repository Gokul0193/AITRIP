    import React from 'react'
    import travel from "../../../assets/travel.jpg";
import { Link } from 'react-router-dom';
import h1 from "../../../assets/h1.jpg";
import h2 from "../../../assets/h2.jpg";
import h3 from "../../../assets/h3.jpg";
import h4 from "../../../assets/h4.jpg";
import h5 from "../../../assets/h5.jpg";
import h6 from "../../../assets/h6.jpg";
import h7 from "../../../assets/h7.jpg";
import h8 from "../../../assets/h8.jpg";
    export const Hotel = ({trip}) => {

          const photos=[h1,h2,h3,h4,h5,h6,h7,h8];
         
        
    return (
        <div>
            
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 mt-5'>
                {

                    trip?.TripData?.hotels?.map((hotel,index)=>(  

                        <Link to={"https://www.google.com/maps/search/?api=1&query="+hotel.hotelName+" "+hotel.hotelAddress} target='_blank' rel='noopener noreferrer' key={index}>
                <div key={index} className='hover:scale-110 transition-all cursor-pointer' >
                        <img src={photos[Math.floor(Math.random()*photos.length)]} alt=""  className='rounded-xl'/>

                        <div className='my-2 flex flex-col gap-1'>
                                 <h2 className='font-medium '>{hotel.hotelName}</h2>
                                 <h2 className='text-xs text-gray-500 mt-2'> 📍{hotel.hotelAddress} </h2>
                                 <h2 className='font-bold'> 💳{hotel.price}</h2>
                                 <h2 className='text-sm'> ⭐{hotel.rating } STAR</h2>
                        </div>
                   
                </div>
                </Link>
                    
                
                
                ))
                }

            
            </div>
        </div>
    )
    }
