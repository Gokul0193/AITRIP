import { db } from '@/services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Information from './components/Information';

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
    <div>
      <Information trip={trip}/>
    </div>
  )
}

export default ViewTrip
