import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProClubsHQ",
  description: "Live EA FC Pro Clubs stats, leaderboards, and comparisons.",
  icons: {
    icon: "/proclubshq-logo.png",
    apple: "/proclubshq-logo.png",
  },
  openGraph: {
    title: "ProClubsHQ",
    description: "Live EA FC Pro Clubs stats, leaderboards, and comparisons.",
    images: ["/proclubshq-logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
try {
  var theme = localStorage.getItem("proclubshq-theme");
  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  document.documentElement.classList.add(theme);
  document.documentElement.style.colorScheme = theme;
} catch (_) {
  document.documentElement.classList.add("dark");
}
            `.trim(),
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
