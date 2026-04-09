export const metadata = {
  title: "Bayside Academics - Premium Tutoring in Brighton, VIC",
  description: "Expert 1-on-1 tutoring for students from Prep to Year 12. VCAA-aligned curriculum support across all subjects. Based in Brighton, Victoria.",
  keywords: "tutoring, Brighton, VIC, VCAA, mathematics, english, VCE, Premier+, Bayside Academics",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
