import { temaClaro, temaEscuro } from './temas'

const getFromLocalStorage = () => {
  return localStorage.getItem('theme') || true
}

export const getTheme = () => {

  const isTheme = JSON.parse(getFromLocalStorage())

  return isTheme === null 
  ? true 
  : Boolean(isTheme)
}

export const getThemeObj = () => {

  const isTheme = JSON.parse(getFromLocalStorage())

  return isTheme === null 
  ? temaClaro 
  : Boolean(isTheme) ? temaClaro : temaEscuro
}
