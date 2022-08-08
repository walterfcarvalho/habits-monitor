import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"



import { getAuth, signInWithEmailAndPassword, authWithGoogle} from "firebase/auth"
import { getRedirectResult, GoogleAuthProvider } from "firebase/auth";

import { ContainerWrapper, Button, Label, Span, Input, Field, Form, EmptyBox } from '../UI'
import loginGoogleBanner  from '../../images/logingoogle.png'


const Login = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, undefined, formState: { errors } } = useForm()
  const [loginError, setLoginError] = useState()

  const signInWithGoogle = () => { 

    const auth = getAuth();
    
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
    
        // The signed-in user info.
        const user = result.user;
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  
  
  const onSubmit = data => {
    const auth = getAuth()

    signInWithEmailAndPassword(auth, data.email.replace(/^\s+|\s+$/gm,'') , data.password.replace(/^\s+|\s+$/gm,''))
      .then( userCredential => {

        localStorage.setItem("habbit-monitor", JSON.stringify(userCredential.user))
        
        navigate("/dashboard")
      })

      .catch((error) => {
        //const errorCode = error.code;
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
            }})}
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
            style={{width:"100%"}} 
            src={loginGoogleBanner} 
            alt="banner login with google" 
            onClick={signInWithGoogle}
          />

        </EmptyBox>

      </Form>






    </ContainerWrapper>
  </>
}

export default Login