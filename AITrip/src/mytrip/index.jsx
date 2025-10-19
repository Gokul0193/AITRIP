import { db } from '@/services/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCard from './component/UserTripCard';

const MyTrip = () => {
  const [userTrips, setUserTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetUserDetails();
  }, []);

  const GetUserDetails = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserTrips([]);

    if (!user) {
      navigate('/');
      return;
    }

    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setUserTrips((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-32 xl:px-48 py-10 flex flex-col gap-10">
      <h2 className="font-bold text-3xl text-center sm:text-left">My Trips</h2>

      {/* ✅ Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {userTrips.length > 0 ? (
          userTrips.map((trip, index) => <UserTripCard trip={trip} key={index} />)
        ) : (
          <p className="text-gray-500 text-center col-span-full">No trips found.</p>
        )}
      </div>
    </div>
  );
};

export default MyTrip;
