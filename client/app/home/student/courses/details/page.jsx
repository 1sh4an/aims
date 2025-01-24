"use client";

import React from "react";
import StudentNavbar from "../../_components/navbar";
import { useSearchParams } from "next/navigation";
import CourseDetails from "./_components/course-details";
import CourseEnrollments from "./_components/course-enrollments";

export default function DetailsPage() {
  const query = useSearchParams();
  const course_code = query.get("course_code");

  if (course_code == null) {
    return (
      <main className="w-screen h-screen flex justify-center items-center">
        <h1 className="text-4xl font-semibold">No course selected</h1>
      </main>
    );
  }
  return (
    <main>
      <StudentNavbar />
      <CourseDetails course_code={course_code} />
      <CourseEnrollments course_code={course_code} />
    </main>
  );
}
