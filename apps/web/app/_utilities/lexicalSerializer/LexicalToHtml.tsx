/**
 * @author Hung Vu
 * 
 * Convert Lexical to HTML.
 */

import React, { Fragment } from 'react';

import escapeHTML from 'escape-html';

import {
  IS_BOLD,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_UNDERLINE,
  IS_CODE,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
} from './RichTextNodeFormat';

import type { SerializedLexicalNode } from './types';
import Link from 'next/link';

type Props = {
  nodes: SerializedLexicalNode[];
}

export function LexicalToHtml({ nodes }: Props): JSX.Element {
  return (
    <Fragment>
      {nodes?.map((node, index): JSX.Element | null => {
        if (node.type === 'text') {
          let text = (
            <span key={index} dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
          );
          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>;
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>;
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = <s key={index}>{text}</s>
          }
          if (node.format & IS_UNDERLINE) {
            text = <u key={index}>{text}</u>
          }
          if (node.format & IS_CODE) {
            text = <code key={index} className="p-1 bg-dark-cyan-800 rounded-lg">{text}</code>;
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>;
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>;
          }

          return text;
        }

        if (!node) {
          return null;
        }

        const serializedChildrenFn = (node: SerializedLexicalNode): JSX.Element | null => {
          if (node.children === null || node.children === undefined) {
            return null;
          } else {
            return LexicalToHtml({ nodes: node.children });
          }
        };

        const serializedChildren = serializedChildrenFn(node);
        switch (node.type) {
          case 'paragraph': {
            return <p key={index} className='sm:text-sm md:text-base lg:text-lg'>{serializedChildren}</p>;
          }
          case 'heading': {
            if (node?.tag === 'h1') {
              return <h1 key={index} className='text-2xl md::text-3xl font-extrabold'>{serializedChildren}</h1>;
            } else if (node?.tag === 'h2') {
              return <h2 key={index} className='text-xl md::text-2xl font-bold'>{serializedChildren}</h2>;
            } else if (node?.tag === 'h3') {
              return <h3 key={index} className='text-lg md::text-xl font-semibold'>{serializedChildren}</h3>;
            }
          }
          case 'list': {
            if (node?.tag === 'ol') {
              return <ol key={index} className="pl-4 pt-2 list-decimal list-outside sm:text-sm md:text-base lg:text-lg">{serializedChildren}</ol>
            } else if (node?.tag === 'ul') {
              return <ul key={index} className="pl-4 pt-2 list-disc list-outside sm:text-sm md:text-base lg:text-lg">{serializedChildren}</ul>
            }
          }
          case 'listitem': {
            return <li key={index} value={node?.value} className="pb-2">{serializedChildren}</li>
          }
          case 'quote': {
            return <blockquote key={index} className='sm:text-sm md:text-base lg:text-lg p-4 my-4 border-l-4 border-dark-cyan-600 bg-dark-cyan-800/50 rounded-sm italic'>{serializedChildren}</blockquote>;
          }
          case 'link':
          case 'autolink': {
            if (node.fields.linkType === 'custom') {
              return (
                <Link
                  key={index}
                  href={node.fields.url ?? '/'}
                  target={node.fields.newTab ? '_blank' : undefined}
                  rel='nofollow noopener noreferrer'
                  prefetch={false}
                  className='sm:text-sm md:text-base lg:text-lg text-[#9fa8da] underline underline-offset-4 decoration-2 font-semibold hover:decoration-4'
                >
                  {serializedChildren}
                </Link>
              );
            } else {
              return (
                <Link
                  key={index}
                  href={node.fields.doc.value.settings.urlSlug ?? '/'}
                  target={node.newTab ? 'target="_blank"' : undefined}
                  rel='dofollow'
                  className='sm:text-sm md:text-base lg:text-lg text-[#9fa8da] underline underline-offset-4 decoration-2 font-semibold hover:decoration-4'
                >
                  {serializedChildren}
                </Link>
              )
            }
          }
          default:
            return null;
        }
      })}
    </Fragment>
  );
}