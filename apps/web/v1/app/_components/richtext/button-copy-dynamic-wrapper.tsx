/**
 * Author: Hung Vu
 *
 * Dynamically import ButtonCopy component to reduce first load JS size by about 30 kB.
 * This is a button to copy code snippet, so it does not have any SEO impact.
 * Code splitting only works when the dynamic import happens inside a "use client" component.
 * Therefore, this exists as a wrapper component.
 *
 * Besides, Toast uses ref, which is not exposed via dynamic import, even with useForwardRef.
 * Because Toast is wrapped inside "button-copy", ref can be used normally, and code splitting works
 * thanks to the wrapper layer, which is this file.
 *
 * Reference: https://github.com/vercel/next.js/issues/49454
 */

'use client';
import dynamic from 'next/dynamic';
import type { ButtonCopyProps } from './button-copy.tsx';

const ButtonCopy = dynamic<ButtonCopyProps>(() => import('./button-copy.tsx') as any, { ssr: false });

export default ButtonCopy;
