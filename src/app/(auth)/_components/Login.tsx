"use client";
import { loginAction } from "@/app/actions/authActions";
import SubmitButton from "@/components/comman/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { LoginFormFields } from "../_data";
const Login = () => {
  const initialState = {
    message: "",
    status: 0,
    errors: {},
    data: {},
  };
  const [isActive, setIsActive] = useState<number>(-1);
  const [state, formAction] = useFormState(loginAction, initialState);
  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
      signIn("credentials", {
        email: state.data?.email,
        password: state.data?.password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    }
  }, [state]);

  return (
    <div>
      <form action={formAction}>
        {LoginFormFields.map(({ fieldName, fieldType, placeholder }, index) => (
          <div className="mt-4 flex flex-col gap-3">
            <Label
              className={`${isActive === index ? "text-pink-500" : ""}`}
              htmlFor={fieldName}
            >
              {placeholder}{" "}
            </Label>
            <Input
              type={fieldType}
              id={fieldName}
              name={fieldName}
              required
              onFocus={() => setIsActive(index)}
              onBlur={() => setIsActive(-1)}
            />
            <span className="text-red-400">{state.errors[fieldName]}</span>
          </div>
        ))}
        <div className="mt-4">
          <SubmitButton name="Login" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
