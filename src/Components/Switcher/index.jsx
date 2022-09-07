import React from 'react'
import ThemeOn from '../../images/themeOff.svg'
import ThemeOff from '../../images/themeOn.svg'
import { Icone } from '../UI'


const Switcher = ({theTheme, setTheme}) => {

  return <Icone 
      src={theTheme ? ThemeOn : ThemeOff } 
      alt= "Tema Claro"
      onClick = {() => setTheme() }  
    />
}

export default Switcher
