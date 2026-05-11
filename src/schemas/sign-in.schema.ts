import z from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid Email ID" }),
  password: z.string().min(8, { message: "Enter Password" }),
});
