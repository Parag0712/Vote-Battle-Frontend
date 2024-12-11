"use client";
import { resetPasswordAction } from "@/app/actions/authActions";
import SubmitButton from "@/components/comman/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

type Props = {};

const ResetPassword = (props: Props) => {
  const router = useRouter();
  const initialState = {
    message: "",
    status: 0,
    errors: {},
  };

  const sParams = useSearchParams();
  const [state, formAction] = useFormState(resetPasswordAction, initialState);

  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
      var timeOut = setTimeout(() => {
        router.replace("/login");
      }, 1500);
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="token" value={sParams.get("token") ?? ""} />
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input
          placeholder="Type your email"
          name="email"
          readOnly
          value={sParams.get("email") ?? ""}
        />
        <span className="text-red-400">{state.errors?.email}</span>
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          placeholder="Type your password"
          name="password"
        />
        <span className="text-red-400">{state.errors?.password}</span>
      </div>
      <div className="mt-4">
        <Label htmlFor="cpassword">Confirm Password</Label>
        <Input
          type="password"
          placeholder="Type your password"
          name="confirm_password"
        />
        <span className="text-red-400">{state.errors?.confirm_password}</span>
      </div>
      <div className="mt-4">
        <SubmitButton
          text="Reset Password"
          type="submit"
          name="reset_password"
        />
      </div>
    </form>
  );
};

export default ResetPassword;
