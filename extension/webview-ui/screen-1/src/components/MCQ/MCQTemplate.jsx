import React, { useRef } from 'react'
import { VSCodeButton, VSCodeRadio, VSCodeRadioGroup, VSCodeTextField } from '@vscode/webview-ui-toolkit/react';
import QuestionTitle from './QuestionTitle.jsx'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use';

const MCQTemplate = ({ questionData, isExplosion, isCorrect, handleClick }) => {
    const { width, height } = useWindowSize()
    const optionRef = useRef(null)

    return (
        <div className='flex flex-col'>
            <VSCodeTextField value="What is the output of the below code" readOnly className='text-2xl' />
            <QuestionTitle content={questionData.data.value.question} questionType={questionData.data.value.questionType} language={questionData.data.value.language} />
            <div>
                <VSCodeRadioGroup orientation='vertical' ref={optionRef}>
                    {
                        questionData.data.value.options.map((el) => {
                            return <VSCodeRadio value={el}>{el}</VSCodeRadio>
                        })
                    }
                </VSCodeRadioGroup>
                <VSCodeButton appearance='primary' className='w-fit' onClick={() => handleClick(optionRef.current.value)}>Submit</VSCodeButton>
            </div>
            {
                questionData.data.value.questionType === "mcq" && isExplosion && (
                    <div className='flex mt-2'>
                        <Confetti
                            width={width || 300}
                            height={height || 300}
                            gravity={0.3}
                            pieces={300}
                        />
                        <div className="bg-green-500 text-white w-full p-2 rounded font-semibold text-base text-center">Congrats for the correct answer</div>
                    </div>
                )

            }
            {
                isCorrect === false && <div className="bg-red-500 text-white w-full p-2 rounded font-semibold text-base mt-2 text-center">Bhai thoda padh le</div>
            }
        </div>
    )
}

export default MCQTemplate