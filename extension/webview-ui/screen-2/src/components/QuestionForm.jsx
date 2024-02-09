import React from 'react'
import { VSCodeButton, VSCodeTextArea, VSCodeTextField } from '@vscode/webview-ui-toolkit/react';

const QuestionForm = ({ vscode, data, setData, updateMode }) => {

    const handleClick = () => {
        if (updateMode) {
            console.log(data.id, data.question, data.answer, data.language)
            return vscode.postMessage({
                command: "update question",
                data: {
                    language: data.language,
                    question: data.question,
                    answer: data.answer,
                    id: data.id
                }
            })
        }
        const val = vscode.postMessage({
            command: "save question",
            data: {
                language: data.language,
                question: data.question,
                answer: data.answer
            }
        })
        console.log({ val })
    }

    return (
        <div className='w-full h-screen p-4'>
            <VSCodeTextField onChange={(e) => setData({ ...data, language: e.target.value })} value={data.language} placeholder="Language" className='w-full' />
            <VSCodeTextArea onChange={(e) => setData({ ...data, question: e.target.value })} value={data.question} placeholder="Question" rows={10} className='w-full' />
            <VSCodeTextArea onChange={(e) => setData({ ...data, answer: e.target.value })} value={data.answer} placeholder="Answer" rows={10} className='w-full' />
            <VSCodeButton onClick={handleClick}>Submit</VSCodeButton>
        </div>
    )
}

export default QuestionForm