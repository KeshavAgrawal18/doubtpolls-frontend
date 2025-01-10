import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "./AuthForm";
import { InputFieldProps } from "../common/InputField";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { register } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);
    register({ username, email, password });
    setIsSubmitting(false);
  };

  const fields: InputFieldProps[] = [
    {
      id: "username",
      label: "Username",
      value: username,
      onChange: (e) => setUsername(e.target.value),
      placeholder: "Enter your username",
    },
    {
      id: "email",
      label: "Email",
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
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      value: confirmPassword,
      onChange: (e) => setConfirmPassword(e.target.value),
      placeholder: "Re-enter your password",
    },
  ];

  return (
    <AuthForm
      onSubmit={handleSubmit}
      fields={fields}
      buttonText="Register"
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
    />
  );
};

export default RegisterForm;
