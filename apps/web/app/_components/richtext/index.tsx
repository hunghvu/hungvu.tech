

/**
 * Author: Hung Vu
 *
 * Convert Lexical to HTML.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import escapeHTML from 'escape-html';
import hljs from 'highlight.js';
import { geistMono } from '../fonts';
import { IS_BOLD, IS_ITALIC, IS_STRIKETHROUGH, IS_UNDERLINE, IS_CODE, IS_SUBSCRIPT, IS_SUPERSCRIPT } from './format';
import type { SerializedLexicalNode } from './types';
import ButtonCopy from './button-copy';

/* eslint-disable -- Following reference implementation*/
interface RichTextProps {
  nodes: SerializedLexicalNode[];
}

export const RichText = ({ nodes }: RichTextProps): JSX.Element => {
  return (
    <>
      {nodes.map((node, index): JSX.Element | null | undefined => {
        if (node.type === 'text') {
          let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} key={index} className='leading-10'/>;
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
              <code className={`${geistMono.className} p-1 bg-dark-cyan-800/80 rounded-md`} key={index}>
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
              <p className='text-sm md:text-base lg:text-lg' key={index}>
                {serializedChildren}
              </p>
            );
          }
          case 'heading': {
            if (node.tag === 'h2') {
              return (
                <h2 className='text-xl md:text-2xl font-bold' key={index}>
                  {serializedChildren}
                </h2>
              );
            } else if (node.tag === 'h3') {
              return (
                <h3 className='text-lg md:text-xl font-semibold' key={index}>
                  {serializedChildren}
                </h3>
              );
            }
            break
          }
          case 'list': {
            if (node.tag === 'ol') {
              return (
                <ol className='pl-4 pt-2 list-decimal text-sm md:text-base lg:text-lg' key={index}>
                  {serializedChildren}
                </ol>
              );
            } else if (node.tag === 'ul') {
              // Customized CSS counter makes <ol> becomes list-inside, so only need to specify list-inside for <ul>
              return (
                <ul className='pl-4 pt-2 list-disc list-inside text-sm md:text-base lg:text-lg' key={index}>
                  {serializedChildren}
                </ul>
              );
            }
            break
          }
          case 'listitem': {
            return (
              // Because 'ul' and 'ol' are children of 'li' in nested list, so we need to make it invisible and not count the number
              // to not affect the layout and order of the list
              <li className={`${['ul', 'ol'].includes(serializedChildren?.props?.children[0].type) ? 'invisible flex': 'visible'}`} key={index} value={node.value}>
                <span className='pl-4'>
                  {serializedChildren}
                </span>
              </li>
            );
          }
          case 'quote': {
            return (
              <blockquote
                className='text-sm md:text-base lg:text-lg p-4 my-4 border-l-4 border-dark-cyan-600 bg-dark-cyan-900/80 rounded-md italic'
                key={index}
              >
                {serializedChildren}
              </blockquote>
            );
          }
          case 'link':
          case 'autolink': {
            if (node.fields.linkType === 'custom') {
              return (
                <Link
                  className='text-sm md:text-base lg:text-lg text-[#b9c3ff] underline underline-offset-4 decoration-2 font-semibold hover:decoration-4'
                  href={node.fields.url ?? '/'}
                  key={index}
                  prefetch={false}
                  rel='nofollow noopener noreferrer'
                  target={node.fields.newTab ? '_blank' : undefined}
                >
                  {serializedChildren}
                </Link>
              );
            }
            return (
              <Link
                className='text-sm md:text-base lg:text-lg text-[#9fa8da] underline underline-offset-4 decoration-2 font-semibold hover:decoration-4'
                href={node.fields.doc.value.settings.slug ?? '/'}
                key={index}
                rel='dofollow'
                target={node.newTab ? 'target="_blank"' : undefined}
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
                  />
                  <figcaption className='text-sm md:text-base lg:text-lg p-2 rounded-md italic text-[#ffffffde]/70'>{altText ?? ''}</figcaption>
                </figure>
              );
            } else if (mimeType?.startsWith('video')) {
              return (
                <figure className='flex flex-col justify-center items-center' key={index}>
                  <video className='rounded-md' controls itemType={mimeType} key={index} src={node.value.url} />
                  <figcaption className='text-sm md:text-base lg:text-lg p-2 rounded-md italic text-[#ffffffde]/70'>{altText ?? ''}</figcaption>
                </figure>
              );
            }
            break
          }
          case 'block': {
            if (node.fields.data.blockType === 'code-editor') {
              return (
                <div
                  className={`${geistMono.className} text-sm md:text-base lg:text-lg whitespace-pre-wrap bg-dark-cyan-900/80 rounded-md p-4`}
                  key={index}
                >
                  <div className='flex flex-row justify-end items-center pb-4'>
                    <ButtonCopy codeSnippet={node.fields.data.codeSnippet} language={node.fields.data.language} />
                  </div>
                  <code
                    dangerouslySetInnerHTML={{
                      __html: hljs.highlight(node.fields.data.codeSnippet, { language: node.fields.data.language }).value,
                    }}
                  />
                </div>
              );
            }
            break
          }
          default:
            return null;
        }
      })}
    </>
  );
};
