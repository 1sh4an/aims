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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { SignupFormSchema } from "@/utils/zod/schemas";

export default function SignupCard({ email, setEmail, setotpPage }) {
  const form = useForm({ resolver: zodResolver(SignupFormSchema) });
  const { register, handleSubmit } = form;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Welcome to AIMS Portal, IIT Ropar</CardTitle>
            <CardDescription>
              Please Enter the following information to create an account
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Select
                      className="w-full"
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Designation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="ST">Student</SelectItem>
                          <SelectItem value="IN">Instructor</SelectItem>
                          <SelectItem value="FA">Faculty Advisor</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Select
                      className="w-full"
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="CS">Computer Science</SelectItem>
                          <SelectItem value="EE">
                            Electrical Engineering
                          </SelectItem>
                          <SelectItem value="ME">
                            Mechanical Engineering
                          </SelectItem>
                          <SelectItem value="CE">Civil Engineering</SelectItem>
                          <SelectItem value="MM">
                            Materials and Metallurgical Engineering
                          </SelectItem>
                          <SelectItem value="PH">Physics</SelectItem>
                          <SelectItem value="CH">Chemistry</SelectItem>
                          <SelectItem value="MA">Mathematics</SelectItem>
                          <SelectItem value="HS">
                            Humanities and Social Sciences
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
