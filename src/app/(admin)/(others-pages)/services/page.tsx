import { ServicesComponent } from "@/components/services/ServicesComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "elegantTorch Admin - Services",
  description: "ElegantTorch Admin Services Page",
};

export default function Services() {
  return (
    <>
        <ServicesComponent />
    </>
  );
}
