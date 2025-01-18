"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

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
      <section className="w-full flex justify-center mt-20"></section>
    </main>
  );
}
