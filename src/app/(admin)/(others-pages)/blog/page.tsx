import { BlogComponent } from "@/components/blog/BlogComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "elegantTorch Admin - Blog",
  description: "ElegantTorch Admin Dashboard for managing blog posts",
};

export default function Blog() {
  return (
    <>
        <BlogComponent />
    </>
  );
}
