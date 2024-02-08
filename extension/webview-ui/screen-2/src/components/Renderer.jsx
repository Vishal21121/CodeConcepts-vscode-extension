import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const Renderer = ({ content, language }) => {
    return (
        <div className='w-full'>
            <SyntaxHighlighter
                children={String(content).replace(/\n$/, '')}
                style={dracula}
                language={language.toLowerCase()}
                customStyle={{
                    padding: "25px",
                    margin: "0px"
                }}
                wrapLongLines="true"
            />
        </div>
    )
}

export default Renderer