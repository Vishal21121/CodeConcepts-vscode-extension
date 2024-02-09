import React from 'react'
import Renderer from './Renderer.jsx'
import { useEffect } from 'react'
import { useState } from 'react'
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const QuestionDisplay = ({ vscode, setFormData, setUpdateMode, setRenderScreen, data }) => {
    const deleteButtonHandler = (id) => {
        // console.log("id: ", id)
        vscode.postMessage({
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

    return (
        <div className='w-full'>
            <div className='flex flex-col gap-2'>
                {
                    data.length ? data.map(({ question, answer, id, language }) => {
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