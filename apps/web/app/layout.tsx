import React from "react";

import RootProvider from "./RootProvider";

import "./global.css";
import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import "primeicons/primeicons.css";


export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="w-full h-full ">
      <RootProvider children />
    </html>
  );
}
