<Div>
  
<FormWrapper onSubmit={handleSubmit(onSubmit)}>
  

    <Field>
      <Label
        htmlFor="firstName">Email
      </Label>
      <Input
        placeholder="Enter your email..."
        {...register('email', {
          maxLength: {
            value: 99,
            message: 'Max length is 2',
          },
          pattern: {
            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Invalid email"
          },

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
      <Input type="submit" value={"go"} />
    </Field>








  </FormWrapper>

  </Div>
