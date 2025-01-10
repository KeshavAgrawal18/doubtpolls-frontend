import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "./AuthForm";
import { InputFieldProps } from "../common/InputField";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    login({ email, password });
    setIsSubmitting(false);
  };

  const fields: InputFieldProps[] = [
    {
      id: "email",
      label: "Email Address",
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      placeholder: "Enter your email",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      placeholder: "Enter your password",
    },
  ];

  return (
    <AuthForm
      onSubmit={handleSubmit}
      fields={fields}
      buttonText="Login"
      isSubmitting={isSubmitting}
      errorMessage={"null"}
    />
  );
};

export default LoginForm;
