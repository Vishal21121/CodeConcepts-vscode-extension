import { VSCodeButton, VSCodeRadio, VSCodeRadioGroup, VSCodeTextField } from '@vscode/webview-ui-toolkit/react';
import './App.css'
import QuestionTitle from './components/QuestionTitle.jsx'

function App() {
  const title = 'What is the output of below code'
  const content = `function foo() {
    let x = (y = 0);
    x++;
    y++;
    return x;
  }
  
  console.log(foo(), typeof x, typeof y);`
  return (
    <div className='flex flex-col'>
      <VSCodeTextField value={title} readOnly className='text-2xl' />
      <QuestionTitle content={content} questionType="mcq" language="js" />
      <VSCodeRadioGroup orientation='vertical'>
        <VSCodeRadio value='A, B and C'>A, B and C</VSCodeRadio>
        <VSCodeRadio value='B, A and C'>B, A and C</VSCodeRadio>
        <VSCodeRadio value='A and C'>A and C</VSCodeRadio>
        <VSCodeRadio value='A, C and B'>A, C and B</VSCodeRadio>
      </VSCodeRadioGroup>
      <VSCodeButton appearance='primary' className='w-fit'>Submit</VSCodeButton>
    </div>
  )
}

export default App
