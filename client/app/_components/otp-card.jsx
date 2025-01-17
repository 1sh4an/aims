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
import { useState } from "react";
import React from "react";

export default function OTPCard({ email, otpOriginal, setotpPage }) {
  const [otpEntered, setOtpEntered] = useState("");
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Please enter the OPT sent to your Email</CardTitle>
        <CardDescription>{email}</CardDescription>
      </CardHeader>
      <CardContent className="py-6">
        <InputOTP
          maxLength={6}
          onChange={(e) => {
            setOtpEntered(e.target);
            console.log(otpEntered + " " + otpOriginal);
            if (otpEntered == otpOriginal) {
              console.log("OTP is correct");
            }
          }}
        >
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
      </CardContent>
      <CardFooter className=" row">
        <Button className="w-full" onClick={() => {}}>
          Verify OTP
        </Button>
        <div className="w-2"></div>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => setotpPage(false)}
        >
          Resend OTP
        </Button>
      </CardFooter>
    </Card>
  );
}
