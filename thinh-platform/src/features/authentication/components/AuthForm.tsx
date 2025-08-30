"use client";

import { useAuthentication } from "../useAuthentication";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { useEffect } from "react";

export function AuthForm() {
  const { flow } = useAuthentication();
  useEffect(() => {
    console.log(flow);
  }, [flow]);

  return flow === "signIn" ? <SignInForm /> : <SignUpForm />;
}
