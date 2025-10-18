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
import { FaSpinner } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const CreateTrip = () => {
const [formData, setFormData] = useState({});
const [openDialogue, setOpenDialogue] = useState(false);
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const locationData = (data) => handleChange("location", data);

const handleChange = (key, value) => {
setFormData({
...formData,
[key]: value,
});
};

useEffect(() => {
console.log(formData);
}, [formData]);

const onGenerateTrip = async () => {
const user = localStorage.getItem("user");
console.log("user:", user);


if (!user) {
  setOpenDialogue(true);
  return;
}

if (!formData?.location || !formData?.budget || !formData?.travelWith || !formData?.days) {
  toast.error("Please fill all details!");
  return;
}

toast.message("Generating trip...");
setLoading(true);

const prompt = buildTravelPrompt({
  location: formData.location,
  travelType: formData.travelWith,
  budget: formData.budget,
  days: formData.days,
});

const itineraryJSON = await generateAIResponse(prompt);
setLoading(false);
console.log("Generated Itinerary:", itineraryJSON);
SaveAiTrip(itineraryJSON);
toast.success("Trip Created 🚀");


};

const SaveAiTrip = async (TripData) => {
setLoading(true);
const user = JSON.parse(localStorage.getItem("user"));
const id = Date.now().toString();
await setDoc(doc(db, "AITrips", id), {
userSelection: formData,
TripData: TripData,
userEmail: user?.email,
Id: id,
});
setLoading(false);
navigate(`/view-trip/` + id);
};

const login = useGoogleLogin({
onSuccess: (codeRep) => {
console.log(codeRep);
GetUserProfile(codeRep);
},
onError: (error) => {
console.log("Login Failed:", error);
},
});

const GetUserProfile = (codeRep) => {
axios
.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeRep?.access_token}`, {
headers: {
Authorization: `Bearer ${codeRep?.access_token}`,
Accept: "application/json",
},
})
.then((res) => {
console.log("user info:", res);
localStorage.setItem("user", JSON.stringify(res?.data));
setOpenDialogue(false);
toast.success("Login Successful!");
onGenerateTrip();
});
};

return ( <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 mt-10"> <h2 className="font-bold text-2xl sm:text-3xl">
Tell us your travel preference 🏞️🏕️ </h2> <p className="mt-3 text-gray-600 text-base sm:text-lg">
Just provide us with some basic information about your trip, and our AI
will craft a personalized itinerary tailored to your interests and needs. </p>


  <div className="mt-16 flex flex-col gap-10">
    {/* Destination */}
    <div className="gap-4 flex flex-col">
      <h2 className="text-lg sm:text-xl md:text-2xl font-medium">
        What is your destination of choice?
      </h2>
      <GeoapifySearch locationData={locationData} />
    </div>

    {/* Days */}
    <div className="gap-4 flex flex-col">
      <h2 className="text-lg sm:text-xl md:text-2xl font-medium">
        How many days are you planning your trip?
      </h2>
      <Input
        placeholder="e.g. 5"
        type="number"
        min={1}
        onChange={(e) => handleChange("days", e.target.value)}
      />
    </div>

    {/* Budget */}
    <div>
      <h2 className="text-lg sm:text-xl md:text-2xl font-medium">
        What is your budget?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {SelectBudegetOptions.map((item, index) => (
          <div
            key={index}
            className={`p-4 sm:p-6 rounded-lg hover:shadow-2xl cursor-pointer flex flex-col items-center gap-3 border transition-all ${
              formData.budget === item.title ? "border-blue-500 shadow-lg" : ""
            }`}
            onClick={() => handleChange("budget", item.title)}
          >
            <img src={item.icon} alt={item.title} className="w-12 sm:w-16" />
            <h2 className="font-bold text-base sm:text-lg">{item.title}</h2>
            <p className="text-center text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Travel With */}
    <div>
      <h2 className="text-lg sm:text-xl md:text-2xl font-medium">
        Who do you plan on traveling with?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {SelectTravelList.map((item, index) => (
          <div
            key={index}
            className={`p-4 sm:p-6 rounded-lg hover:shadow-2xl cursor-pointer flex flex-col items-center gap-3 border transition-all ${
              formData.travelWith === item.people ? "border-blue-500 shadow-lg" : ""
            }`}
            onClick={() => handleChange("travelWith", item.people)}
          >
            <img src={item.icon} alt={item.title} className="w-12 sm:w-16" />
            <h2 className="font-bold text-base sm:text-lg">{item.title}</h2>
            <p className="text-center text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Generate Button */}
    <div className="my-10 flex justify-center sm:justify-end">
      <Button
        className="p-4 sm:p-6 text-base sm:text-lg flex items-center cursor-pointer gap-3"
        onClick={onGenerateTrip}
        disabled={loading}
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin w-6 h-6 mr-2" /> Generating...
          </>
        ) : (
          "Create My Trip"
        )}
      </Button>
    </div>

    {/* Login Dialog */}
    <Dialog open={openDialogue} onOpenChange={setOpenDialogue}>
      <DialogContent className="sm:max-w-md w-full z-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            <img src="/logo.svg" alt="Logo" className="w-40 mx-auto" />
          </DialogTitle>
          <DialogDescription className="text-center">
            <h2 className="font-bold text-lg mt-7 mb-2">Sign in with Google</h2>
            <p className="mb-4 text-sm text-gray-600">
              Sign in to the app securely using Google Authentication.
            </p>
            <Button
              className="w-full p-4 sm:p-5 flex items-center justify-center gap-3 cursor-pointer"
              onClick={login}
            >
              <FcGoogle className="text-xl" /> Sign In with Google
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </div>
</div>


);
};
