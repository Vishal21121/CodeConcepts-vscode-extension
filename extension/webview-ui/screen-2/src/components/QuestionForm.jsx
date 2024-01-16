import React from 'react'
import { VSCodeButton, VSCodeTextArea } from '@vscode/webview-ui-toolkit/react';

const QuestionForm = () => {
    return (
        <div className='w-full h-screen p-4'>
            <VSCodeTextArea placeholder="Question" rows={10} className='w-full' />
            <VSCodeTextArea placeholder="Answer" rows={10} className='w-full' />
            <VSCodeButton>Submit</VSCodeButton>
        </div>
    )
}

export default QuestionForm