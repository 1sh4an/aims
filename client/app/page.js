"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import LoginCard from "./_components/login-card";
import OTPCard from "./_components/otp-card";
import SignupCard from "./_components/signup-card";

export default function Home() {
  const [otpPage, setotpPage] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <main className="flex flex-col h-screen">
      <nav>
        <NavigationMenu className="p-4">
          <NavigationMenuList>
            <NavigationMenuItem className=" font-semibold">
              AIMS :: Academic Information Management System
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <section className="flex justify-center items-center h-full">
        {otpPage ? (
          <OTPCard email={email} setotpPage={setotpPage} />
        ) : (
          <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="w-full">
              <TabsTrigger value="login" className="w-full">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="w-full">
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginCard
                email={email}
                otpOriginal={"123456"}
                setEmail={setEmail}
                setotpPage={setotpPage}
              />
            </TabsContent>
            <TabsContent value="signup">
              <SignupCard
                email={email}
                otpOriginal={"123456"}
                setEmail={setEmail}
                setotpPage={setotpPage}
              />
            </TabsContent>
          </Tabs>
        )}
      </section>
    </main>
  );
}
