import React, { useEffect, useState } from "react";
import GeoapifySearch from "./GeoapifySearch";
import { Input } from "@/components/ui/input";
import { SelectBudegetOptions, SelectTravelList } from "@/constant/Option";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { buildTravelPrompt, generateAIResponse } from "@/services/AiModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { GiFlameSpin } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export const CreateTrip = () => {
  // State for managing form data
  const [formData, setFormData] = useState({});
  // State for controlling the login dialog's visibility
  const [openDialogue, setOpenDialogue] = useState(false);
  const [loading, setLoading] = useState(false);
  // Callback function to receive location data from the child component
  const locationData = (data) => {
    handleChange("location", data);
  };
  const navigate=useNavigate();
  // Generic handler to update the form data state
  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  // useEffect for debugging: logs form data whenever it changes
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // Main function to handle trip generatio
  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    console.log("user:", user);
    
    // 1. Check if the user is logged in
    if (!user) {
      setOpenDialogue(true); // Open login dialog if not logged in
      return;
    }

    // 2. Validate that all required fields are filled
    if (
      !formData?.location ||
      !formData?.budget ||
      !formData?.travelWith ||
      !formData?.days
    ) {
      toast.error("Please fill all details!"); // Show error message
      return;
    }

    toast.message("Generating trip...");
    setLoading(true);

    // 3. Build the prompt for the AI model
    const prompt = buildTravelPrompt({
      location: formData.location,
      travelType: formData.travelWith,
      budget: formData.budget,
      days: formData.days,
    });

    // 4. Call the AI service and handle the response
    const itineraryJSON = await generateAIResponse(prompt);
    setLoading(false);
    console.log("Generated Itinerary:", itineraryJSON);
    SaveAiTrip(itineraryJSON);
    toast.success("Trip Created 🚀");
    
  };

  const SaveAiTrip=async(TripData)=>{
    setLoading(true);
    const user=JSON.parse(localStorage.getItem("user"));
   const id=Date.now().toString();
    await setDoc(doc(db,"AITrips",id),{
      userSelection:formData,
      TripData:TripData,
      userEmail:user?.email,
      Id:id,
    })
    setLoading(false);
    navigate(`/view-trip/`+id);
  }


  // Function to handle Google login (placeholder)

  const login=useGoogleLogin({
    onSuccess:(codRep)=>{
      console.log(codRep);
      GetUserProfile(codRep);
      
    },

    onError:(error)=>{
      console.log('Login Failed:',error);
      
    }
  })

  const GetUserProfile=(codRep)=>{
      axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?acess_token=${codRep?.access_token}`,{
        headers:{
          Authorization:`Bearer ${codRep?.access_token}`,
          Accept:'application/json'
      }}).then((res)=>{
        console.log("user info:",res);
        localStorage.setItem("user",JSON.stringify(res?.data))
        setOpenDialogue(false);
        toast.success("Login Successfull!");
        onGenerateTrip();
       
      })
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-40 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preference 🏞️🏕️</h2>
      <p className="mt-3 text-gray-600 text-xl">
        Just provide us with some basic information about your trip, and our AI
        will craft a personalized itinerary tailored to your interests and needs.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        {/* Destination Input */}
        <div className="gap-5 flex flex-col">
          <h2 className="text-xl font-medium">What is destination of choice?</h2>
          <GeoapifySearch locationData={locationData} />
        </div>

        {/* Days Input */}
        <div className="gap-5 flex flex-col">
          <h2 className="text-xl font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="eg. 5"
            type="number"
            onChange={(e) => handleChange("days", e.target.value)}
          />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-xl font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudegetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg hover:shadow-2xl cursor-pointer flex flex-col items-center gap-3 border ${
                  formData.budget === item.title
                    ? "border-blue-500 shadow-lg"
                    : ""
                }`}
                onClick={() => handleChange("budget", item.title)}
              >
                <img src={item.icon} alt={item.title} className="w-16" />
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="md:w-36 text-center text-sm text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Companion Selection */}
        <div>
          <h2 className="text-xl font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg hover:shadow-2xl cursor-pointer flex flex-col items-center gap-3 border ${
                  formData.travelWith === item.people
                    ? "border-blue-500 shadow-lg"
                    : ""
                }`}
                onClick={() => handleChange("travelWith", item.people)}
              >
                <img src={item.icon} alt={item.title} className="w-16" />
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="md:w-36 text-center text-sm text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="my-10 justify-end flex">
          <Button className="p-6" onClick={onGenerateTrip} disabled={loading}>
            {
              loading? <GiFlameSpin className="animate-spin w-6 h-6 mr-2"/>:"Create My Trip"
            }
            
          </Button>
        </div>

        {/* Login Dialog - Controlled Component */}
        <Dialog open={openDialogue} onOpenChange={setOpenDialogue}>
          <DialogContent className="sm:max-w-md w-full z-50">
            <DialogHeader>
             <DialogTitle className="text-2xl font-bold "><img src="/logo.svg" alt="Logo" className='w-48 flex items-center' /></DialogTitle>
              <DialogDescription>
                
                <h2 className="font-bold  text-lg mt-7 mb-2">Sigin In With Google </h2>
                <p className="mb-4">Sigin in to the App with Google Authentication Securely</p>
                <Button className="w-full p-6 flex items-center cursor-pointer" onClick={login}> <FcGoogle  className="w-xl"/>Sigin With Google</Button>
              </DialogDescription>
            </DialogHeader>
           
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};