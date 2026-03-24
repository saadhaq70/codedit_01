import { Button } from "@/components/ui/button";
import UserButton from "@/modules/auth/components/user-button";
import Image from "next/image";
import "./globals.css";
import React from "react";
export default function Home() {
    return(
      <div className="flex justify-center items-center h-screen  bg-gray-100">
        <Button>
          Get started
        </Button>
        <UserButton/>
      </div>
    )
}
