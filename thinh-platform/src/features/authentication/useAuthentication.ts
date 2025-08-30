import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { toast } from 'react-toastify';
export type AuthFlow = "signIn" | "signUp";

export const useAuthentication = () => {
  const [flow, setFlow] = useState<AuthFlow>("signIn");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn, signOut } = useAuthActions();

  const handleSignIn = async (formData: FormData) => {
    try {
      formData.set("flow", "signIn");
      await signIn("password", formData);
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error("Sign in failed");
    }
  };

  const handleSignUp = async (formData: FormData) => {
    try {
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;
      toast.success("Sign up successful");
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // For sign up, we still use signIn but with a flow indicator
      formData.set("flow", "signUp");
      await signIn("password", formData);
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast.error("Sign up failed");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google");
      toast.success("Google sign in successful");
    } catch (error: any) {
      console.error("Google sign in error:", error);
      toast.error("Google sign in failed");
    }
  };

  const toggleFlow = () => {
    console.log("toggleFlow", flow);  
    setFlow(flow === "signIn" ? "signUp" : "signIn");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSignOut = () => {
    signOut();
    toast.success("Sign out successful");
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
  };
};
