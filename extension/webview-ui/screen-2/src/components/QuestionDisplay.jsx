import React from 'react'
import Renderer from './Renderer.jsx'
import { useEffect } from 'react'
import { useState } from 'react'

const QuestionDisplay = ({ vscode }) => {
    const [data, setData] = useState([])
    useEffect(() => {
        vscode.postMessage({
            command: "getQuestions",
            message: "want questions"
        })
        window.addEventListener("message", (event) => {
            const message = event.data
            switch (message.command) {
                case "getQuestions":
                    setData(message.data)
                    break;
            }
        })
    }, [])

    return (
        <div className='w-full'>
            <div className='flex flex-col gap-2'>
                {
                    data && data.map(({ question, answer, id, language }) => {
                        return (
                            <div key={id}>
                                <Renderer content={`${question}\n${answer}`} language={language} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default QuestionDisplay