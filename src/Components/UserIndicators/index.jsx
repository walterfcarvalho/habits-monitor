import { useState } from 'react'
import { useForm } from "react-hook-form"
import * as firebase from '../../Firebase/api'
import * as S from '../UI'
import StyledHeader from '../StyleHeader'
import Indicators from '../Indicators'


const UserIndicators = ({ theTheme, setTheme }) => {
  const [useIndicators, setUseIndicators] = useState([])
  const [flagForm, setFlagForm] = useState(false)
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm()
  const description = watch("description", "")

  function addIndicator(data) {

    setFlagForm(!flagForm)

    const userIndicator = {
      deleted: false,
      indicator: data.description,
      positive: data.isPositive === 'positive' ? true : false,
      user: JSON.parse(localStorage.getItem("habbit-monitor")).uid,
      target: 1,
      metricType: data.metricType,
    }

    firebase.addDocument('userIndicators', userIndicator).then(res => {

      setUseIndicators([...useIndicators, {
        userIndicator: res.id,
        positive: data.isPositive === 'positive' ? true : false,
        indicator: data.description
      }])
    })

    reset('', {
      keepValues: false,
    })
  }

  return <>
    <StyledHeader
      theTheme={theTheme}
      setTheme={setTheme}
      title={"My indicators"}
    />

    {!flagForm &&
      <S.ActList>

        <Indicators
          dateStart={new Date()}
          isShowRemove={true}
          isEdit={false}
          isShowDaily={false}
        />

        <S.Button primary type="submit" onClick={() => setFlagForm(!flagForm)}> Add </S.Button>

      </S.ActList>
    }
    {flagForm &&
      <S.ContainerWrapper>
        <S.Form onSubmit={handleSubmit(addIndicator)}>
          <S.Field primary>
            <S.Label htmlFor="description">
              Indicator description
            </S.Label>
            <S.Input
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
            <S.FieldError>
              {description && errors.description && errors.description.message}
            </S.FieldError>
          </S.Field>
          <S.Field primary>
            <S.Label htmlFor="metricType">
              Type
            </S.Label>

            <select {...register("metricType", { required: 'Choose a Type' })}>
              <option value="Units">Units</option>
              <option value="Minutes">Minutes</option>
            </select>
            <S.FieldError>
              {errors.metricType && errors.metricType.message}
            </S.FieldError>
          </S.Field>

          <S.Field primary>
            <S.Label htmlFor="isPositive">
              Influence
            </S.Label>

            <select {...register("isPositive", { required: 'Choose a Type' })}>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
            </select>
            {errors.metricType && errors.metricType.message}
          </S.Field>

          <S.Field direction={"row"}>
            <S.Button primary type="submit" value={"Ok"} > Ok </S.Button>
            <S.Button primary type="reset" onClick={() => setFlagForm(!flagForm)} > Cancel </S.Button>
          </S.Field>
        </S.Form>
      </S.ContainerWrapper>
    }
  </>
}
export default UserIndicators
