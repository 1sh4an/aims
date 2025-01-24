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

export default function StudentEnrollments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/student-enrollments", {
        withCredentials: true,
      });

      if (res.data.valid) {
        setData(res.data.enrollments);
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey]);

  const handleAction = async (enrollment_id, newState) => {
    try {
      await axios.put(
        "http://localhost:4000/update-enrollment-status",
        { enrollment_id: enrollment_id, newState: newState },
        { withCredentials: true }
      );
      setRefreshKey((prev) => prev + 1);
      toast({
        title: "Enrollment Status Updated",
        description: `Course successfully ${newState}`,
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
          <CardTitle className="text-lg">Student Enrollments</CardTitle>
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
              {data.map((enrollment, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{enrollment.course_code}</TableCell>
                    <TableCell>{enrollment.course_name}</TableCell>
                    <TableCell>{enrollment.credits}</TableCell>
                    <TableCell>{enrollment.status}</TableCell>
                    <TableCell>
                      {["audited", "withdrawn", "dropped"].includes(
                        enrollment.status
                      ) ? (
                        <Button disabled variant="outline">
                          No Actions
                        </Button>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">Actions</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => {
                                handleAction(
                                  enrollment.enrollment_id,
                                  "withdrawn"
                                );
                              }}
                            >
                              Withdraw
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                handleAction(
                                  enrollment.enrollment_id,
                                  "dropped"
                                );
                              }}
                            >
                              Drop
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                handleAction(
                                  enrollment.enrollment_id,
                                  "audited"
                                );
                              }}
                            >
                              Audit
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
