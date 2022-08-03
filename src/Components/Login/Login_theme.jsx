import React from "react"
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import { GlobalStyle } from '../globalStyle'
import { useNavigate } from "react-router-dom"

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { ThemeProvider } from 'styled-components'
import { temaClaro, temaEscuro } from '../UI/temas'

import { ContainerWrapper, Button, Label } from '../UI'

const Form = styled.form`
  box-shadow: 4px 4px 20px 0px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  background-color: ${(theme)=> theme.body};
  border-radius: 10px;
  width: 50%;
  height: 40%;
  justify-content: center;
  padding: 10px;
`

const Input = styled.input`
  font-weight: 400;
  font-size: normal;
  margin: 0px 0px 5px 0px;
  `
Input.displayName = "Input"

const Field = styled.div`
  flex-grow: 2; 
  display: flex;
  flex-direction: column;
  padding: 0px;
  margin: 0px;
  background-color: ${(theme => theme.body)};
`
Field.displayName = "Form"

const Span = styled.span`
  font-size: small;
  color: red;
`

const Login = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const onSubmit = data => {
    console.log(data)

    const auth = getAuth()

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then( userCredential => {
        localStorage.setItem("habbit-monitor", JSON.stringify(userCredential.user))
        
        navigate("/dashboard")
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

  }

  return <ThemeProvider theme={temaEscuro}>
    <GlobalStyle />

    <ContainerWrapper>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Label primary
            htmlFor="firstName">Email
          </Label>
          <Input autoFocus={true}
            placeholder=""
            {...register('email', {
              maxLength: {
                value: 99,
                message: 'Max length is 99',
              },
              // pattern: {
              //   value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              //   message: "Invalid email"
              // },

            })}
          />
          <Span> {errors.email && errors.email.message} </Span>
        </Field>

        <Field>

          <Label
            htmlFor="password">Password
          </Label>
          <Input 
            type="password"
            {...register("password", {
              required: { message: "Password is required" }
            })} />

          {errors.password && errors.password.message}
        </Field>

        <Field>
          <Button primary type="submit" value={"go"} > Go </Button>
        </Field>


      </Form>

    </ContainerWrapper>

  </ThemeProvider>



}

export default Login