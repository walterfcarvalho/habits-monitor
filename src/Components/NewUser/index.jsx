import { useState } from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import * as firebase from '../../Firebase/api'
import LoadingComponent from '../../LoadingComponent'
import Logo from '../Logo'
import * as UI from '../UI'
import * as colors from '../UI/variables'


const NewUser = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [error, setError] = useState("")
  const [isSucces, setIsSucces] = useState(false)
  const navigate = useNavigate()

  const setSubmit = (data) => {
    const user = { user: data.email, password: data.password }

    firebase.addUser(user)
      .then(result => {
        setIsSucces(true)
        setTimeout(() => {
          localStorage.setItem("habbit-monitor", JSON.stringify(result.user))
          navigate("/dashboard")
        }, 1000)
      })
      .catch(err => (
        setError(err.message)
      ))
  }


  return <UI.ContainerWrapper>
    <UI.Form onSubmit={handleSubmit(setSubmit)}>

      {!isSucces &&
        <>
          <Logo msg="New user"/>

          <UI.Field primary>
            <UI.Label htmlFor="email">
              E-mail
            </UI.Label>
            <UI.Input
              autoFocus={true}
              placeholder=""
              {...register('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                },
                required: { value: true, message: "Email is required" }
              })}
            />
            <UI.FieldError>
              {errors.email?.message}
            </UI.FieldError>
          </UI.Field>

          <UI.Field>
            <UI.Label
              htmlFor="password">Password
            </UI.Label>

            <UI.Input
              type="password"
              {...register("password", {
                min: { value: 6, message: "Password must contains 6 or more characters" },
                required: { value: true, message: "Password is required" }
              })}
            />

            <UI.FieldError>
              {errors.password?.message}
            </UI.FieldError>

          </UI.Field>

          <UI.Field>
            <UI.Label htmlFor="psw">
              Password confirmation
            </UI.Label>

            <UI.Input onChange={setSubmit}
              type="password"
              {...register("psw", {
                required: { value: true, message: "Password confirmation is required" },
                validate: (val) => {
                  if (watch('password') !== val) return "Password and confirmation should match"
                }
              })}
            />

            <UI.FieldError>
              {errors.psw?.message}
            </UI.FieldError>

          </UI.Field>

          <UI.FieldError>
            {error}
          </UI.FieldError>

          <UI.Field direction={"row"}>
            <UI.Button primary type="submit" value={"Ok"}>Ok</UI.Button>
          </UI.Field>

          <UI.Field direction={"row"} >
            <Link style={{ color: colors.corPrimaria }} to="/login"> Login </Link>
            <Link style={{ color: colors.corPrimaria }} to="/resetpassword"> Forgot password </Link>
          </UI.Field>
        </>
      }

      {isSucces &&
        <UI.EmptyColorBox backgroundColor={colors.corPrimaria} >
          Success!! You will redirect...
          <LoadingComponent size={"20"} />
        </UI.EmptyColorBox>
      }
    </UI.Form>
  </ UI.ContainerWrapper>
}

export default NewUser
