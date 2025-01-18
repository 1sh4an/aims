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
  return (
    <main>
      <nav>
        <NavigationMenu className="p-4">
          <NavigationMenuList>
            <NavigationMenuItem className=" font-semibold">
              AIMS :: Academic Information Management System
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <section className="w-full flex justify-center mt-20">
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
            <LoginCard />
          </TabsContent>
          <TabsContent value="signup">
            <SignupCard />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
