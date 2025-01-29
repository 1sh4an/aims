import React from "react";
import FacultyNavbar from "./_components/navbar";
import FacultyDetails from "./_components/faculty-details";
import FacultyCourses from "./_components/faculty-courses";

export default function page() {
  return (
    <main>
      <FacultyNavbar />
      <FacultyDetails />
      <FacultyCourses />
    </main>
  );
}
