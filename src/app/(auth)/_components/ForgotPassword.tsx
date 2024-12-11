"use client";
import { forgotPasswordAction } from "@/app/actions/authActions";
import SubmitButton from "@/components/comman/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

type Props = {};

const ForgotPassword = (props: Props) => {
  const initialState = {
    message: "",
    status: 0,
    errors: {},
  };
  const [state, formAction] = useFormState(forgotPasswordAction, initialState);

  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input placeholder="Type your email" name="email" />
        <span className="text-red-400">{state.errors?.email}</span>
      </div>

      <div className="mt-4">
        <SubmitButton
          text="Send Reset Link"
          type="submit"
          name="forgot_password"
        />
      </div>
    </form>
  );
};

export default ForgotPassword;
