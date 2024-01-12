import { VSCodeTextArea } from '@vscode/webview-ui-toolkit/react/index.js'
import React from 'react'
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'https://esm.sh/remark-gfm@4'
const AnswerRender = ({ content }) => {
    return (
        <div className='w-full rounded bg-gray-900 text-white p-4 h-1/2 overflow-auto'>
            <ReactMarkdown
                className='w-fit markdown text-gray-300 bg-gray-900 px-12 py-4'
            >
                `\n
                ```js
                console.log("Hello World")
                ````
                `
            </ReactMarkdown>
        </div>
    )
}

export default AnswerRender