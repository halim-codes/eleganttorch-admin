import { ProjectsComponent } from "@/components/projects/ProjectsComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "elegantTorch Admin - Projects",
  description: "ElegantTorch Admin Projects Page",
};

export default function Projects() {
  return (
    <>
        <ProjectsComponent />
    </>
  );
}
