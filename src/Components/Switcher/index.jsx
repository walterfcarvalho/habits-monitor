import React from 'react'
import ThemeOn from '../../images/themeOff.svg'
import ThemeOff from '../../images/themeOn.svg'
import { Icone } from '../UI'

const claro = <Icone src={ThemeOn} alt= "Tema Claro"/>
const escuro = <Icone src={ThemeOff} alt= "Tema escuro"/>

export default Switcher = ({tema}) => {

  return (
    tema ? escuro : claro
  )

}


  