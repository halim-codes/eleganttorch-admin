import type { Metadata } from "next";
import { AddUsersComponent } from "@/components/users/add-users/AddUsersComponent";

export const metadata: Metadata = {
  title: "elegantTorch Admin - Dashboard",
  description: "ElegantTorch Admin Dashboard",
};

export default function AddUsers() {
  return (
    <>
        <AddUsersComponent/>
    </>
  );
}
