"use client";

import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/loader";

export default function page() {
  const router = useRouter();
  useEffect(() => {
    const fetchSession = async () => {
      await axios
        .get("http://localhost:4000/session", {
          withCredentials: true,
        })
        .then(async (res) => {
          if (res.data.valid) {
            await axios
              .post("http://localhost:4000/user-type", {
                user_id: res.data.user.user_id,
              })
              .then((res) => {
                if (res.data.valid) {
                  if (res.data.user_type === "student") {
                    router.push("/home/student");
                  } else if (res.data.user_type === "faculty") {
                    router.push("/home/faculty");
                  }
                }
              });
          }
        });
    };
    fetchSession();
  }, []);

  return <Loader />;
}
