import { z } from "zod";

const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled" })
    .email({ message: "This is not a valid email" }),
});

const SignupFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled" })
    .email({ message: "This is not a valid email" }),
  name: z.string().min(1, { message: "This field has to be filled" }),
  designation: z.enum(["ST", "IN", "FA"], {
    message: "Please Choose your designation",
  }),
  department: z.enum(["CS", "EE", "ME", "CE", "MM", "PH", "CH", "MA", "HS"], {
    message: "Please Choose your department",
  }),
});

export { LoginFormSchema, SignupFormSchema };
