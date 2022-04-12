import React, { useState } from 'react'
import "./styles.scss";
import "@fontsource/roboto"
import Button from '@material-ui/core/Button';

type AppProps = {
  name: string
}
const App = (props: AppProps): JSX.Element => {
  return (
      <div className="wrapper"> 
        <h1>Instagram clone with</h1>
        <h4>React 18 and TypeScript 4</h4>
        <br />
        <Button variant="outlined">Hello, {props.name}</Button>
      </div>
  )
}

export default App