
import './App.css'
import { useEffect, useRef, useState } from 'react';
import MCQTemplate from './components/MCQ/MCQTemplate.jsx';

function App() {
  const [questionData, setQuestionData] = useState(null)
  const [isExplosion, setIsExplosion] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)

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

  const fetchContent = async () => {
    try {
      const response = await fetch('http://localhost:3000/questions?language=python')
      const data = await response.json()
      console.log(data.data.value.options)
      setQuestionData(data)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    fetchContent()
  }, [])


  return (
    <>
      {
        questionData && questionData.data.value.questionType === "mcq" ? (<MCQTemplate questionData={questionData} isExplosion={isExplosion} isCorrect={isCorrect} handleClick={handleClick} />) : ""
      }
    </>
  )
}

export default App
