import Script from "next/script";

export const metadata = {
  title: "Bayside Academics - Premium Tutoring in Brighton, VIC",
  description: "Expert 1-on-1 tutoring for students from Prep to Year 12. VCAA-aligned curriculum support across all subjects. Based in Brighton, Victoria.",
  keywords: "tutoring, Brighton, VIC, VCAA, mathematics, english, VCE, Premier+, Bayside Academics",
};
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://baysideacademics.com.au/#organization",
  name: "Bayside Academics",
  url: "https://baysideacademics.com.au",
  logo: "https://baysideacademics.com.au/logo.png",
  email: "admin@baysideacademics.com.au",
  telephone: "+61 426 787 978",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5/240 Bay St",
    addressLocality: "Brighton",
    addressRegion: "VIC",
    postalCode: "3186",
    addressCountry: "AU",
  },
  subOrganization: {
    "@type": "Organization",
    "@id": "https://www.tuterly.com.au/#organization",
    name: "Tuterly",
    url: "https://www.tuterly.com.au",
    description: "Maths study app for Years 7 to 10, made by Bayside Academics.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-777828845" strategy="afterInteractive" />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'AW-777828845');`}
        </Script>
      </body>
    </html>
  );
}
