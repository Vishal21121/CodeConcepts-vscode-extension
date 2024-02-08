import React from 'react'
import Renderer from './Renderer.jsx'
import { useEffect } from 'react'
import { useState } from 'react'
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


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

    const deleteButtonHandler = (id) => {
        // console.log("id: ", id)
        vscode.postMessage({
            command: "deleteQuestion",
            message: id
        })
    }

    return (
        <div className='w-full'>
            <div className='flex flex-col gap-2'>
                {
                    data.length != 0 && data.map(({ question, answer, id, language }) => {
                        return (
                            <div key={id} className='w-full flex flex-col items-end'>
                                <div className='flex'>
                                    <VSCodeButton appearance='icon'>
                                        <FaRegEdit />
                                    </VSCodeButton>
                                    <VSCodeButton appearance='icon' onClick={() => deleteButtonHandler(id)}>
                                        <MdDelete />
                                    </VSCodeButton>
                                </div>
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