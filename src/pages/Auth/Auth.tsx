import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";
import React from "react";

interface AuthProps {
  type: string;
}

const Auth: React.FC<AuthProps> = ({ type }) => {
  console.log("Auth");

  return <div>{type == "login" ? <LoginForm /> : <RegisterForm />}</div>;
};

export default Auth;
