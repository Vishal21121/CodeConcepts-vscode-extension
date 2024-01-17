import React from 'react'
import { VSCodeButton, VSCodeTextArea } from '@vscode/webview-ui-toolkit/react';
import { useRef } from 'react';

const QuestionForm = () => {
    const questionRef = useRef(null)
    const answerRef = useRef(null)
    const vscode = acquireVsCodeApi();
    const handleClick = () => {
        const val = vscode.postMessage({
            command: "save question",
            data: {
                question: questionRef.current.value,
                answer: answerRef.current.value
            }
        })
        console.log({ val })
    }

    return (
        <div className='w-full h-screen p-4'>
            <VSCodeTextArea ref={questionRef} placeholder="Question" rows={10} className='w-full' />
            <VSCodeTextArea ref={answerRef} placeholder="Answer" rows={10} className='w-full' />
            <VSCodeButton onClick={handleClick}>Submit</VSCodeButton>
        </div>
    )
}

export default QuestionForm