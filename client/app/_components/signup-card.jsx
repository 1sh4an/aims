"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import StudentForm from "./student-form";
import FacultyForm from "./faculty-form";

export default function SignupCard() {
  const [option, setOption] = useState(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to AIMS Portal, IIT Ropar</CardTitle>
        <CardDescription>
          {(option === 0 && "Choose your account type") ||
            (option === 1 && "Student Signup") ||
            (option === 2 && "Faculty Signup")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {option === 0 ? (
          <div className="flex w-full">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setOption(1)}
            >
              Student
            </Button>
            <div className="w-5"></div>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setOption(2)}
            >
              Faculty
            </Button>
          </div>
        ) : option === 1 ? (
          <StudentForm setOption={setOption} />
        ) : (
          <FacultyForm setOption={setOption} />
        )}
      </CardContent>
    </Card>
  );
}
