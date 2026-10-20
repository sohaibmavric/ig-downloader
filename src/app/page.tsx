import LandingPage, { toolMetadata } from "@/components/LandingPage";

export const metadata = toolMetadata("video");

export default function Home() {
  return <LandingPage tool="video" />;
}
