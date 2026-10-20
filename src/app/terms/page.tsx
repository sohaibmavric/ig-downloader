import LegalArticle, { legalMetadata } from "@/components/LegalArticle";

export const metadata = legalMetadata("/terms");

export default function TermsPage() {
  return <LegalArticle path="/terms" />;
}
