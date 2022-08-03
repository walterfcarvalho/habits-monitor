import styled from 'styled-components'
 
export const Icone = styled.img`
  height: 25px;
  width: 25px;
`
export const IconeTema = styled(Icone)`
  filter: ${({theme}) => theme.filter };
` 

export const Button = styled.button`
  margin: 15px auto 0px auto;
  display: block;
  border-radius: 20px;
  background-color: #41d3be;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 14px;
  padding: 8px 20px;
  cursor: pointer;
`

export const Box = styled.div`
  margin:5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
//  background-color: ${ ({theme}) => theme.body};
  border-radius: 5px;
  box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.08);
  padding: 20px;
  width: 60%;
  background-color: ${(props) => props.positive ? '#cbe3ac' : '#f0988b'};


  @media (max-width: 800px) {
    width: 95%;
    margin: 5px;
  }
`

export const Detalhe = styled.span`
  color: #41d3be;
  font-size: 24px;
`

export const Saldo = styled.div`  
  font-weight: 700;
  font-size: 32px;
`

export const BtnTema = styled.button`
  position:absolute;
  top:4vh;
  right: 20px;
  background-color: inherit ;
  border:none;
  cursor:pointer;
`

export const ContainerWrapper  = styled.div `
  background-color: '#F1F1F1';
  min-height: 100vh;
  padding: 0px 15vw;
  display:flex;
  justify-content: center ;
`
export const Label = styled.label`
  margin: 0px 0px 5px 0px;
  color: ${(theme)=> theme.fontColor};
  // color: blue;
`
Label.displayName = "Label"

export const BtnCabecalho =  styled.a`
  text-align: center;
  border-radius: 3px;
  padding: 5px 20px;
  margin: 0 10px;
  font-weight: 600;
  border: 2px solid white;
  color: white;
  background: ${(props)=> props.primary ? "white": "corPrimaria"};
`

export const ActList = styled.div`
display:flex;
flex-direction: column;
align-items: center;
`
