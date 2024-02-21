import React, { createContext } from 'react'
import { useRef } from 'react'
import { useContext } from 'react'
import { useState } from 'react'


const VscodeApiContext = createContext()

const useVscodeApiContext = () => {
    return useContext(VscodeApiContext)
}

const VscodeApiContextProvider = ({ children }) => {
    const vscode = useRef(null)
    if (vscode.current === null) {
        console.log("inside vscodeAPi")
        vscode.current = acquireVsCodeApi()
    }
    const [questions, setQuestions] = useState([])
    return (
        <VscodeApiContext.Provider value={{ vscode: vscode.current, questions, setQuestions }}>
            {children}
        </VscodeApiContext.Provider>
    )
}

export { VscodeApiContextProvider, useVscodeApiContext }