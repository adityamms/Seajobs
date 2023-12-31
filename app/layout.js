import Footbar from "@/components/Footbar";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import UserContext from "@/components/UserProvider";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="favicon-32x32-icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="favicon-16x16-icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body>
        {/* <SessionProvider> */}
        <UserContext>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footbar />
          </ThemeProvider>
        </UserContext>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
