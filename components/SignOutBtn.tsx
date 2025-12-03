"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/firebase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signOutUser } from "@/lib/actions/auth.action";


export default function SignOutButton() {
  const handleSignOut = async () => {
    try {
      
      await signOut(auth);

     
      await signOutUser();
      
      toast.success("Signed out successfully");
      
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    }
  };

  return (
    <Button 
      
      onClick={handleSignOut}
      className=" items-center bg-gray-800 hover:bg-gray-700 text-white text-xs"
    >
     
      Sign Out
    </Button>
  );
}