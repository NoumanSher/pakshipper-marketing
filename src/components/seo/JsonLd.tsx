import { type SchemaOrgData } from "@/types/seo";

/**
 * JsonLd — injects structured data <script> tag server-side.
 * Supports any Schema.org type: SoftwareApplication, FAQPage, etc.
 */
export function JsonLd({ data }: { data: SchemaOrgData }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
