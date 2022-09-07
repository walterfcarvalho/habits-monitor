import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { TbHeartRateMonitor } from 'react-icons/tb'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { ContainerWrapper, Button, Label, Span, Input, Field, Form, EmptyBox } from '../UI'
import loginGoogleBanner from '../../images/logingoogle.png'


const Login = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [loginError, setLoginError] = useState()
  const auth = getAuth()

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {

        if (result !== null) {

          localStorage.setItem("habbit-monitor", JSON.stringify(result.user))

          navigate("/dashboard")
        }
      }).catch((error) => {
        setLoginError(error.message)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithRedirect(auth, provider)
      .catch((error) => {
        setLoginError(error.message)
      })
  }


  const onSubmit = data => {
    const auth = getAuth()

    signInWithEmailAndPassword(auth, data.email.replace(/^\s+|\s+$/gm, ''), data.password.replace(/^\s+|\s+$/gm, ''))
      .then(userCredential => {

        localStorage.setItem("habbit-monitor", JSON.stringify(userCredential.user))

        navigate("/dashboard")
      })
      .catch((error) => {
        setLoginError(error.message)
      });
  }


  return <>
    <ContainerWrapper>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

      <Form onSubmit={handleSubmit(onSubmit)}>

        <TbHeartRateMonitor size={'70px'} />

        <Field>
          <Label primary
            htmlFor="firstName">Email
          </Label>
          <Input
            onChange={() => setLoginError("")}
            autoFocus={true}
            placeholder=""
            {...register('email', {
              maxLength: {
                value: 99,
                message: 'Max length is 99',
              }
            })} />

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

        <Span>
          {loginError}
        </Span>


        <Field>
          <Button primary type="submit" value={"go"} > Go </Button>
        </Field>

        <EmptyBox>
          <img
            style={{ width: "100%" }}
            src={loginGoogleBanner}
            alt="banner login with google"
            onClick={loginWithGoogle}
          />
        </EmptyBox>

        <Field direction={"row"} >
          <Link style={{ color: '#41d3be' }} to="/newuser"> New user </Link>
          <Link style={{ color: '#41d3be' }} to="/forgotpassword"> Forgot password </Link>
        </Field>
      </Form>

    </ContainerWrapper>
  </>
}

export default Login