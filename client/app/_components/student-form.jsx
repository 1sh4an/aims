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
import { StudentFormSchema } from "@/utils/zod/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StudentForm({ setOption }) {
  const form = useForm({ resolver: zodResolver(StudentFormSchema) });
  const { handleSubmit } = form;
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      setErrorMessage("");
      const res = await axios.post("http://localhost:4000/submit-signup", {
        email: data.email,
      });

      if (res.data.valid) {
        const queryParams = new URLSearchParams(data);
        router.push(`/auth?type=signup&user=student&${queryParams.toString()}`);
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
        <div className="text-red-500 font-semibold mb-2">{errorMessage}</div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
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
          name="email"
          render={({ field }) => (
            <FormItem className="mt-2">
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
          name="entryNumber"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Entry Number</FormLabel>
              <FormControl>
                <Input placeholder="2022CSB1123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="batch"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Batch</FormLabel>
              <FormControl>
                <Input type="number" placeholder="2022" {...field} />
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
                      <SelectItem value="EE">Electrical Engineering</SelectItem>
                      <SelectItem value="ME">Mechanical Engineering</SelectItem>
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
        <div className="flex w-full mt-8">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <div className="w-5"></div>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => {
              setOption(0);
            }}
          >
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
}
