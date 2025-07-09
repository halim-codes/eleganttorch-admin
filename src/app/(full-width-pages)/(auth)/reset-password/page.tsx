import ResetPasswordPage from "@/components/auth/ResetPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "elegantTorch Admin - Dashboard",
  description: "ElegantTorch Admin Dashboard",
};

export default function SignIn() {
  return <ResetPasswordPage />;
}
