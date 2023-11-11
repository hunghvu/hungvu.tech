'use client';

import { useRef } from 'react';

import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { geist } from '../fonts';

const ButtonCopy: React.FunctionComponent<{ language: string; codeSnippet: string }> = ({ language, codeSnippet }) => {
  const toast = useRef<Toast>(null);
  const showToastSuccess = () => {
    toast.current?.show({ severity: 'success', summary: 'Copied to clipboard', detail: `${language.charAt(0).toUpperCase() + language.slice(1)} code snippet copied to clipboard.` });
  }
  const showToastError = () => {
    toast.current?.show({ severity: 'error', summary: 'Failed to copy', detail: `${language.charAt(0).toUpperCase() + language.slice(1)} code snippet was not copied to clipboard.` });
  }
  return (
    <>
      <Toast ref={toast} />
      <Button
        aria-label={`Copy ${language} code snippet to clipboard.`}
        icon='pi pi-copy' iconPos='right' onClick={() => {
          try {
            navigator.clipboard.writeText(codeSnippet)
            showToastSuccess()
          } catch {
            showToastError()
          }
        }} className={geist.className} pt={{
          root: { className: 'bg-transparent hover:bg-dark-cyan-800 text-[#ffffffde] text-sm md:text-base lg:text-lg' },
        }} />
    </>

  )
}

export default ButtonCopy;