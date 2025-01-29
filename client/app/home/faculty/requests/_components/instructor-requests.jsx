"use client";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "@/components/common/loader";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

export default function InstructorRequests() {
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [data, setData] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/instructor-requests", {
        withCredentials: true,
      });

      if (res.data.valid) {
        setData(res.data.requests);
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey]);

  const handleApprove = async (enrollment_id) => {
    const res = await axios.put(
      "http://localhost:4000/approve-instructor-request",
      { enrollment_id: enrollment_id },
      { withCredentials: true }
    );

    if (res.data.valid) {
      setRefreshKey((prev) => prev + 1);
      toast({
        title: "Request Approved",
        description: "Request sent forward to the faculty advisor",
      });
    }
  };

  const handleReject = async (enrollment_id) => {
    const res = await axios.put(
      "http://localhost:4000/reject-instructor-request",
      { enrollment_id: enrollment_id },
      { withCredentials: true }
    );

    if (res.data.valid) {
      setRefreshKey((prev) => prev + 1);
      toast({
        title: "Request Rejected",
        description: "Student removed from the enrollment list",
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold  text-zinc-900">
                Sr.
              </TableHead>
              <TableHead className="font-semibold text-zinc-900">
                Course Code
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
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((request, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{request.course_code}</TableCell>
                <TableCell>{request.user_name}</TableCell>
                <TableCell>{request.student_entry_no}</TableCell>
                <TableCell>{request.department_name}</TableCell>
                <TableCell>{request.batch}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Actions</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          handleApprove(request.enrollment_id);
                        }}
                      >
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          handleReject(request.enrollment_id);
                        }}
                      >
                        Reject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Toaster />
    </Card>
  );
}
