import { CallUsComponent } from "@/components/setting/call-us/CallUsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "elegantTorch Admin - Call Us",
  description: "ElegantTorch Admin Call Us Page",
};
export default function CallUs() {
  return (
    <>
      <CallUsComponent />
    </>
  );
}
