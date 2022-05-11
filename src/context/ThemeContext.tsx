import React, { ReactNode, useState, useContext, createContext } from 'react'

const ThemeContext = createContext<Boolean>(false);

const ThemeProvider = ({chidlren} : {chidlren: ReactNode | ReactNode[]}) => {
    const [darkTheme, setDarkTheme] = useState<Boolean>(false);

    const toggleDarkTheme = () => {
        setDarkTheme(prevTheme => !prevTheme);
    }
  return (
      <ThemeContext.Provider value={darkTheme}>
          {chidlren}
      </ThemeContext.Provider>
  )
}

export default ThemeProvider