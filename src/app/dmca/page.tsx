import LegalArticle, { legalMetadata } from "@/components/LegalArticle";

export const metadata = legalMetadata("/dmca");

export default function DmcaPage() {
  return <LegalArticle path="/dmca" />;
}
