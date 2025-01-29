"use client";

import FacultyNavbar from "../_components/navbar";
import CourseForm from "./_components/course-form";

export default function FloatPage() {
  return (
    <main>
      <FacultyNavbar />
      <div className="m-4 md:m-10 lg:m-20 flex justify-center">
        <CourseForm />
      </div>
    </main>
  );
}
