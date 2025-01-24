"use client";
import Loader from "@/components/common/loader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

export default function AvailableCourses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/available-courses", {
        withCredentials: true,
      });

      if (res.data.valid) {
        setData(res.data.courses);
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey]);

  const handleCredit = async (course_code) => {
    try {
      await axios.post(
        "http://localhost:4000/credit-course",
        { course_code: course_code },
        { withCredentials: true }
      );
      setRefreshKey((prev) => prev + 1);
      toast({
        title: `Successfully credited ${course_code}`,
        description: "Request sent forward for instructor approval.",
      });
    } catch (error) {
      console.log("Error while updtaing course status", error);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="m-5">
      <h1 className="text-xl font-semibold mb-5">
        Courses available for enrollment
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {data.map((course, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/home/student/courses/details?course_code=${course.course_code}`}
                  className="hover:underline"
                >{`${course.course_code}: ${course.course_name}`}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">Instructor</TableCell>
                    <TableCell>{course.user_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Department</TableCell>
                    <TableCell>{course.department_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Credits</TableCell>
                    <TableCell>{course.credits}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Semester</TableCell>
                    <TableCell>{course.semester}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button
                className="w-1/2"
                onClick={() => {
                  handleCredit(course.course_code);
                }}
              >
                Credit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Toaster />
    </div>
  );
}
