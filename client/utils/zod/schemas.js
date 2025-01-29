import { z } from "zod";

const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled" })
    .email({ message: "This is not a valid email" }),
});

const StudentFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled" })
    .email({ message: "This is not a valid email" }),
  name: z.string().min(1, { message: "This field has to be filled" }),
  entryNumber: z
    .string()
    .regex(/^\d{4}\w{3}\d{4}$/, { message: "Invalid entry number format." }),
  batch: z.preprocess((value) => {
    if (typeof value === "string" && value.trim() !== "") {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? undefined : parsed;
    }
    return value;
  }, z.number().int().min(2015, { message: "please enter a valid batch year" }).max(2024, { message: "Please enter a valid batch year" })),
  department: z.enum(["CS", "EE", "ME", "CE", "MM", "PH", "CH", "MA", "HS"], {
    message: "Please Choose your department",
  }),
});

const FacultyFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled" })
    .email({ message: "This is not a valid email" }),
  name: z.string().min(1, { message: "This field has to be filled" }),
  department: z.enum(["CS", "EE", "ME", "CE", "MM", "PH", "CH", "MA", "HS"], {
    message: "Please Choose your department",
  }),
  facultyAdvisor: z.boolean({ message: "Error here" }).default(false),
});

const OTPFormSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, { message: "OTP must be a 6-digit number" }),
});

const CourseFormSchema = z.object({
  course_code: z
    .string()
    .regex(/^[A-Z]{2}\d{3}$/, { message: "Invaild course code format" }),
  course_name: z.string().min(1, { message: "This field has to be filled" }),
  credits: z.preprocess((value) => {
    if (typeof value === "string" && value.trim() !== "") {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? undefined : parsed;
    }
    return value;
  }, z.number().int().min(1, { message: "Must be a positive integer" })),
  semester: z.string().min(1, { message: "This field has to be filled" }),
});
export {
  LoginFormSchema,
  StudentFormSchema,
  OTPFormSchema,
  FacultyFormSchema,
  CourseFormSchema,
};
