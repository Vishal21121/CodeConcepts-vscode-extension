import { useEffect } from "react"
import QuestionForm from "./components/QuestionForm.jsx"
import { useState } from "react";
import QuestionDisplay from "./components/QuestionDisplay.jsx";
import { useRef } from "react";
import { useVscodeApiContext } from "./context/VscodeApiContext.jsx";

function App() {
  const { vscode, setQuestions } = useVscodeApiContext()
  const [updateMode, setUpdateMode] = useState(false)
  const [data, setData] = useState({
    id: "",
    question: "",
    answer: "",
    language: ""
  })
  const [renderScreen, setRenderScreen] = useState(null)

  useEffect(() => {
    window.addEventListener("message", (event) => {
      const message = event.data
      switch (message.command) {
        case "viewMode":
          setRenderScreen(message.data)
          console.log(message.data)
          break;
        case "upadateQuestion":
          setQuestions(message.data)
          setRenderScreen("questionDisplay")
          break;
      }
    })
    vscode.postMessage({
      command: "loaded",
      message: "webview loaded"
    })
  }, [])

  return (
    <div className="h-full">
      {
        renderScreen && vscode && renderScreen === "questionForm" ? <QuestionForm updateMode={updateMode} data={data} setData={setData} /> : <QuestionDisplay setFormData={setData} setUpdateMode={setUpdateMode} setRenderScreen={setRenderScreen} />
      }
    </div>
  )
}

export default App
