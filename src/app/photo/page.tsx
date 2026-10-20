import LandingPage, { toolMetadata } from "@/components/LandingPage";

export const metadata = toolMetadata("photo");

export default function PhotoPage() {
  return <LandingPage tool="photo" />;
}
