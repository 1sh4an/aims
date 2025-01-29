"use client";

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CourseFormSchema } from "@/utils/zod/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

export default function CourseForm() {
  const form = useForm({ resolver: zodResolver(CourseFormSchema) });
  const { handleSubmit } = form;
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data) => {
    try {
      setErrorMessage("");
      const res = await axios.post("http://localhost:4000/float-course", data, {
        withCredentials: true,
      });

      if (res.data.valid) {
        router.push("/home/faculty");
        toast({
          title: "Course Floated Successfully",
          description: `${data.course_code} is now open for enrolllment`,
        });
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="md:w-[500px] lg:w-[600px]">
          <CardHeader>
            <CardTitle>New Course Details</CardTitle>
            <CardDescription>
              Please fill the details below to float a new course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-red-500 font-semibold mb-2">
              {errorMessage}
            </div>
            <FormField
              control={form.control}
              name="course_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Code</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: CS502" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course_name"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eg: Artificial Intelligence"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="credits"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Credits</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Semester</FormLabel>
                  <FormControl>
                    <Select
                      className="w-full"
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="2024-II">2024-II</SelectItem>
                          <SelectItem value="2025-I">2025-I</SelectItem>
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
              Float Course
            </Button>
          </CardFooter>
        </Card>
      </form>
      <Toaster />
    </Form>
  );
}
