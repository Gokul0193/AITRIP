import { db } from '@/services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Information from './components/Information';
import { Hotel } from './components/Hotel';
import PlacesToVisit from './components/PlacesToVisit';

const ViewTrip = () => {
    const {tripid}=useParams();
    const[trip,setTrip]=React.useState(null);
    console.log(tripid);
    useEffect(()=>{
        tripid&&GetTripData();
    },[tripid])

    const GetTripData=async()=>{
        
        const docRef=doc(db,"AITrips",tripid);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
            console.log("Document data:",docSnap.data());
            setTrip(docSnap.data());

        }
        else{
            toast("No such document!")
        }

    }
    
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56 flex flex-col gap-10'>
      <Information trip={trip}/>
      <Hotel trip={trip}/>
      <PlacesToVisit trip={trip}/>
    </div>
  )
}

export default ViewTrip
