import React from "react";
import Navbar from "./_components/navbar";

import "./global.css";
import { intelOneMono } from "./_components/fonts";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="w-full h-full ">
      <body className={`${intelOneMono.className} w-full h-full bg-light-orange-200 dark:bg-dark-cyan-900`}>
        <Navbar />
        <main className="flex flex-col gap-16">{children}</main>
      </body>
    </html>
  );
}
