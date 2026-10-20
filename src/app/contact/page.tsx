import LegalArticle, { legalMetadata } from "@/components/LegalArticle";

export const metadata = legalMetadata("/contact");

export default function ContactPage() {
  return <LegalArticle path="/contact" />;
}
