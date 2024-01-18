import { useEffect } from "react"
import QuestionForm from "./components/QuestionForm.jsx"
import { useState } from "react";
import QuestionDisplay from "./components/QuestionDisplay.jsx";
import { useRef } from "react";

function App() {
  const vscode = useRef(null)
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
  }, [renderScreen])

  return (
    <div className="h-full">
      {
        renderScreen && renderScreen === "questionForm" ? <QuestionForm vscode={vscode?.current} /> : <QuestionDisplay vscode={vscode?.current} />
      }
    </div>
  )
}

export default App
