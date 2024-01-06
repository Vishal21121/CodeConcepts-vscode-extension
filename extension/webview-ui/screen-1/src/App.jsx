import { VSCodeButton, VSCodeRadio, VSCodeRadioGroup, VSCodeTextField } from '@vscode/webview-ui-toolkit/react';
import './App.css'
import QuestionTitle from './components/QuestionTitle.jsx'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use';
import { useState } from 'react';

function App() {
  const [isExplosion, setIsExplosion] = useState(false)
  const { width, height } = useWindowSize()

  const handleClick = () => {
    setIsExplosion(true)
    setTimeout(() => {
      setIsExplosion(false)
    }, 5000)
  }

  const title = 'What is the output of below code'
  const content = `function foo() {
    let x = (y = 0);
    x++;
    y++;
    return x;
  }
  
  console.log(foo(), typeof x, typeof y);`
  return (
    <div className='overflow-hidden flex flex-col'>
      <VSCodeTextField value={title} readOnly className='text-2xl' />
      <QuestionTitle content={content} questionType="mcq" language="js" />
      <VSCodeRadioGroup orientation='vertical'>
        <VSCodeRadio value='A, B and C'>A, B and C</VSCodeRadio>
        <VSCodeRadio value='B, A and C'>B, A and C</VSCodeRadio>
        <VSCodeRadio value='A and C'>A and C</VSCodeRadio>
        <VSCodeRadio value='A, C and B'>A, C and B</VSCodeRadio>
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
            <div className='bg-green-500 text-white w-full p-2 rounded font-semibold text-lg'>Congratulation Correct answer</div>
          </div>
        )
      }
    </div>
  )
}

export default App
