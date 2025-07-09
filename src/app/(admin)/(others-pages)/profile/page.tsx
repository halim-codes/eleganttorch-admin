import ProfilePage from "@/components/user-profile/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "elegantTorch Admin - Dashboard",
  description: "ElegantTorch Admin Dashboard",
};
export default function Profile() {
  return (
    <>
      <ProfilePage />
    </>
  );
}
