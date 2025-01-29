"use client";
import Loader from "@/components/common/loader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function FacultyDetails() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:4000/faculty-details", {
        withCredentials: true,
      });

      if (res.data.valid) {
        setData(res.data.faculty);
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
          <CardTitle className="text-lg">Faculty Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Name</TableCell>
                <TableCell>{data.user_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Email</TableCell>
                <TableCell>{data.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Department</TableCell>
                <TableCell>{data.department_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Faculty Advisor</TableCell>
                <TableCell>{data.advisor ? "Yes" : "No"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
