"use client";
import Loader from "@/components/common/loader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

export default function FacultyCourses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/faculty-courses", {
        withCredentials: true,
      });

      if (res.data.valid) {
        setData(res.data.courses);
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey]);

  const handleAction = async (course_code, new_status) => {
    try {
      await axios.put(
        "http://localhost:4000/update-course-status",
        { course_code: course_code, status: new_status },
        { withCredentials: true }
      );
      setRefreshKey((prev) => prev + 1);
      toast({
        title: "Course Status Updated",
        description: `Course successfully marked ${new_status}`,
      });
    } catch (error) {
      console.log("Error while updtaing course status", error);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="m-2 md:m-6 lg:m-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Courses Under You</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-zinc-900">
                  Sr.
                </TableHead>
                <TableHead className="font-semibold text-zinc-900">
                  Course Code
                </TableHead>
                <TableHead className="font-semibold text-zinc-900">
                  Course Name
                </TableHead>
                <TableHead className="font-semibold text-zinc-900">
                  Credits
                </TableHead>
                <TableHead className="font-semibold text-zinc-900">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-zinc-900">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((course, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{course.course_code}</TableCell>
                    <TableCell>
                      <Link
                        href={`/home/faculty/courses/details?course_code=${course.course_code}`}
                        className="hover:underline"
                      >
                        {course.course_name}
                      </Link>
                    </TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>
                      {course.course_status.charAt(0).toUpperCase() +
                        course.course_status.slice(1)}
                    </TableCell>
                    <TableCell>
                      {["complete"].includes(course.course_status) ? (
                        <Button disabled variant="outline">
                          No Actions
                        </Button>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">Actions</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {course.course_status === "running" && (
                              <DropdownMenuItem
                                onClick={() => {
                                  handleAction(course.course_code, "enrolling");
                                }}
                              >
                                Mark Enrolling
                              </DropdownMenuItem>
                            )}
                            {course.course_status === "enrolling" && (
                              <DropdownMenuItem
                                onClick={() => {
                                  handleAction(course.course_code, "running");
                                }}
                              >
                                Mark Running
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => {
                                handleAction(course.course_code, "complete");
                              }}
                            >
                              Mark Complete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
