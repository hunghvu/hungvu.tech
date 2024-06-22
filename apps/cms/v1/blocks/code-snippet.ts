/**
 * Author: Hung Vu
 * 
 * This block represents a code snippet to be used
 * inside a Lexical Editor.
 */

import { useFormFields } from 'payload/components/forms'
import type { Block } from 'payload/types';
import CodeField from 'payload/dist/admin/components/forms/field-types/Code'
import { createElement } from 'react'

const CodeEditor: Block = {
  slug: 'code-editor',
  fields: [
    {
      name: 'language',
      type: 'select',
      label: 'Choose a language. If choosing an incorrect one, delete the block and try again.'
        + ' This helps reinitialize the code block and linter.',
      required: true,
      options: ['css', 'dockerfile',
        // highlight.js does not support html
        // but we can still use html in monaco editor to highlight syntax
        // highlight.js probably will just not highlight, and not break anything
        'html', 'javascript', 'markdown',
        'pgsql', 'python', 'sql',
        'typescript', 'xml', 'yaml']
    },
    {
      name: 'codeSnippet',
      type: 'code',
      required: true,
      admin: {
        components: {
          Field() {
            const language = useFormFields(
              ([fields]) => fields.language
            )
            const value = language.value
            if (value === undefined) return null
            return createElement(CodeField, {
              admin: {
                language: value,
              },
              name: 'codeSnippet',
              path: 'codeSnippet',
            })
          },
        },
      },
    },
  ],
}

export default CodeEditor
