import React from 'react'
import { VSCodeTextField } from '@vscode/webview-ui-toolkit/react';
import AnswerRender from './AnswerRender.jsx';

const ConceptTemplate = ({ questionData }) => {
    return (
        <div className='flex flex-col items-center w-full'>
            <VSCodeTextField value={questionData.data.value.question} readOnly className='text-2xl w-full' />
            <AnswerRender content={questionData.data.value.answer} />
        </div>
    )
}

export default ConceptTemplate