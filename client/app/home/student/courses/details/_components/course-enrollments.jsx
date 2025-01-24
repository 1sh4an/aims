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

export default function CourseEnrollments({ course_code }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post(
        "http://localhost:4000/course-enrollments",
        { course_code: course_code },
        {
          withCredentials: true,
        }
      );

      if (res.data.valid) {
        setData(res.data.enrollments);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="m-2 md:m-6 lg:m-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Course Enrollments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-zinc-900">
                  Sr.
                </TableHead>
                <TableHead className="font-semibold text-zinc-900">
                  Student Name
                </TableHead>
                <TableHead className="font-semibold text-zinc-900">
                  Entry Number
                </TableHead>
                <TableHead className="font-semibold text-zinc-900">
                  Department
                </TableHead>
                <TableHead className="font-semibold text-zinc-900">
                  Batch
                </TableHead>
                <TableHead className="font-semibold text-zinc-900">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((enrollment, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{enrollment.user_name}</TableCell>
                    <TableCell>{enrollment.student_entry_no}</TableCell>
                    <TableCell>{enrollment.department_name}</TableCell>
                    <TableCell>{enrollment.batch}</TableCell>
                    <TableCell>
                      {enrollment.status.charAt(0).toUpperCase() +
                        enrollment.status.slice(1)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
