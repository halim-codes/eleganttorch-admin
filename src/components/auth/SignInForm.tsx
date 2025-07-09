"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/context/LocaleContext";
import LanguageSwitcher from "@/components/header/LanguageSwitcher";

export default function SignInForm() {
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();
  const { messages, locale } = useLocale();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const isRtl = locale === "ar";

  const { login, loading: isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login({ email, password, rememberMe: keepLoggedIn });
    if (result) {
      setSuccessMessage(messages["signin_success"] || "Login successful, redirecting...");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>
        <div>
          {/* Header */}
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              {messages["signin_title"] || "Sign In"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {messages["signin_description"] || "Enter your email and password to sign in!"}
            </p>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label>
                {messages["signin_email"] || "Email"} <span className="text-error-500">*</span>
              </Label>
              <Input
                type="email"
                placeholder="info@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                {...{ required: true }}
              />
            </div>

            <div>
              <Label>
                {messages["signin_password"] || "Password"} <span className="text-error-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  {...{ required: true }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-1/2 -translate-y-1/2 cursor-pointer z-10 ${isRtl ? "left-4" : "right-4"
                    }`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                  )}
                </button>

              </div>
            </div>

            {/* Remember me + forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox checked={keepLoggedIn} onChange={setKeepLoggedIn} />
                <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                  {messages["signin_remember"] || "Keep me logged in"}
                </span>
              </div>
              <Link
                href="/reset-password"
                className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                {messages["signin_forgot_password"] || "Forgot password?"}
              </Link>
            </div>

            {/* Submit button */}
            <div>
              <Button className="w-full" size="sm" type="submit" disabled={isLoading}>
                {isLoading ? messages["signin_loading"] : messages["signin_button"]}
              </Button>
              {error && (
                <p className="mt-2 text-sm text-red-500">
                  {error === "Email or password is incorrect"
                    ? messages["signin_error_invalid"]
                    : error}
                </p>
              )}
              {successMessage && (
                <p className="mt-2 text-sm text-green-600 dark:text-green-400">{successMessage}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
