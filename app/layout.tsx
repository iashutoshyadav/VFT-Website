import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vitality Fitness Tavistock | Tavistock's #1 Gym — 24/7 Access, Unlimited Sauna & Classes",
  description: "Join Vitality Fitness Tavistock — Tavistock's biggest, fully equipped gym. 24/7 access, unlimited sauna, group classes & bespoke members app all in one membership. NOW OPEN!",
  keywords: "gym Tavistock, fitness centre Tavistock, 24 hour gym Devon, personal trainer Tavistock, gym classes Tavistock, sauna gym Devon",
  openGraph: {
    title: "Vitality Fitness Tavistock | Tavistock's #1 Gym",
    description: "Get ready for Tavistock's biggest, fully equipped GYM. 24/7 access, unlimited sauna, classes & app — all in one membership!",
    url: "https://vitalityfitnesstavistock.com",
    siteName: "Vitality Fitness Tavistock",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitality Fitness Tavistock | Tavistock's #1 Gym",
    description: "24/7 Gym Access + Unlimited Sauna + Classes + App — All in One Membership. Join Now!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
