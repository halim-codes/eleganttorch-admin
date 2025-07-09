import type { Metadata } from "next";
import { OriginalUsersComponent } from "@/components/users/original-users/OriginalUsersComponent";

export const metadata: Metadata = {
  title: "elegantTorch Admin - Dashboard",
  description: "ElegantTorch Admin Dashboard",
};

export default function OriginalUsers() {
  return (
    <>
        <OriginalUsersComponent/>
    </>
  );
}
