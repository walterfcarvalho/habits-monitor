
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { addDocument } from '../../Firebase/api'
import styled from 'styled-components'

import StyledHeader from '../StyleHeader'
import { ContainerWrapper, Button, ActList, Label, Input, FieldError, Field, Form } from '../UI'
import Indicators from '../Indicators'
 

const UserIndicators = () => {
  const [useIndicators, setUseIndicators] = useState([])
  const [flagForm, setFlagForm] = useState(false)
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm()
  const description =  watch("description", "")

  function addIndicator (data) {

    setFlagForm(!flagForm)

    const userIndicator = {
      deleted:false,
      indicator: data.description,
      positive: data.isPositive === 'positive' ? true: false,
      user: JSON.parse(localStorage.getItem("habbit-monitor")).uid,
      target:1,
      metricType: data.metricType, 
    }

    addDocument('userIndicators', userIndicator).then( res => {

      setUseIndicators([...useIndicators, {
        userIndicator: res.id,
        positive: data.isPositive === 'positive' ? true: false,
        indicator: data.description
      }])
    })

    reset('', {
        keepValues: false,
    })
  }

  return <>
    <StyledHeader title={"My indicators"}></StyledHeader>

    { !flagForm &&
      <ActList>

        <Indicators
          dateStart={new Date()}
          isShowRemove={true}
          isEdit={false}
          isShowDaily={false}
        />

      <Button primary type="submit" onClick={() => setFlagForm(!flagForm)}> Add </Button>

    </ActList>
    }
    {flagForm &&
      <ContainerWrapper>
        <Form onSubmit={handleSubmit(addIndicator)}>
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
            <FieldError>
              {description && errors.description && errors.description.message}
            </FieldError>
          </Field>
          <Field primary>
            <Label htmlFor="metricType">
              Type
            </Label>

            <select {...register("metricType", { required: 'Choose a Type' })}>
              <option value="Units">Units</option>
              <option value="Minutes">Minutes</option>
            </select>
            <FieldError>
              {errors.metricType && errors.metricType.message}
            </FieldError>
          </Field>

          <Field primary>
            <Label htmlFor="isPositive">
              Influence
            </Label>

            <select {...register("isPositive", { required: 'Choose a Type' })}>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
            </select>
            {errors.metricType && errors.metricType.message}
          </Field>

          <Field direction={"row"}>
            <Button primary type="submit" value={"Ok"} > Ok </Button>
            <Button primary type="reset" onClick={() => setFlagForm(!flagForm)} > Cancel </Button>
          </Field>
        </Form>
      </ContainerWrapper>
    }








  </>
}
export default UserIndicators
