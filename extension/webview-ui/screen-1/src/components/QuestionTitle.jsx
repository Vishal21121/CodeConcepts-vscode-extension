import { VSCodeTextArea } from '@vscode/webview-ui-toolkit/react';
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const QuestionTitle = ({ content, questionType, language }) => {
    console.log(questionType)
    return (
        <>
            {
                questionType === "mcq" ? (
                    <SyntaxHighlighter
                        children={String(content).replace(/\n$/, '')}
                        style={dracula}
                        language={language}
                        customStyle={{
                            padding: "25px",
                            margin: "0px"
                        }}
                        wrapLongLines="true"
                    />
                ) : <VSCodeTextArea value={content} resize='false' readOnly rows={10} />
            }
        </>

    )

}

export default QuestionTitle