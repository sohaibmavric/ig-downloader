import LandingPage, { toolMetadata } from "@/components/LandingPage";

export const metadata = toolMetadata("audio");

export default function AudioPage() {
  return <LandingPage tool="audio" />;
}
