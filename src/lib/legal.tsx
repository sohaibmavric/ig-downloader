import type { ReactNode } from "react";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "./site";

export type LegalPage = {
  path: string;
  /** Footer label. */
  label: string;
  title: string;
  description: string;
  updated: string;
  sections: { heading: string; body: ReactNode }[];
};

const mail = (
  <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-accent hover:underline">
    {CONTACT_EMAIL}
  </a>
);

const UPDATED = "2026-10-20";

export const LEGAL_PAGES: LegalPage[] = [
  {
    path: "/privacy-policy",
    label: "Privacy Policy",
    title: "Privacy Policy",
    description: `How ${SITE_NAME} handles data when you use the site.`,
    updated: UPDATED,
    sections: [
      { heading: "Summary", body: <p>{SITE_NAME} doesn&apos;t require an account, doesn&apos;t ask for your Instagram login, and doesn&apos;t store the media you download. We use Google Analytics to understand how the site is used.</p> },
      { heading: "Links you paste", body: <p>When you paste a link, it is sent to our server so we can look up the media on Instagram. We don&apos;t keep a record of the links you submit or tie them to you. Results may be cached in memory for a few minutes to reduce load, and are then discarded.</p> },
      { heading: "Downloaded media", body: <p>Photos, videos and audio are streamed from Instagram&apos;s servers through ours directly to your browser. Nothing is saved on our servers. MP3 conversion happens on the fly while the file downloads.</p> },
      { heading: "Analytics and cookies", body: <p>We use Google Analytics 4, which sets cookies to count visits and measure how features are used (for example, whether a download succeeded). We do not send the links you paste, Instagram usernames or post IDs to Google Analytics. You can block analytics cookies in your browser settings or with a browser extension; the site keeps working without them. Google&apos;s own use of this data is covered by Google&apos;s privacy policy.</p> },
      { heading: "Server logs", body: <p>Our hosting provider (Vercel) keeps short-lived technical logs, such as IP addresses and request times, to operate and protect the service. These logs are retained for a limited time and are not used to identify you.</p> },
      { heading: "Children", body: <p>{SITE_NAME} is not directed at children under 13, and we do not knowingly collect personal information from them.</p> },
      { heading: "Changes and contact", body: <p>We may update this policy as the service changes; the date at the top shows the latest revision. Questions about privacy can be sent to {mail}.</p> },
    ],
  },
  {
    path: "/terms",
    label: "Terms of Use",
    title: "Terms of Use",
    description: `The rules for using ${SITE_NAME}.`,
    updated: UPDATED,
    sections: [
      { heading: "Acceptance", body: <p>By using {SITE_NAME} at {SITE_URL}, you agree to these terms. If you don&apos;t agree, please don&apos;t use the service.</p> },
      { heading: "What the service does", body: <p>{SITE_NAME} lets you save publicly available Instagram content for personal, non-commercial use. It does not provide access to private accounts and is not affiliated with Instagram or Meta.</p> },
      { heading: "Your responsibilities", body: <ul className="list-disc space-y-2 pl-6"><li>Only download content you own or have permission to use.</li><li>Respect creators&apos; copyright and Instagram&apos;s terms; don&apos;t re-upload others&apos; content as your own.</li><li>Don&apos;t use the service for harassment, impersonation or any unlawful purpose.</li><li>Don&apos;t send automated or excessive requests, or attempt to disrupt the service.</li></ul> },
      { heading: "Intellectual property", body: <p>Content you download remains the property of its creators. The {SITE_NAME} name, design and code belong to us.</p> },
      { heading: "No warranty", body: <p>The service is provided &quot;as is&quot;, without guarantees of availability or results. Instagram may change or limit access at any time, which can stop some downloads from working.</p> },
      { heading: "Limitation of liability", body: <p>To the extent permitted by law, we are not liable for any damages arising from your use of the service or of content you download with it.</p> },
      { heading: "Changes and contact", body: <p>We may update these terms; continued use after changes means you accept them. Contact us at {mail}.</p> },
    ],
  },
  {
    path: "/disclaimer",
    label: "Disclaimer",
    title: "Disclaimer",
    description: `${SITE_NAME} is an independent tool and is not affiliated with Instagram or Meta.`,
    updated: UPDATED,
    sections: [
      { heading: "No affiliation", body: <p>{SITE_NAME} is an independent service. It is not affiliated with, endorsed by, or sponsored by Instagram, Meta Platforms, Inc., or any of their subsidiaries. &quot;Instagram&quot; is a trademark of Meta Platforms, Inc.</p> },
      { heading: "Public content only", body: <p>{SITE_NAME} only retrieves content that Instagram makes publicly visible. We do not host any of the media shown; it is streamed from Instagram&apos;s servers when you request it.</p> },
      { heading: "Your use of content", body: <p>You are responsible for how you use downloaded content. Downloading for personal viewing is different from republishing; always get permission from the creator before reusing their work.</p> },
      { heading: "Accuracy", body: <p>Guides on this site are provided for general information. Instagram changes its apps frequently, so steps may differ slightly on your device.</p> },
    ],
  },
  {
    path: "/dmca",
    label: "DMCA",
    title: "DMCA & Copyright",
    description: `How to report copyright concerns to ${SITE_NAME}.`,
    updated: UPDATED,
    sections: [
      { heading: "Our approach", body: <p>{SITE_NAME} does not host media; files are fetched from Instagram on request. We still take copyright seriously and will respond to valid notices.</p> },
      { heading: "Removing content at the source", body: <p>The fastest way to stop a post from being available anywhere, including through {SITE_NAME}, is to have it removed or made private on Instagram. Instagram provides its own copyright reporting form for this.</p> },
      { heading: "Sending us a notice", body: <><p className="mb-3">If you believe {SITE_NAME} is being used to infringe your copyright, email {mail} with:</p><ul className="list-disc space-y-2 pl-6"><li>Your name and contact details.</li><li>A description of the copyrighted work.</li><li>The Instagram URL(s) of the content concerned.</li><li>A statement that you believe in good faith the use is not authorised by the owner, its agent or the law.</li><li>A statement, under penalty of perjury, that the information is accurate and you are the owner or authorised to act for the owner.</li><li>Your physical or electronic signature.</li></ul><p className="mt-3">We can block specific URLs from being processed by {SITE_NAME}.</p></> },
    ],
  },
  {
    path: "/contact",
    label: "Contact",
    title: "Contact Us",
    description: `Get in touch with the ${SITE_NAME} team.`,
    updated: UPDATED,
    sections: [
      { heading: "Email", body: <p>For questions, feedback, bug reports, partnership or copyright enquiries, email {mail}. We usually reply within a few working days.</p> },
      { heading: "Reporting a problem", body: <p>If a download isn&apos;t working, include the type of content (reel, post, story or profile), the device and browser you&apos;re using, and the error message you saw. Please don&apos;t send links to private content; we can&apos;t access it.</p> },
      { heading: "Copyright", body: <p>For copyright concerns, see our DMCA page for what to include in your notice.</p> },
    ],
  },
];
