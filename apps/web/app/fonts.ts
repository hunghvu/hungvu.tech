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
import localfont from "next/font/local"

// Generally used for buttons
export const fredoka = localfont({
  src: "../public/fonts/Fredoka-Variable.ttf"
})

// Generally used for paragraphs
export const interTight = localfont({
  src: "../public/fonts/InterTight-Variable.ttf"
})

export const interTightItalic = localfont({
  src: "../public/fonts/InterTight-Italic-Variable.ttf"
})

// Generally used for titles
export const robotoSerif = localfont({
  src: "../public/fonts/RobotoSerif-Variable.ttf"
})

export const robotoSerifItalic = localfont({
  src: "../public/fonts/RobotoSerif-Italic-Variable.ttf"
})