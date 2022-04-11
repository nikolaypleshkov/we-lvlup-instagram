import React from 'react'
import { TestComponent } from './components/TestComponent';
import "./styles.scss";
const App = (): JSX.Element => {
  return (
      <div className="wrapper"> 
        <h1>Instagram clone with</h1>
        <h4>React 18 and TypeScript 4</h4>
        <TestComponent />
      </div>
  )
}

export default App