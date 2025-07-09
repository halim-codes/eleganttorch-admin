"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import Input from "@/components/form/input/InputField";
import { EyeCloseIcon, EyeIcon } from "@/icons";

export default function ChangePasswordPage() {
  
  const router = useRouter(); 
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");


  const handleSubmit = () => {
      router.push("/profile");
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          {/* Header */}
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Change Password
            </h1>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative flex items-center justify-between gap-2">
              <div className="flex-1 relative">
                <Input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Enter your old password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  {...{ required: true }}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                  aria-label={showOldPassword ? "Hide password" : "Show password"}
                >
                  {showOldPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                  )}
                </button>
              </div>
                
              <Link
                href="/reset-password"
                className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 whitespace-nowrap"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                {...{ required: true }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                )}
              </button>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                {...{ required: true }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                )}
              </button>
            </div>
            {/* Submit button */}
            <div className="mt-3">
              <button
                type="submit"
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:opacity-50"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
