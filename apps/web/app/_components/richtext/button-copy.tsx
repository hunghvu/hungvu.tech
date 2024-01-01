/**
 * Author: Hung Vu
 *
 * A button to copy code snippet to clipboard.
 */
'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export interface ButtonCopyProps {
  language: string;
  codeSnippet: string;
}

const ButtonCopy: React.FunctionComponent<ButtonCopyProps> = ({ language, codeSnippet }) => {
  const toast = useRef<any>(null);
  const showToastSuccess = (): void => {
    toast.current?.show({
      severity: 'success',
      summary: 'Copied to clipboard',
      detail: `${language.charAt(0).toUpperCase() + language.slice(1)} code snippet copied to clipboard.`,
    });
  };
  const showToastError = (): void => {
    toast.current?.show({
      severity: 'error',
      summary: 'Failed to copy',
      detail: `${language.charAt(0).toUpperCase() + language.slice(1)} code snippet was not copied to clipboard.`,
    });
  };
  return (
    <>
      {/* It seems the dark Lara theme has a weird border left (6px), causing a white space on toast content */}
      {/* Not sure if it is PrimeReact intention, or a bug, but anyway, just remove border left here */}
      <Toast position='bottom-center' pt={{ content: { className: 'border-l-0' } }} ref={toast} />
      <Button
        aria-label={`Copy ${language} code snippet to clipboard.`}
        icon={<Image alt={`Copy ${language} code snippet to clipboard.`} height={24} src='/copy.svg' width={24} />}
        iconPos='right'
        // eslint-disable-next-line @typescript-eslint/no-misused-promises -- This is intentional, not an error
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(codeSnippet);
            showToastSuccess();
          } catch {
            showToastError();
          }
        }}
        pt={{
          root: { className: 'bg-transparent hover:bg-dark-cyan-800 text-base md:text-lg' },
        }}
      />
    </>
  );
};

export default ButtonCopy;
