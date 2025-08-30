"use client";

import { useAuthentication } from "../useAuthentication";
import { authStyles } from "../styles";

export function SignInForm() {
  const { 
    flow, 
    error, 
    showPassword, 
    showConfirmPassword,
    rememberMe,
    handleSignIn, 
    handleSignUp,
    toggleFlow, 
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleRememberMeChange,
    handleGoogleSignIn
  } = useAuthentication();

  const isSignUp = flow === "signUp";

  return (
    <div className={authStyles.container}>
      {/* Left Section - Promotional Area */}
      <div className={authStyles.leftSection}>
        <div className={authStyles.logo}>
          <div className={authStyles.logoIcon}>
            <div className="w-4 h-4 border border-white rounded m-1"></div>
          </div>
          <span className={authStyles.logoText}>Thinh-Platform</span>
        </div>
        <h1 className={authStyles.headline}>
          {isSignUp 
            ? "Create your account" 
            : "An all in one platform for Thinh"
          }
        </h1>
        <p className={authStyles.description}>
          {isSignUp 
            ? "Create an account to access your dashboard and manage your life." 
            : "Log in to access your dashboard and manage your life."
          }
        </p>
      </div>

      {/* Right Section - Form */}
      <div className={authStyles.rightSection}>
        <div>
          <h2 className={authStyles.welcomeTitle}>
            {isSignUp ? "Create Account" : "Welcome Back To Thinh-Platform"}
          </h2>
          <p className={authStyles.welcomeSubtitle}>
            {isSignUp 
              ? "Enter your details to create your account to access your dashboard."
              : "Enter your email and password to access your account."
            }
          </p>

          <form
            className={authStyles.form}
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              if (isSignUp) {
                void handleSignUp(formData);
              } else {
                void handleSignIn(formData);
              }
            }}
          >
            <div className={authStyles.inputGroup}>
              <label htmlFor="email" className={authStyles.label}>
                Email
              </label>
              <input
                id="email"
                className={authStyles.input}
                type="email"
                name="email"
                placeholder="user@company.com"
                required
              />
            </div>

            <div className={authStyles.inputGroup}>
              <label htmlFor="password" className={authStyles.label}>
                Password
              </label>
              <div className={authStyles.passwordContainer}>
                <input
                  id="password"
                  className={authStyles.input}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password."
                  required
                />
                <button
                  type="button"
                  className={authStyles.eyeIcon}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className={authStyles.inputGroup}>
                <label htmlFor="confirmPassword" className={authStyles.label}>
                  Confirm Password
                </label>
                <div className={authStyles.passwordContainer}>
                  <input
                    id="confirmPassword"
                    className={authStyles.input}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password."
                    required
                  />
                  <button
                    type="button"
                    className={authStyles.eyeIcon}
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            {!isSignUp && (
              <div className={authStyles.options}>
                <div className={authStyles.checkbox}>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className={authStyles.checkboxInput}
                    checked={rememberMe}
                    onChange={(e) => handleRememberMeChange(e.target.checked)}
                  />
                  <label htmlFor="rememberMe" className={authStyles.checkboxLabel}>
                    Remember Me
                  </label>
                </div>
                <a href="#" className={authStyles.forgotPassword}>
                  Forgot Your Password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className={authStyles.loginButton}
            >
              {isSignUp ? "Create Account" : "Log In"}
            </button>
          </form>

          <div className={authStyles.divider}>
            <div className={authStyles.dividerLine}>
              <div className={authStyles.dividerBorder} />
            </div>
            <div className={authStyles.dividerText}>
              <span className={authStyles.dividerSpan}>OR {isSignUp ? "SIGN UP" : "LOGIN"} WITH</span>
            </div>
          </div>

          <div className={authStyles.socialContainer}>
            <button
              type="button"
              className={authStyles.googleButton}
              onClick={() => {
                // Handle Google sign in
                void handleGoogleSignIn();
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
          </div>

          <div className={authStyles.registerContainer}>
            <span className={authStyles.registerText}>
              {isSignUp ? "Already have an account? " : "Don't Have An Account? "}
            </span>
            <button
              type="button"
              className={authStyles.registerLink}
              onClick={toggleFlow}
            >
              {isSignUp ? "Sign In" : "Register Now"}
            </button>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">
                {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
