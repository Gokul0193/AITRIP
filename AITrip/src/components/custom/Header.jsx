import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { MdTravelExplore } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "sonner";

export const Header = () => {
  const [openDialogue, setOpenDialogue] = useState(false);

  const user =JSON.parse(localStorage.getItem("user"));

  // ✅ Google Login handler
  const login = useGoogleLogin({
    onSuccess: (codeRep) => {
      console.log(codeRep);
      GetUserProfile(codeRep);
    },
    onError: (error) => {
      console.log("Login Failed:", error);
      toast.error("Google login failed!");
    },
    scope: "openid profile email", // ✅ Required to get image + email
  });

  // ✅ Fetch user profile
  const GetUserProfile = (codeRep) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeRep?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${codeRep?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log("user info:", res.data);
        localStorage.setItem("user", JSON.stringify(res?.data));
        setOpenDialogue(false);
        toast.success("Login Successful!");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
        toast.error("Failed to fetch user info!");
      });

      
  };

  return (
    <div className="p-3 shadow-md flex justify-between items-center px-5">
      {/* ✅ Logo */}
      <a href="/create-trip">
      <img src="/logo.svg" alt="Logo" className="md:w-56 lg:w-56 xl:w-56 w-42" />
      </a>
      <div>
        {user ? (
          <div className="flex items-center justify-between gap-5">
            <a href="/my-trip">
            <Button
              className="p-5  cursor-pointer bg-gray-300 "
              variant="outline"
            >
              Trips <MdTravelExplore />
            </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  alt="User"
                  className="w-10 h-10 rounded-full z-10 cursor-pointer mr-2"
                />
              </PopoverTrigger>
              <PopoverContent className="text-center cursor-pointer">
                <h2
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  LogOut
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            className="p-5 px-7 cursor-pointer"
            onClick={() => setOpenDialogue(true)}
          >
            Sign In
          </Button>
        )}

        {/* ✅ Dialog for Sign In */}
        <Dialog open={openDialogue} onOpenChange={setOpenDialogue}>
          <DialogContent className="sm:max-w-md w-full z-50">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                <img src="/logo.svg" alt="Logo" className="w-40 mx-auto" />
              </DialogTitle>
              <DialogDescription className="text-center">
                <h2 className="font-bold text-lg mt-7 mb-2">
                  Sign in with Google
                </h2>
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
