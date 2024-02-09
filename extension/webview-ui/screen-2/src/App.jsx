import { useEffect } from "react"
import QuestionForm from "./components/QuestionForm.jsx"
import { useState } from "react";
import QuestionDisplay from "./components/QuestionDisplay.jsx";
import { useRef } from "react";

function App() {
  const vscode = useRef(null)
  const [updateMode, setUpdateMode] = useState(false)
  const [data, setData] = useState({
    id: "",
    question: "",
    answer: "",
    language: ""
  })
  const [questions, setQuestions] = useState([])

  if (vscode.current === null) {
    vscode.current = acquireVsCodeApi()
  }
  const [renderScreen, setRenderScreen] = useState(null)

  useEffect(() => {
    window.addEventListener("message", (event) => {
      const message = event.data
      switch (message.command) {
        case "viewMode":
          setRenderScreen(message.data)
          console.log(message.data)
          break;
        case "getQuestions":
          setQuestions(message.data)
          break;
        case "upadateQuestion":
          setQuestions(message.data)
          setRenderScreen("questionDisplay")
          break;
      }
    })
    vscode?.current.postMessage({
      command: "loaded",
      message: "webview loaded"
    })
    vscode?.current.postMessage({
      command: "getQuestions",
      message: "want questions"
    })
  }, [])

  return (
    <div className="h-full">
      {
        renderScreen && renderScreen === "questionForm" ? <QuestionForm vscode={vscode?.current} updateMode={updateMode} data={data} setData={setData} /> : <QuestionDisplay vscode={vscode?.current} setFormData={setData} setUpdateMode={setUpdateMode} setRenderScreen={setRenderScreen} data={questions} />
      }
    </div>
  )
}

export default App
