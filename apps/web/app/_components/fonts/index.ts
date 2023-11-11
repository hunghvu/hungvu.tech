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

export const geistMono = localfont({
  src: "./GeistMonoVariableVF.woff2"
});

export const geist = localfont({
  src: "./GeistVariableVF.woff2"
});
