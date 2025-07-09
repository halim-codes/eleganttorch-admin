"use client";

import Input from "@/components/form/input/InputField";


export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Password Reset
          </h1>
        </div>
          <form className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="E-mail"
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              The link to reset your password will be sent to you via email
            </p>
            <div className="mt-3 flex gap-3">
              <button
                type="submit"
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:opacity-50"
              >
                Reset Password
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}
