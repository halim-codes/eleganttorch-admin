"use client";
import { useLocale } from "@/context/LocaleContext";

export const BlogComponent = () => {
  const { messages } = useLocale();
  return (
        <>
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                {messages["nav_blog"] || "Blog"}
            </h3>
        </>
  );
};
