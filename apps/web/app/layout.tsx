import React from "react";
import { intelOneMono } from "./_components/fonts";
import RootProvider from "./RootProvider";
import "primereact/resources/themes/tailwind-light/theme.css"
import "./global.css";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="w-full h-full ">
      <RootProvider font={intelOneMono} children />
    </html>
  );
}
