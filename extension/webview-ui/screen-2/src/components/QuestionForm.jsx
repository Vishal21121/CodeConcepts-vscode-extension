import React from 'react'
import { VSCodeButton, VSCodeTextArea, VSCodeTextField } from '@vscode/webview-ui-toolkit/react';
import { useRef } from 'react';

const QuestionForm = ({ vscode }) => {
    const questionRef = useRef(null)
    const answerRef = useRef(null)
    const languageRef = useRef(null)
    const handleClick = () => {
        const val = vscode.postMessage({
            command: "save question",
            data: {
                language: languageRef.current.value,
                question: questionRef.current.value,
                answer: answerRef.current.value
            }
        })
        console.log({ val })
    }

    return (
        <div className='w-full h-screen p-4'>
            <VSCodeTextField ref={languageRef} placeholder="Language" className='w-full' />
            <VSCodeTextArea ref={questionRef} placeholder="Question" rows={10} className='w-full' />
            <VSCodeTextArea ref={answerRef} placeholder="Answer" rows={10} className='w-full' />
            <VSCodeButton onClick={handleClick}>Submit</VSCodeButton>
        </div>
    )
}

export default QuestionForm