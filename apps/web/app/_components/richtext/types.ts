/**
 * Author: Hung Vu
 *  
 * Types for lexical serializer.
 */

export interface SerializedLexicalEditorState {
  root: {
    type: string;
    format: string;
    indent: number;
    version: number;
    children: SerializedLexicalNode[];
  };
}

export interface SerializedLexicalNode {
  children?: SerializedLexicalNode[];
  direction: string;
  format: number;
  indent?: string | number;
  type: string;
  version: number;
  style?: string;
  mode?: string;
  text?: string;
  [other: string]: any;
}