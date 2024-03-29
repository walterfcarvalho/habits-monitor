import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword, 
        signInWithRedirect, getRedirectResult, GoogleAuthProvider,
        setPersistence, browserSessionPersistence, 
        signInWithPopup } from "firebase/auth";
import * as UI from '../UI'
import loginGoogleBanner from '../../images/logingoogle.png'
import * as colors from '../UI/variables'
import { AiFillGithub } from 'react-icons/ai'


import Logo from '../Logo'

const Login = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loginError, setLoginError] = useState()
  
  useEffect(() => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth()
    
    if (JSON.parse(localStorage.getItem("habbit-monitor"))?.uid) {
      setTimeout( () => {
        navigate("/dashboard")
      }, 10 )      
    }
    
    setPersistence(auth, browserSessionPersistence)
    
    const redirectAuth = getAuth()
    getRedirectResult(redirectAuth)
    .then((result) => {
      console.log( window.innerWidth)
      console.log("getredirect =>", result)
      
      if (result !== null) {
        localStorage.setItem("habbit-monitor", JSON.stringify(result.user))
        console.log("getredirect")
        navigate("/dashboard")
      }
    }).catch((error) => {
      console(error)
      setLoginError(error.message)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const loginWithGoogle = async () => {

    const provider = new GoogleAuthProvider();
    const auth = getAuth()

    if (window.innerWidth < 0) {
      const userCred = await signInWithPopup(auth, new GoogleAuthProvider());

      console.log(userCred);

      
    } else { 
  
      signInWithRedirect(auth, provider)
        .catch((error) => {
          setLoginError(error.message)
        })
    }




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
    <UI.ContainerWrapper>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

      <UI.Form onSubmit={handleSubmit(onSubmit)}>

        <Logo msg="Habits-Monitor"/>

        <UI.Field>
          <UI.Label primary
            htmlFor="firstName">Email
          </UI.Label>
          <UI.Input
            onChange={() => setLoginError("")}
            autoFocus={true}
            placeholder=""
            {...register('email', {
              maxLength: {
                value: 99,
                message: 'Max length is 99',
              }
            })} />

          <UI.Span> {errors.email?.message} </UI.Span>
        </UI.Field>

        <UI.Field>
          <UI.Label
            htmlFor="password">Password
          </UI.Label>
          <UI.Input onChange={setLoginError}

            type="password"
            {...register("password", {
              required: { message: "Password is required" }
            })} />

          {errors.password?.message}
        </UI.Field>

        <UI.Span>
          {loginError}
        </UI.Span>


        <UI.Field>
          <UI.Button primary type="submit" value={"go"} > Go </UI.Button>
        </UI.Field>

        <UI.DivOr>
          <UI.Hr />
            Or
          <UI.Hr />
        </UI.DivOr>     

        <UI.EmptyBox>
          <img
            style={{ width: "100%" }}
            src={loginGoogleBanner}
            alt="banner login with google"
            onClick={loginWithGoogle}
          />
        </UI.EmptyBox>

        <UI.Field direction={"row"} >
          <Link style={{ color: colors.corPrimaria }} to="/newuser"> New user </Link>
          <Link style={{ color: colors.corPrimaria }} to="/resetpassword"> Forgot password </Link>
        </UI.Field>
      </UI.Form>


    </UI.ContainerWrapper>
      <UI.Footer>
        <AiFillGithub  size={'30px'} />
        <UI.A href="https://github.com/walterfcarvalho/habits-monitor/">Github source</UI.A>
      </UI.Footer>
  </>
}

export default Login