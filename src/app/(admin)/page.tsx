import type { Metadata } from "next";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";


export const metadata: Metadata = {
  title: "elegantTorch Admin - Dashboard",
  description: "ElegantTorch Admin Dashboard",
};

export default function landing() {
  return (
    <DashboardMetrics/>
  );
}
