
import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import StyledHeader from '../StyleHeader'
import { ContainerWrapper, Box, Button, ActList, Label, Input } from '../../Components/UI'
import { getUserIndicators, updateIndicator } from '../../Firebase/api'
import styled from 'styled-components'

const Form = styled.form`
  box-shadow: 4px 4px 20px 0px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  background-color: ${(theme) => theme.body};
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
const Field = styled.div`
  flex-grow: 2; 
  display: flex;
  flex-direction: column;
  padding: 0px;
  margin: 0px;
  background-color: ${(theme => theme.body)};
`


const UserIndicators = () => {
  const [useIndicators, setUseIndicators] = useState([])
  const [flagForm, setFlagForma] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  useEffect(() => {
    listUserIndicators()
  }, [])


  function deactivateIndicator(idx) {
    updateIndicator(useIndicators[idx].userIndicator)
      .then(res => (
        setUseIndicators(
          useIndicators.filter(item => item.userIndicator != useIndicators[idx].userIndicator)
        )
      ))
  }

  function listUserIndicators() {
    const userId = JSON.parse(localStorage.getItem("habbit-monitor")).uid

    getUserIndicators(userId)
      .then(data => setUseIndicators(data))
  }

  return <>
    <StyledHeader></StyledHeader>

    <ActList>

      {useIndicators.map((item, idx) => (

        <Box key={idx} positive={item.positive}  >
          {item.indicator}

          <img onClick={() => deactivateIndicator(idx)} src={require("../../images/trash.png")} height="30px" width="30px" />

        </Box>

      ))}

      <Button primary type="submit" value={"go"} > Add </Button>

    </ActList>

    <ContainerWrapper>

      <Form>
        <Field primary>
          <Label htmlFor="description">
          Indicator description
          </Label>
          <Input
            onChange={console.log('change')}
            autoFocus={true}
            placeholder=""
            {...register('description', {
              required: "Description is required",
              maxLength: {
                value: 50,
                message: 'Max length is 50'
              }
            })}
          />
          {errors.metricType && errors.metricType.message}

        </Field>

        <Field primary>
          <Label htmlFor="metricType">
          Type
          </Label>

          <select {...register("metricType", { required: 'Choose a Type' })}>
            <option value="Units">Units</option>
            <option value="Minutes">Minutes</option>
          </select>
          {errors.metricType && errors.metricType.message}

        </Field>

        <input type="submit" value={"go"} />
        <input type="reset" value={"Cancel"} />



      </Form>

    </ContainerWrapper>








  </>
}
export default UserIndicators
