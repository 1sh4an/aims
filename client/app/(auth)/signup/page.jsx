"use client";

import OTPCard from "@/app/_components/otp-card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const query = useSearchParams();
  const email = query.get("email");
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
        <OTPCard email={email}></OTPCard>
      </section>
    </main>
  );
}
