import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dojo Helpdesk",
  description: "Net Ninja Next.js 13 Dojo Helpdesk Tutorial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>
    </html>
  );
}
