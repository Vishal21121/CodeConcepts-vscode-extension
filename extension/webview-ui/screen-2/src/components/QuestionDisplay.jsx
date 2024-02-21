import React from 'react'
import Renderer from './Renderer.jsx'
import { useEffect } from 'react'
import { useState } from 'react'
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useVscodeApiContext } from '../context/VscodeApiContext.jsx';


const QuestionDisplay = ({ setFormData, setUpdateMode, setRenderScreen }) => {
    const { vscode, questions, setQuestions } = useVscodeApiContext()

    const deleteButtonHandler = (id) => {
        // console.log("id: ", id)
        vscode?.postMessage({
            command: "deleteQuestion",
            data: id
        })
    }

    const editButtonHandler = (id, question, answer, language) => {
        console.log(id, question, answer, language)
        setFormData({ id, question, answer, language })
        setUpdateMode(true)
        setRenderScreen("questionForm")
    }

    useEffect(() => {
        window.addEventListener("message", (event) => {
            const message = event.data
            switch (message.command) {
                case "getQuestions":
                    setQuestions(message.data)
                    break;
            }
        })
        if (vscode) {
            console.log("vscode", vscode)
            vscode?.postMessage({
                command: "getQuestions",
                message: "want questions"
            })
        }
    }, [])

    return (
        <div className='w-full'>
            <div className='flex flex-col gap-2'>
                {
                    questions.length ? questions.map(({ question, answer, id, language }) => {
                        return (
                            <div key={id} className='w-full flex flex-col items-end'>
                                <div className='flex'>
                                    <VSCodeButton appearance='icon'>
                                        <FaRegEdit onClick={() => editButtonHandler(id, question, answer, language)} />
                                    </VSCodeButton>
                                    <VSCodeButton appearance='icon' onClick={() => deleteButtonHandler(id)}>
                                        <MdDelete />
                                    </VSCodeButton>
                                </div>
                                <Renderer content={`${question}\n${answer}`} language={language} />
                            </div>
                        )
                    }) : <div className='text-center'>No questions saved yet!</div>
                }
            </div>
        </div>
    )
}

export default QuestionDisplay