
/**
 * Author: Hung Vu
 * 
 * Lexical format code
 */

export const IS_BOLD = 1;
export const IS_ITALIC = 1 << 1;
export const IS_STRIKETHROUGH = 1 << 2;
export const IS_UNDERLINE = 1 << 3;
export const IS_CODE = 1 << 4;
export const IS_SUBSCRIPT = 1 << 5;
export const IS_SUPERSCRIPT = 1 << 6;

export const IS_ALL_FORMATTING =
  IS_BOLD |
  IS_ITALIC |
  IS_STRIKETHROUGH |
  IS_UNDERLINE |
  IS_CODE |
  IS_SUBSCRIPT |
  IS_SUPERSCRIPT


export const TEXT_TYPE_TO_FORMAT: Record<TextFormatType | string, number> = {
  bold: IS_BOLD,
  code: IS_CODE,
  italic: IS_ITALIC,
  strikethrough: IS_STRIKETHROUGH,
  subscript: IS_SUBSCRIPT,
  superscript: IS_SUPERSCRIPT,
  underline: IS_UNDERLINE,
};

export type TextFormatType =
  | 'bold'
  | 'underline'
  | 'strikethrough'
  | 'italic'
  | 'code'
  | 'subscript'
  | 'superscript';