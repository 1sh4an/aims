"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OTPFormSchema } from "@/utils/zod/schemas";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OTPCard({ email, type, user, signup_data }) {
  const form = useForm({ resolver: zodResolver(OTPFormSchema) });
  const [invalidMessage, setInvalidMessage] = useState(false);
  const { handleSubmit } = form;
  const router = useRouter();

  const onSubmit = async (data) => {
    setInvalidMessage(false);
    try {
      const res = await axios.post("http://localhost:4000/verify-otp", {
        email: email,
        otp: data.otp,
      });

      if (res.data.valid) {
        console.log("OTP verified successfully");

        if (type === "signup") {
          if (user === "student") {
            const student = await axios.post(
              "http://localhost:4000/signup-student",
              signup_data
            );
          } else if (user === "faculty") {
            const faculty = await axios.post(
              "http://localhost:4000/signup-faculty",
              signup_data
            );
          }
        }

        const login = await axios.post(
          "http://localhost:4000/login",
          {
            email: email,
          },
          { withCredentials: true }
        );

        router.push("/home");
      } else {
        console.log("Invalid OTP");
        setInvalidMessage(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendOTP = async () => {
    await axios.post("http://localhost:4000/delete-otp", {
      email: email,
    });
    router.push("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Please enter the OTP sent to your Email</CardTitle>
            <CardDescription>{email}</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  {invalidMessage && (
                    <FormDescription className="text-red-500 font-semibold text-sm mt-5">
                      Invalid OTP. Please try again or resend OTP.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className=" row">
            <Button className="w-full" type="submit">
              Verify OTP
            </Button>
            <div className="w-2"></div>
            <Button
              className="w-full"
              variant="outline"
              onClick={handleResendOTP}
            >
              Retry
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
