import { AboutUsComponent } from "@/components/setting/about-us/AboutUsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "elegantTorch Admin - About Us",
  description: "ElegantTorch Admin About Us Page",
};
export default function AboutUs() {
  return (
    <>
      <AboutUsComponent />
    </>
  );
}
