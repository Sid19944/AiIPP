import z from "zod";

export const userNameSchema = z
  .string()
  .min(4, { message: "Minimun 4 character username" })
  .max(8, { message: "Max 8 character username" });

export const signUpSchema = z.object({
  username: userNameSchema,
  email: z.string().email({ message: "Invalid Email ID" }),
  password: z
    .string()
    .min(8, { message: "minimum 8" })
    .regex(/[A-Z]/, { message: "At lest one Upper Case" })
    .regex(/[a-z]/, { message: "At lest one lower case" })
    .regex(/[0-9]/, { message: "At lest one digit" })
    .regex(/[!@#$%&]/, { message: "At lest one special char" }),
  confirmPassword: z.string().min(1, { message: "Enter Confirm Password" }),
});
