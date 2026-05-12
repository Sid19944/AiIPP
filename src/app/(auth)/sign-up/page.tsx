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
import { signUpSchema } from "@/schemas/sign-up.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { Typewriter } from "react-simple-typewriter";
import z from "zod";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/types/ApiResponse";
import { BadgeCheck, Loader2 } from "lucide-react";
import { useDebounce } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";

function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { watch } = form;
  const username = watch("username");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const debounceUsername = useDebounce(username, 500);

  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    if (!isUsernameAvailable) {
      toast.error("Username is not available");
      return;
    }
    setIsLoading(true);
    axios
      .post<ApiResponse>("/api/auth/sign-up", data)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        const axiosErr = err as AxiosError<ApiResponse>;
        toast.error(axiosErr.response?.data.message ?? "Internal server error");
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => {
          router.replace(`/verify/${data.email}`);
        }, 1500);
      });
  };

  useEffect(() => {
    if (debounceUsername && debounceUsername.length > 3) {
      setIsCheckingUsername(true);
      axios
        .post<ApiResponse>(`/api/auth/check-username`, {
          username: debounceUsername,
        })
        .then((res) => {
          setIsUsernameAvailable(true);
        })
        .catch((err) => {
          const axiosErr = err as AxiosError<ApiResponse>;
          toast.error(
            axiosErr.response?.data.message ?? "Internal server error",
          );
          setIsUsernameAvailable(false);
        })
        .finally(() => {
          setIsCheckingUsername(false);
        });
    }
  }, [debounceUsername]);
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
          id="register-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[90%] sm:w-[40%] shadow-[0px_0px_5px_1px] p-2 rounded-lg bg-[#1B1B23] text-gray-300"
        >
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-white">
              Create your account
            </h1>
            <p className="text-xs">
              <Typewriter
                words={["Start your journey to interview mastery today."]}
                typeSpeed={100}
                cursor
              />
            </p>
          </div>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="username"
                    className={`${isUsernameAvailable && "text-[#8082FD]"}`}
                  >
                    Username
                    {isUsernameAvailable && (
                      <BadgeCheck className="h-5 text-blue-500" />
                    )}
                  </FieldLabel>
                  <div className="flex gap-2 items-center">
                    <Input
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toLocaleLowerCase())
                      }
                      autoFocus
                      id="username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter username"
                      autoComplete="off"
                      className={`bg-[#13131B] border-gray-500 rounded-sm `}
                    />
                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

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
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">
                    confirmPassword
                  </FieldLabel>
                  <Input
                    {...field}
                    id="confirmPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Confirm Password"
                    autoComplete="off"
                    className="bg-[#13131B] border-gray-500 rounded-sm"
                  />
                  {confirmPassword !== "" && password !== confirmPassword && (
                    <FieldError>Password is not match</FieldError>
                  )}
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
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
              <p className="text-sm text-center px-2">
                <Link href="/sign-in" className="group">
                  Already have an account?{" "}
                  <span className="font-semibold font-mono text-[#655bd0] group-hover:underline">
                    {" "}
                    Sign In{" "}
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
