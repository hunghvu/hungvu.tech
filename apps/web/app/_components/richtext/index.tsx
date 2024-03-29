/**
 * Author: Hung Vu
 *
 * Convert Lexical to HTML.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import escapeHTML from 'escape-html';
// Highlight.js
// Does not support html and mysql
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typscript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import markdown from 'highlight.js/lib/languages/markdown';
import pgsql from 'highlight.js/lib/languages/pgsql';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';
import { geistMono } from '../fonts';
import ButtonCopy from './button-copy-dynamic-wrapper';
import { IS_BOLD, IS_ITALIC, IS_STRIKETHROUGH, IS_UNDERLINE, IS_CODE, IS_SUBSCRIPT, IS_SUPERSCRIPT } from './format';
import type { SerializedLexicalNode } from './types';
import 'highlight.js/styles/a11y-dark.min.css';

/* eslint-disable -- Following reference implementation*/
interface RichTextProps {
  nodes: SerializedLexicalNode[];
}

export const RichText = ({ nodes }: RichTextProps): JSX.Element => {
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('typescript', typscript);
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('dockerfile', dockerfile);
  hljs.registerLanguage('markdown', markdown);
  hljs.registerLanguage('pgsql', pgsql);
  hljs.registerLanguage('python', python);
  hljs.registerLanguage('sql', sql);
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('yaml', yaml);
  return (
    <>
      {nodes.map((node, index): JSX.Element | null | undefined => {
        if (node.type === 'text') {
          let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} key={index} className='leading-10' />;
          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>;
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>;
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = <s key={index}>{text}</s>;
          }
          if (node.format & IS_UNDERLINE) {
            text = <u key={index}>{text}</u>;
          }
          if (node.format & IS_CODE) {
            text = (
              <code className={`${geistMono.className} p-1 bg-emerald-950/80 rounded-md`} key={index}>
                {text}
              </code>
            );
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
          }
          return RichText({ nodes: node.children });
        };

        const serializedChildren = serializedChildrenFn(node);
        switch (node.type) {
          case 'paragraph': {
            return (
              <p className='text-base md:text-lg' key={index}>
                {serializedChildren}
              </p>
            );
          }
          case 'heading': {
            if (node.tag === 'h2') {
              return (
                <h2 className='text-2xl md:text-3xl font-bold' key={index}>
                  {serializedChildren}
                </h2>
              );
            } else if (node.tag === 'h3') {
              return (
                <h3 className='text-xl md:text-2xl font-semibold' key={index}>
                  {serializedChildren}
                </h3>
              );
            }
            break;
          }
          case 'list': {
            if (node.tag === 'ol') {
              return (
                <ol className='pl-4 pt-2 text-base md:text-lg' key={index}>
                  {serializedChildren}
                </ol>
              );
            } else if (node.tag === 'ul') {
              // Customized CSS counter makes <ol> becomes list-inside, so only need to specify list-inside for <ul>
              return (
                <ul className='pl-4 pt-2 list-disc list-inside text-base md:text-lg' key={index}>
                  {serializedChildren}
                </ul>
              );
            }
            break;
          }
          case 'listitem': {
            return (
              // Because 'ul' and 'ol' are children of 'li' in nested list, so we need to make it invisible and not count the number
              // to not affect the layout and order of the list
              <li
                className={`${['ul', 'ol'].includes(serializedChildren?.props?.children[0].type) ? 'invisible flex' : 'visible'}`}
                key={index}
                value={node.value}
              >
                <span className='pl-4'>{serializedChildren}</span>
              </li>
            );
          }
          case 'quote': {
            return (
              <blockquote className='text-base md:text-lg p-4 my-4 border-l-4 border-emerald-600 bg-emerald-950/80 rounded-md italic' key={index}>
                {serializedChildren}
              </blockquote>
            );
          }
          case 'link':
          case 'autolink': {
            if (node.fields.linkType === 'custom') {
              return (
                <Link
                  className='text-base md:text-lg text-sky-200 underline underline-offset-4 decoration-2 font-semibold hover:decoration-4'
                  href={node.fields.url ?? '/'}
                  key={index}
                  prefetch={node.fields.url.includes('hungvu.tech')}
                  rel={node.fields.url.includes('hungvu.tech') ? undefined : 'nofollow noopener noreferrer'}
                  target={node.fields.newTab ? '_blank' : undefined}
                >
                  {serializedChildren}
                </Link>
              );
            }
            return (
              <Link
                className='text-base md:text-lg text-sky-200 underline underline-offset-4 decoration-2 font-semibold hover:decoration-4'
                href={node.fields.doc.value.settings.slug ?? '/'}
                key={index}
                target={node.newTab ? '_blank' : undefined}
              >
                {serializedChildren}
              </Link>
            );
          }
          case 'upload': {
            const mimeType = node.value.mimeType;
            const altText = node.value.alt;
            if (mimeType?.startsWith('image')) {
              return (
                <figure className='flex flex-col justify-center items-center' key={index}>
                  <Image
                    alt={altText ?? ''}
                    className='rounded-md'
                    height={node.value.height}
                    key={index}
                    src={node.value.url}
                    width={node.value.width}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                  <figcaption className='text-base md:text-lg p-2 rounded-md italic'>{altText ?? ''}</figcaption>
                </figure>
              );
            } else if (mimeType?.startsWith('video')) {
              return (
                <figure className='flex flex-col justify-center items-center' key={index}>
                  <video className='rounded-md' controls itemType={mimeType} key={index} src={node.value.url} />
                  <figcaption className='text-base md:text-lg p-2 rounded-md italic'>{altText ?? ''}</figcaption>
                </figure>
              );
            }
            break;
          }
          case 'block': {
            if (node.fields.data.blockType === 'code-editor') {
              return (
                <div className='text-base md:text-lg whitespace-pre-wrap bg-emerald-950/80 rounded-md p-4' key={index}>
                  <div className='flex flex-row justify-end items-center pb-4'>
                    <ButtonCopy codeSnippet={node.fields.data.codeSnippet} language={node.fields.data.language} />
                  </div>
                  <code
                    className={`${geistMono.className}`}
                    dangerouslySetInnerHTML={{
                      __html: hljs.highlight(node.fields.data.codeSnippet, { language: node.fields.data.language }).value,
                    }}
                  />
                </div>
              );
            }
            break;
          }
          default:
            return null;
        }
      })}
    </>
  );
};
