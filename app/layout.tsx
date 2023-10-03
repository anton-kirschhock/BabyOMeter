import "./globals.css";

import NavBar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { Providers } from "./providers";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <Providers>
            <section className="flex">
              <Sidebar />
              <NavBar>{children}</NavBar>
            </section>
          </Providers>
        </main>
      </body>
    </html>
  );
}
