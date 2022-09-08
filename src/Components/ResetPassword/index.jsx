import { useState } from 'react'
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import Logo from '../Logo'
import * as UI from '../UI'
import * as colors from '../UI/variables'
import * as firebase from '../../Firebase/api'

const ResetPassword = () => {
  // eslint-disable-next-line
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [isSucces, setIsSucces] = useState(false)

  const callResetPassword = (data) => {
    firebase.callResetPassword(data.email)
      .then(res => {
        setIsSucces(true)
      })
  }


  return <>
    <UI.ContainerWrapper>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

      <UI.Form onSubmit={handleSubmit(callResetPassword)}>

      <Logo msg="Password reset"/>

        {!isSucces && <>

          <UI.Field>
            <UI.Label primary
              htmlFor="firstName">Email
            </UI.Label>
            <UI.Input
              autoFocus={true}
              placeholder=""
              {...register('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                },
                required: { value: true, message: "E-mail is required" }
              })}
            />

            <UI.FieldError>
              {errors.email?.message}
            </UI.FieldError>

          </UI.Field>

          <UI.Field>
            <UI.Button primary type="submit" value={"go"} > Go </UI.Button>
          </UI.Field>
        </>
        }

        {isSucces &&
          <UI.EmptyColorBox backgroundColor={colors.corPrimaria} >
            Success!! if you are a user, we sent one email with instructions to reset you password, check you inbox.
          </UI.EmptyColorBox>
        }

        <UI.Field direction={"row"} >
          <Link style={{ color: colors.corPrimaria }} to="/login"> Back to login </Link>
          <Link style={{ color: colors.corPrimaria }} to="/newuser"> New user </Link>
        </UI.Field>



      </UI.Form>






    </UI.ContainerWrapper>
  </>
}

export default ResetPassword
