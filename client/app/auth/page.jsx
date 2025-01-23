"use client";

import OTPCard from "@/app/auth/_components/otp-card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useSearchParams } from "next/navigation";

export default function AuthPage() {
  const query = useSearchParams();

  const email = query.get("email");
  const type = query.get("type");
  const user = query.get("user");

  var data = {};

  if (type === "signup") {
    if (user === "student") {
      const name = query.get("name");
      const entryNumber = query.get("entryNumber");
      const batch = query.get("batch");
      const department = query.get("department");
      data = {
        name: name,
        email: email,
        entryNumber: entryNumber,
        batch: batch,
        department: department,
      };
    } else if (user === "faculty") {
      const name = query.get("name");
      const department = query.get("department");
      const facultyAdvisor = query.get("facultyAdvisor");
      data = {
        name: name,
        email: email,
        facultyAdvisor: facultyAdvisor,
        department: department,
      };
    }
  }
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
        <OTPCard
          email={email}
          type={type}
          user={user}
          signup_data={data}
        ></OTPCard>
      </section>
    </main>
  );
}
