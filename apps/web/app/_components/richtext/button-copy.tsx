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
      life: 3000,
    });
  };
  const showToastError = (): void => {
    toast.current?.show({
      severity: 'error',
      summary: 'Failed to copy',
      detail: `${language.charAt(0).toUpperCase() + language.slice(1)} code snippet was not copied to clipboard.`,
      life: 3000,
    });
  };
  return (
    <>
      {/* This means there are multiple toasts in a page, which is not ideal, but is technically fine. */}
      <Toast position='bottom-center' ref={toast} />
      <Button
        aria-label={`Copy ${language} code snippet to clipboard.`}
        icon={
          <Image
            alt={`Copy ${language} code snippet to clipboard.`}
            height={24}
            src='/copy.svg'
            width={24}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        }
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
      />
    </>
  );
};

export default ButtonCopy;
