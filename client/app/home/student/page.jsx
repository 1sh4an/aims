import React from "react";
import StudentNavbar from "./_components/navbar";
import StudentDetails from "./_components/student-details";
import StudentEnrollments from "./_components/student-enrollments";

export default function page() {
  return (
    <main>
      <StudentNavbar />
      <StudentDetails />
      <StudentEnrollments />
    </main>
  );
}
