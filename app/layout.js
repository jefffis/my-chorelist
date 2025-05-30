import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'My Chorelist: A simple way to stay on track, for you and your kiddos',
  description: 'A simple chore list app to help you stay organized',
  openGraph: {
    title: 'My ChoreList: A simple way to stay on track, for you and your kiddos',
    description: 'Track your daily and weekly chores, free. No accounts, 100% private.',
    images: ['/images/social-image.png']
  },
  icons: {
    icon: '/images/logo--holder.png',
    apple: '/images/logo--holder.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
