import React from "react";
import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";
import styles from "./Auth.module.scss";

interface AuthProps {
  type: string;
}

const Auth: React.FC<AuthProps> = ({ type }) => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.formWrapper}>
        <h2>{type === "login" ? "Login" : "Register"}</h2>
        <div className={styles.formContent}>
          {type === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
