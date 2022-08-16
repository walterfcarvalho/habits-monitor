import React from 'react'
import ThemeOn from '../../images/themeOff.svg'
import ThemeOff from '../../images/themeOn.svg'
import { Icone } from '../UI'

// const claro = <Icone src={ThemeOn} alt= "Tema Claro"/>
// const escuro = <Icone src={ThemeOff} alt= "Tema escuro"/>

const Switcher = ({theTheme, setTheme}) => {

  return (
    <Icone 
      src={theTheme ? ThemeOn : ThemeOff } 
      alt= "Tema Claro"
      onClick = {() => setTheme() }  
    />
  )
}

export default Switcher
