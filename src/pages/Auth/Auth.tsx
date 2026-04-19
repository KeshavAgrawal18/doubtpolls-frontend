import React from "react";
import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface AuthProps {
  type: "login" | "register";
}

const Auth: React.FC<AuthProps> = ({ type }) => {
  const isLogin = type === "login";

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold">
            {isLogin ? "Welcome back" : "Create an account"}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {isLogin
              ? "Enter your credentials to continue"
              : "Fill in the details to get started"}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {isLogin ? <LoginForm /> : <RegisterForm />}

          {/* Switch link */}
          <div className="text-center text-sm text-muted-foreground">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
