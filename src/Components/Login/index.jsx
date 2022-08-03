import React, { useState } from "react"
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

import { ContainerWrapper, Button, Label } from '../UI'

const Form = styled.form`
  box-shadow: 4px 4px 20px 0px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  background-color: ${(theme)=> theme.body};
  border-radius: 10px;
  width: 50%;
  height: 40%;
  justify-content: center;
  padding: 10px;

  @media (max-width: 800px) {
    width: 100%;
    margin: 5px;
  }
`

const Input = styled.input`
  font-size: large;
  font-weight: 200;
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
  const [loginError, setLoginError] = useState()

  const onSubmit = data => {
    console.log(data)

    const auth = getAuth()

    signInWithEmailAndPassword(auth, data.email.replace(/^\s+|\s+$/gm,'') , data.password.replace(/^\s+|\s+$/gm,''))
      .then( userCredential => {

        localStorage.setItem("habbit-monitor", JSON.stringify(userCredential.user))
        
        navigate("/dashboard")
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginError(error.message)
      });

  }

  return <>

    <ContainerWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Label primary
            htmlFor="firstName">Email
          </Label>
          <Input 
            onChange={setLoginError}
            autoFocus={true}
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
          <Input onChange={setLoginError} 
            type="password"
            {...register("password", {
              required: { message: "Password is required" }
            })} />

          {errors.password && errors.password.message}
        </Field>

        {loginError}

        <Field>
          <Button primary type="submit" value={"go"} > Go </Button>
        </Field>
      </Form>

    </ContainerWrapper>
  </>
}

export default Login