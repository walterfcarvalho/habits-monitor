import styled from 'styled-components'

export const ActList = styled.div`
  align-items: center;
  background-color: ${({theme}) => theme.body };
  display:flex;
  flex-direction: column;
  text-align:center;
`

export const Box = styled.div`
  align-items:center;
  background-color: ${(props) => props.positive ? '#cbe3ac' : '#f0988b'};
  border-radius: 5px;
  box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin:5px;
  padding: 20px;
  width: 60%;

  @media (max-width: 800px) {
    width: 95%;
    margin: 5px;
  }
`

export const Button = styled.button`
  background-color: #41d3be;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  display: block;
  font-weight: 600;
  font-size: 14px;
  margin: 15px auto 0px auto;
  padding: 8px 20px;
`

export const BtnCabecalho = styled.a`
  text-align: center;
  border-radius: 3px;
  padding: 5px 5px;
  margin: 0 10px;
  font-weight: 600;
  border: 2px solid white;
  color: white;
  background: ${(props) => props.primary ? "white" : "corPrimaria"};
`


export const BtnTema = styled.button`
  background-color: inherit ;
  border:none;
  cursor:pointer;
  position:absolute;
  right: 20px;
  top:4vh;
`


export const ContainerWrapper = styled.div`
  background-color: '#F1F1F1';
  min-height: 100vh;
  padding: 0px 15vw;
  display:flex;
  justify-content: center ;
  align-items: center;
`


export const EmptyBox = styled.div`
  align-items:center;
  background-color: ${(theme) => theme.body};
  border-radius: 5px;
  box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 5px 20px 5px;
  padding: 20px;
  width: 60%;

  @media (max-width: 800px) {
    margin: 5px;
    width: 95%;
  }
`

export const EmptyColorBox = styled.div`
  align-items:center;
  background-color: ${(props) => props.backgroundColor ? props.backgroundColor : "white"};
  border-radius: 5px;
  box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 5px 20px 5px;
  padding: 20px;
  width: 60%;
  
  @media (max-width: 800px) {
    margin: 5px;
    width: 95%;
  }
`


export const Field = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction ? props.direction : "column"};
  padding: 0px;
  margin: 5px;
  width: 100%;
  background-color: ${(theme => theme.body)};
  justify-content: space-between;
`


export const FieldError = styled.span`
  color: red;
  font-size: 12px;
`


export const Form = styled.form`
  box-shadow: 4px 4px 20px 0px rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: ${(theme) => theme.body};
  border-radius: 10px;
  width: 50%;
  height: 40%;
  padding: 10px;

  @media (max-width: 800px) {
    width: 100%;
    margin: 5px;
  }
`


export const Icone = styled.img`
  height: 25px;
  width: 25px;
`


export const IconeTema = styled(Icone)`
  filter: ${({ theme }) => theme.filter};
`


export const Input = styled.input`
  font-weight: 300;
  font-size: normal;
  margin: 0px 0px 5px 0px;
`


export const Label = styled.label`
  margin: 0px 0px 5px 0px;
  color: ${(theme) => theme.fontColor};
  // color: blue;
`


export const Span = styled.span`
  text-align: left;
  width: 100%;
  color: ${({theme})=> theme.text};
`

export const Saldo = styled.div`  
  font-weight: 700;
  font-size: 32px;
`
