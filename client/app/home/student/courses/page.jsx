import React from "react";
import StudentNavbar from "../_components/navbar";
import AvailableCourses from "./_components/available-courses";

export default function page() {
  return (
    <main>
      <StudentNavbar />
      <AvailableCourses />
    </main>
  );
}
