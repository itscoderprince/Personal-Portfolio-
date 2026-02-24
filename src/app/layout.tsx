import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik, Roboto_Mono } from "next/font/google"; // Added Rubik, Roboto_Mono
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Er. Prince Sharma | MERN Stack Developer",
  description:
    "Portfolio of Er. Prince Sharma, a MERN Stack Developer creating modern, fast and scalable web applications for businesses.",
  icons: {
    icon: "https://res.cloudinary.com/dfsg5ylsb/image/upload/w_500,h_500,c_fill,r_max/v1771916315/Avatar_rmysea.webp",
  },
  openGraph: {
    title: "Er. Prince Sharma | MERN Stack Developer",
    description: "Portfolio of Er. Prince Sharma, a MERN Stack Developer creating modern, fast and scalable web applications.",
    url: "https://prince-portfolio.com", // Placeholder, user can update
    siteName: "Prince Sharma Portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/dfsg5ylsb/image/upload/w_1200,h_630,c_fill,r_max/v1771916315/Avatar_rmysea.webp", // Fallback to avatar if no dedicated og-image
        width: 1200,
        height: 630,
        alt: "Er. Prince Sharma",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Er. Prince Sharma | MERN Stack Developer",
    description: "Portfolio of Er. Prince Sharma, a MERN Stack Developer creating modern, fast and scalable web applications.",
    images: ["https://res.cloudinary.com/dfsg5ylsb/image/upload/w_1200,h_630,c_fill,r_max/v1771916315/Avatar_rmysea.webp"], // Fallback
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} ${robotoMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
