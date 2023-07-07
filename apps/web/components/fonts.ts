/**
 * @author Hung Vu
 *
 * This file provides local fonts to be used across the application
 *
 * General rules:
 * Section title: 32 px or equivalent
 * Section subtitle: 28 px or equivalent
 * H2, more emphasis: 24 px or equivalent
 * H3, less emphasis: 20 px or equivalent
 * Paragraph: 16 px or equivalent
 * Minor additonal (meta) details: 12 px or equivalent
 */
import localfont from "next/font/local";

export const intelOneMono = localfont({
  src: [
    {
      path: "../public/fonts/intelone-mono-font-family-bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/intelone-mono-font-family-bolditalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/intelone-mono-font-family-italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/intelone-mono-font-family-light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/intelone-mono-font-family-lightitalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/intelone-mono-font-family-medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/intelone-mono-font-family-mediumitalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/intelone-mono-font-family-regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});
