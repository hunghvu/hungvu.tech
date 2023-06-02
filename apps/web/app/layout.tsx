import React from "react";
import Navbar from "../components/shared/navbar";

import "./global.css";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="flex flex-col gap-16 bg-light-orange-200 dark:bg-dark-cyan-900">{children}</main>
      </body>
    </html>
  );
}
