import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"


import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth";

import { ContainerWrapper, Button, Label, Span, Input, Field, Form, EmptyBox } from '../UI'
import loginGoogleBanner from '../../images/logingoogle.png'


const Login = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [loginError, setLoginError] = useState()


  useEffect(() => {
    const auth = getAuth()
    getRedirectResult(auth)
      .then((result) => {

        
        
        if (result !== null) {
          window.alert('fsdfsd')
          console.log('getRedirectResult', result)

          localStorage.setItem("habbit-monitor", JSON.stringify(result.user))

          navigate("/dashboard")
        }

      }).catch((error) => {
        console.log('error', error)

        window.alert(error.message)
        //const errorCode = error.code;
        //const errorMessage = error.message;
        // The email of the user's account used.
        //    const email = error.customData.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loga = () => {
    const autorizator = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithRedirect(autorizator, provider).then(res => console.log(res))
  }


  const onSubmit = data => {
    const auth = getAuth()

    signInWithEmailAndPassword(auth, data.email.replace(/^\s+|\s+$/gm, ''), data.password.replace(/^\s+|\s+$/gm, ''))
      .then(userCredential => {

        localStorage.setItem("habbit-monitor", JSON.stringify(userCredential.user))

        navigate("/dashboard")


      })

      .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;
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
              }
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

        <EmptyBox>

          <img
            style={{ width: "100%" }}
            src={loginGoogleBanner}
            alt="banner login with google"
            onClick={loga}
          />
        </EmptyBox>

      </Form>

    </ContainerWrapper>
  </>
}

export default Login