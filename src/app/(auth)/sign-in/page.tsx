"use client";

import AuthNav from "@/components/NavBars/AuthNav";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/schemas/sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Typewriter } from "react-simple-typewriter";
import z from "zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function page() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    const respo = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (respo?.error) {
      toast.error(respo.error);
    } else {
      toast.success("User Sign-in successfully");
      router.replace("/");
    }
    setIsLoading(false);
  };
  return (
    <div
      className="flex h-screen bg-[#13131B] flex-col"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgb(151, 173, 196) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }}
    >
      <AuthNav />
      <div className="w-full flex justify-center items-center h-full">
        <form
          id="sign-in-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[90%] sm:w-[40%] shadow-[0px_0px_5px_1px] p-2 rounded-lg bg-[#1B1B23] text-gray-300"
        >
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-white">Welcome back</h1>

            <p className="text-xs">
              <Typewriter
                words={[
                  "Ready to master your next interview? Sign in to continue.",
                ]}
                typeSpeed={100}
                cursor
              />
            </p>
          </div>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email ID</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Email ID"
                    autoComplete="off"
                    className="bg-[#13131B] border-gray-500 rounded-sm"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Password"
                    autoComplete="off"
                    className="bg-[#13131B] border-gray-500 rounded-sm"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="w-full flex flex-col gap-1">
              <Button
                type="submit"
                className="w-full cursor-pointer bg-[#aeaff5] text-[#4E44C7] font-semibold font-mono"
              >
                Sign In
              </Button>
              <p className="text-sm text-center px-2">
                <Link href="/sign-up" className="group">
                  Don't have an account?{" "}
                  <span className="font-semibold font-mono text-[#655bd0] group-hover:underline">
                    {" "}
                    Sign Up{" "}
                  </span>
                </Link>
              </p>
            </div>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}

export default page;
