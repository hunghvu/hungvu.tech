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
      label: 'Choose a language. If choosing an incoorect one, delete the block and try again.'
        + ' This helps reinitialize the code block and linter.',
      required: true,
      options: ['abap', 'apex', 'azcii', 'bat',
        'bicep', 'cameligo', 'clojure', 'coffee',
        'cpp', 'csharp', 'csp', 'css',
        'cypher', 'dart', 'dockerfile', 'ecl',
        'elixir', 'flow9', 'freemaker2', 'fsharp',
        'go', 'graphql', 'handlebars', 'hcl',
        'html', 'java', 'ini', 'java',
        'javascript', 'julia', 'kotlin', 'less',
        'lexon', 'liquid', 'lua', 'm3',
        'markdown', 'mdx', 'mips', 'msdax',
        'mysql', 'objective-c', 'pascal', 'pascaligo',
        'perl', 'pgsql', 'php', 'pla',
        'postiats', 'powerquery', 'powershell', 'protobuf',
        'pug', 'python', 'qsharp', 'r',
        'redis', 'redshift', 'restructuredtext', 'ruby',
        'rust', 'sb', 'scala', 'scheme',
        'scss', 'shell', 'solidity', 'sophia',
        'sql', 'st', 'swift', 'systemverilog',
        'tcl', 'test', 'twig', 'typescript',
        'vb', 'wgsl', 'xml', 'yaml']
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
