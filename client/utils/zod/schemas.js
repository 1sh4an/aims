import { z } from "zod";

const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled" })
    .email({ message: "This is not a valid email" }),
});

export { LoginFormSchema };
