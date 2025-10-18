import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const PlacesToVisit = ({trip}) => {
  return (
    <div>
      <h2 className='font-bold text-lg'>Places To Visit </h2>

      {
        trip?.TripData?.daily_itinerary?.map((day,index)=>(
            <div className='mt-10' key={index}>
                    <h2 className='font-medium text-lg'>Day {day.day}</h2>

                

                    <div className='grid md:grid-cols-2 gap-5'>

                    
                    {
                        day.places.map((place,idx)=>(
                            <div key={idx} className='my-3'>
                                    <h2 className='font-medium text-orange-600 text-sm'>{place.bestTimeToVisit}</h2>
                                <PlaceCardItem place={place} />
                            </div>
                                
                        ))
                    }

                    </div>
            </div>
        ))
      }
    </div>
  )
}

export default PlacesToVisit
