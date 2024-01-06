import { VSCodeButton, VSCodeRadio, VSCodeRadioGroup, VSCodeTextField } from '@vscode/webview-ui-toolkit/react';
import './App.css'
import QuestionTitle from './components/QuestionTitle.jsx'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use';
import { useEffect, useRef, useState } from 'react';

function App() {
  const { width, height } = useWindowSize()
  const optionRef = useRef(null)
  const [questionData, setQuestionData] = useState(null)
  const [isExplosion, setIsExplosion] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)

  const handleClick = () => {
    if (optionRef.current.value == questionData.data.value.answer) {
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

  const title = 'Question'
  const data = `What is the output of below code 
  function foo() {
    let x = (y = 0);
    x++;
    y++;
    return x;
  }
  
  console.log(foo(), typeof x, typeof y);`

  useEffect(() => {
    fetchContent()
  }, [])


  return (
    <div className='overflow-hidden flex flex-col'>
      <VSCodeTextField value={title} readOnly className='text-2xl' />
      {
        questionData !== null ? (
          <div>
            <QuestionTitle content={questionData.data.value.question} questionType={questionData.data.value.questionType} language={questionData.data.value.language} />
            <VSCodeRadioGroup orientation='vertical' ref={optionRef}>
              {
                questionData.data.value.options.map((el) => {
                  return <VSCodeRadio value={el}>{el}</VSCodeRadio>
                })
              }
            </VSCodeRadioGroup>
            <VSCodeButton appearance='primary' className='w-fit' onClick={handleClick}>Submit</VSCodeButton>
            {
              isExplosion && (
                <div className='flex mt-2'>
                  <Confetti
                    width={width || 300}
                    height={height || 300}
                    gravity={0.3}
                    pieces={300}
                  />
                  <div className="bg-green-500 text-white w-full p-2 rounded font-semibold text-base">Congrats for the correct answer</div>
                </div>
              )

            }
            {
              isCorrect === false && <div className="bg-red-500 text-white w-full p-2 rounded font-semibold text-base mt-2">Bhai thoda padh le</div>
            }
          </div>
        ) : ""
      }
    </div>
  )
}

export default App
