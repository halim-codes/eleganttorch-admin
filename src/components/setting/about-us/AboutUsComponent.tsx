"use client";
import { useLocale } from "@/context/LocaleContext";
import AboutUsInfoCard from "./AboutUsInfoCard";

export const AboutUsComponent = () => {
  const { messages } = useLocale();
  return (
        <>
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                {messages["nav_about_us"] || "About Us"}
            </h3>
            <AboutUsInfoCard />
        </>
  );
};
// الاساسي