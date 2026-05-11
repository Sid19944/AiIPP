"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

import { ApiResponse } from "@/types/ApiResponse";
import { Typewriter } from "react-simple-typewriter";
import toast from "react-hot-toast";

const otpSchema = z.object({
  otp: z.string().length(6, "Please Enter all 6 digits"),
});

function page() {
  const router = useRouter();
  const params = useParams<{ email: string }>();
  const email = decodeURIComponent(params.email);

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    mode: "onSubmit",
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof otpSchema>) => {
    try {
      const respo = await axios.put(`/api/auth/verify`, {
        verifyCode: Number(data.otp),
        email,
      });
      toast.success(respo.data.message);
      router.replace("/sign-in");
    } catch (err) {
      const axiosErr = err as AxiosError<ApiResponse>;
      toast.error(axiosErr.response?.data.message ?? "Invalid Input");
    }
  };

  return (
    <div
      className="flex h-screen bg-[#13131B] justify-center items-center"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgb(151, 173, 196) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }}
    >
      <div className="bg-[#1B1B23] text-gray-300 w-[95%] sm:w-fit rounded-lg p-2 md:p-10 flex flex-col items-center gap-3 shadow-[0px_0px_5px_1px] shadow-[#0c2bb2]">
        <div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[1px] text-center">
            Join <span className="text-[#8082FD]">PreoMaster - AI</span>
          </h1>
          <h1 className="tracking-tight text-center text-sm sm:text-md">
            <Typewriter
              words={["Enter Verificationi Code To Verify Your Account"]}
              cursor
              typeSpeed={100}
            />
          </h1>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          <Controller
            name="otp"
            control={form.control}
            render={({ field, fieldState }) => (
              <div>
                <FieldLabel htmlFor="vcode">Enter Verification Code</FieldLabel>
                <InputOTP
                  maxLength={6}
                  id="vcode"
                  pattern={REGEXP_ONLY_DIGITS}
                  value={field.value}
                  onChange={(val: string) => field.onChange(val)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={0}
                      className="h-12 w-12 bg-[#13131B]"
                    />
                    <InputOTPSlot
                      index={1}
                      className="h-12 w-12 bg-[#13131B]"
                    />
                    <InputOTPSlot
                      index={2}
                      className="h-12 w-12 bg-[#13131B]"
                    />
                    <InputOTPSlot
                      index={3}
                      className="h-12 w-12 bg-[#13131B]"
                    />
                    <InputOTPSlot
                      index={4}
                      className="h-12 w-12 bg-[#13131B]"
                    />
                    <InputOTPSlot
                      index={5}
                      className="h-12 w-12 bg-[#13131B]"
                    />
                  </InputOTPGroup>
                </InputOTP>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </div>
            )}
          />
          <div>
            <Button
              type="submit"
              className="w-full cursor-pointer bg-[#8082FD] text-[#0d10e1] font-semibold font-mono"
              disabled={form.formState.isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
