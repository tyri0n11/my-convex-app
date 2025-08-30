import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

export type AuthFlow = "signIn" | "signUp";

export const useAuthentication = () => {
  const [flow, setFlow] = useState<AuthFlow>("signIn");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn, signOut } = useAuthActions();

  const handleSignIn = async (formData: FormData) => {
    try {
      setError(null);
      await signIn("password", formData);
    } catch (error: any) {
      console.error("Sign in error:", error);
      setError(error.message || "Sign in failed");
    }
  };

  const handleSignUp = async (formData: FormData) => {
    try {
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;
      
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      setError(null);
      // For sign up, we still use signIn but with a flow indicator
      formData.set("flow", "signUp");
      await signIn("password", formData);
    } catch (error: any) {
      console.error("Sign up error:", error);
      setError(error.message || "Sign up failed");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      await signIn("google");
    } catch (error: any) {
      console.error("Google sign in error:", error);
      setError(error.message || "Google sign in failed");
    }
  };

  const toggleFlow = () => {
    console.log("toggleFlow", flow);  
    setFlow(flow === "signIn" ? "signUp" : "signIn");
    setError(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSignOut = () => {
    signOut();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
  };

  return {
    flow,
    error,
    showPassword,
    showConfirmPassword,
    rememberMe,
    handleSignIn,
    handleSignUp,
    handleGoogleSignIn,
    toggleFlow,
    handleSignOut,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleRememberMeChange,
    setError
  };
};
