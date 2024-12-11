import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type Props = {
  name: string;
  type: "submit" | "button";
  [key: string]: any;
};

const SubmitButton = ({ name, type = "button", ...props }: Props) => {
  const { pending } = useFormStatus();
  const text = pending ? "Loading..." : name;
  return (
    <Button className="w-full" disabled={pending} type={type} {...props}>
      {text}
    </Button>
  );
};

export default SubmitButton;
