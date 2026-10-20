import LegalArticle, { legalMetadata } from "@/components/LegalArticle";

export const metadata = legalMetadata("/privacy-policy");

export default function PrivacyPolicyPage() {
  return <LegalArticle path="/privacy-policy" />;
}
