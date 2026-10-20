import LandingPage, { toolMetadata } from "@/components/LandingPage";

export const metadata = toolMetadata("profile");

export default function ProfilePage() {
  return <LandingPage tool="profile" />;
}
