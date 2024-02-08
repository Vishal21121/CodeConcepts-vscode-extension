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
      }
    })
    vscode?.current.postMessage({
      command: "loaded",
      message: "webview loaded"
    })
  }, [])

  return (
    <div className="h-full">
      {
        renderScreen && renderScreen === "questionForm" ? <QuestionForm vscode={vscode?.current} updateMode={updateMode} data={data} setData={setData} /> : <QuestionDisplay vscode={vscode?.current} setFormData={setData} setUpdateMode={setUpdateMode} setRenderScreen={setRenderScreen} />
      }
    </div>
  )
}

export default App
