import LandingPage, { toolMetadata } from "@/components/LandingPage";

export const metadata = toolMetadata("story");

export default function StoryPage() {
  return <LandingPage tool="story" />;
}
