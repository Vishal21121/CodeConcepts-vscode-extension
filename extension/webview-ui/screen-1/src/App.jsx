
import { useEffect, useRef, useState } from 'react';
import MCQTemplate from './components/MCQ/MCQTemplate.jsx';

function App() {
  const [questionData, setQuestionData] = useState(null)
  const [isExplosion, setIsExplosion] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [btnShow, setBtnShow] = useState(true)
  const vscode = useRef(null)
  if (vscode.current === null) {
    vscode.current = acquireVsCodeApi()
  }
  const [language, setLanguage] = useState("")

  const handleClick = (value) => {
    if (value == questionData.data.value.answer) {
      setIsExplosion(true)
      setIsCorrect(true)
      setTimeout(() => {
        setIsExplosion(false)
      }, 3000)
    } else {
      setIsCorrect(false)
    }
    setBtnShow(false)
  }

  const fetchContent = async (language) => {
    console.log("called", language)
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}questions?language=${language.lang}`)
      const data = await response.json()
      console.log(data.data.value)
      setQuestionData(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    window.addEventListener("message", (e) => {
      const message = e.data
      switch (message.command) {
        case "langChoosen":
          console.log({ "language": message.lang })
          fetchContent(message)
          setLanguage(message.lang)
          break;
      }
      // console.log(e.data)
      // fetchContent(e.data)
      // setLanguage(e.data)
    })
    vscode?.current.postMessage({ command: "loaded" })
  }, [])


  return (
    <>
      {
        questionData && questionData.data.value.questionType === "mcq" ? (
          <MCQTemplate questionData={questionData} isExplosion={isExplosion} isCorrect={isCorrect} handleClick={handleClick} btnShow={btnShow} />
        ) : ""
      }
    </>
  )
}

export default App
