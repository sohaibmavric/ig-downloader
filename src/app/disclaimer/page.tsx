import LegalArticle, { legalMetadata } from "@/components/LegalArticle";

export const metadata = legalMetadata("/disclaimer");

export default function DisclaimerPage() {
  return <LegalArticle path="/disclaimer" />;
}
