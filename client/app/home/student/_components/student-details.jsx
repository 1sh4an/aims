"use client";
import Loader from "@/components/common/loader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function StudentDetails() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:4000/student-details", {
        withCredentials: true,
      });

      if (res.data.valid) {
        setStudentData(res.data.student);
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
          <CardTitle className="text-lg">Student Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Name</TableCell>
                <TableCell>{studentData.user_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Email</TableCell>
                <TableCell>{studentData.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Entry Number</TableCell>
                <TableCell>{studentData.student_entry_no}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Department</TableCell>
                <TableCell>{studentData.department_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Batch</TableCell>
                <TableCell>{studentData.batch}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
