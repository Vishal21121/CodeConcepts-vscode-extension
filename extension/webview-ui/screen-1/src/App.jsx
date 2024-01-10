
import { useEffect, useState } from 'react';
import MCQTemplate from './components/MCQ/MCQTemplate.jsx';
import ConceptTemplate from './components/ConceptQuestion/ConceptTemplate.jsx';

function App() {
  const [questionData, setQuestionData] = useState(null)
  const [isExplosion, setIsExplosion] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [language, setLanguage] = useState("")

  const handleClick = (value) => {
    if (value == questionData.data.value.answer) {
      setIsExplosion(true)
      setIsCorrect(true)
      setTimeout(() => {
        setIsExplosion(false)
      }, 5000)
    } else {
      setIsCorrect(false)
      setTimeout(() => {
        setIsCorrect(null)
      }, 3000)
    }
  }

  const fetchContent = async (language) => {
    console.log("called", language)
    try {
      const response = await fetch(`http://localhost:3000/questions?language=${language}`)
      const data = await response.json()
      console.log(data.data.value)
      setQuestionData(data)
    } catch (error) {
      console.log(error.message)
    }
  }
  // useEffect(() => {
  //   window.addEventListener("message", (e) => {
  //     console.log(e.data)
  //     setLanguage(e.data)
  //     fetchContent(e.data)
  //   })
  // }, [])

  useEffect(() => {
    fetchContent("python")
  }, [])


  return (
    <>
      {
        questionData && questionData.data.value.questionType === "mcq" ? (<MCQTemplate questionData={questionData} isExplosion={isExplosion} isCorrect={isCorrect} handleClick={handleClick} />) : ""
      }
      {
        questionData && questionData.data.value.questionType === "concept" ? (<ConceptTemplate questionData={questionData} />) : ""
      }
    </>
  )
}

export default App
