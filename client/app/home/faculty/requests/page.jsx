"use client";

import { useEffect, useState } from "react";
import FacultyNavbar from "../_components/navbar";
import AdvisorRequests from "./_components/advisor-requests";
import InstructorRequests from "./_components/instructor-requests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import Loader from "@/components/common/loader";

export default function FloatPage() {
  const [advisor, setAdvisor] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:4000/check-advisor", {
        withCredentials: true,
      });

      if (res.data.valid) {
        setAdvisor(res.data.advisor);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <main>
      <FacultyNavbar />
      <div className="m-2 md:m-6 lg:m-10">
        {advisor ? (
          <Tabs defaultValue="instructor" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="instructor" className="w-full">
                Instructor
              </TabsTrigger>
              <TabsTrigger value="advisor" className="w-full">
                Advisor
              </TabsTrigger>
            </TabsList>
            <TabsContent value="instructor">
              <InstructorRequests />
            </TabsContent>
            <TabsContent value="advisor">
              <AdvisorRequests />
            </TabsContent>
          </Tabs>
        ) : (
          <InstructorRequests />
        )}
      </div>
    </main>
  );
}
