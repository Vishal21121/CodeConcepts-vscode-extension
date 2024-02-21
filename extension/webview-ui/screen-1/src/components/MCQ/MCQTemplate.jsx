import React, { useRef } from 'react'
import { VSCodeButton, VSCodeRadio, VSCodeRadioGroup, VSCodeTextField } from '@vscode/webview-ui-toolkit/react';
import QuestionTitle from './QuestionTitle.jsx'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use';

const MCQTemplate = ({ questionData, isExplosion, isCorrect, handleClick, btnShow }) => {
    const { width, height } = useWindowSize()
    const optionRef = useRef(null)

    return (
        <div className='flex flex-col'>
            <VSCodeTextField value="What is the output of the below code" readOnly className='text-2xl' />
            <QuestionTitle content={questionData.question} questionType={questionData.questionType} language={questionData.language} />
            <div>
                <VSCodeRadioGroup orientation='vertical' ref={optionRef}>
                    {
                        questionData.options.map((el) => {
                            return <VSCodeRadio value={el}>{el}</VSCodeRadio>
                        })
                    }
                </VSCodeRadioGroup>
                {
                    btnShow && <VSCodeButton appearance='primary' className='w-fit' onClick={() => handleClick(optionRef.current.value)}>Submit</VSCodeButton>
                }
            </div>
            {
                questionData.questionType === "mcq" && isExplosion && (
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
                isCorrect === false && <div className='flex gap-2 flex-col my-2'>
                    <div className="bg-red-500 text-white w-full p-2 rounded font-semibold text-base mt-2 text-center">Bhai thoda padh le</div>
                    {
                        questionData.explanation ? <pre className="bg-gray-500 text-white w-full p-2 rounded text-sm text-left overflow-auto whitespace-pre-wrap">Explanation: {questionData.explanation}</pre> : <div className="bg-gray-500 text-white w-full p-2 rounded text-sm text-left">Answer: {questionData.answer}</div>
                    }
                </div>

            }
        </div>
    )
}

export default MCQTemplate