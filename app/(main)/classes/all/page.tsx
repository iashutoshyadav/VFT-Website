import AllClassesContent from "@/components/AllClassesContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Classes | VFT — Vitality Fitness Tavistock",
  description: "Browse all fitness classes at VFT Tavistock — HIIT, Strength, Yoga, Boxing, Spin and more.",
};

export default function AllClassesPage() {
  return <AllClassesContent />;
}
