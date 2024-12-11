"use client";

import SubmitButton from "@/components/comman/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { LoginFormFields } from "../_data";
import { useFormState } from "react-dom";
import { loginAction } from "@/app/actions/authActions";

type Props = {};

const Login = (props: Props) => {
  const initialState = {
    message: "",
    status: 0,
    errors: {},
  };

  const [isActive, setIsActive] = useState<number>(-1);
  const router = useRouter();
  const [state, formAction]= useFormState(loginAction,initialState);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<z.infer<typeof LoginFormSchema>> = (
    data
  ) => {};

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
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
              {...register(fieldName)}
              onFocus={() => setIsActive(index)}
              onBlur={() => setIsActive(-1)}
              disabled={isSubmitting}
            />
            <span className="text-red-400">
              {errors[fieldName] && errors[fieldName]?.message}
            </span>
          </div>
        ))}
        <div className="mt-4">
          <SubmitButton name="Login" loading={isSubmitting} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
