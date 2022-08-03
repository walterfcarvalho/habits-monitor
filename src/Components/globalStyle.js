import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding: 0;
  text-decoration: none;
}
`
export const BodyCentralizedStyle = createGlobalStyle`
html {
  //display: flex;
  //justify-content: center;
  //background-color:  ${({theme}) => theme.body } ;

}
`