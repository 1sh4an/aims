"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { LoginFormSchema } from "@/utils/zod/schemas";
import axios from "axios";

export default function LoginCard() {
  const form = useForm({ resolver: zodResolver(LoginFormSchema) });
  const { handleSubmit } = form;
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    setErrorMessage("");
    const res = await axios.post("http://localhost:4000/submit-login", {
      recipient: data.email,
    });

    if (res.data.valid) {
      const queryParams = new URLSearchParams(data);
      router.push(`/auth?user=any&type=login&${queryParams.toString()}`);
    } else {
      setErrorMessage(res.data.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Welcome to AIMS Portal, IIT Ropar</CardTitle>
            <CardDescription>
              Please Enter the following information to login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@iitrpr.ac.in" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please Enter your registered institute email id
                  </FormDescription>
                  <FormMessage>{errorMessage}</FormMessage>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
