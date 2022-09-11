import React from 'react'
import styled from 'styled-components'
import {colors} from '../styles/variables'
import {nanoid} from "nanoid";
import {cities} from "./Calendar";
import {Button} from "./Login";

const headerHeight = '80px';
const headerLinkTextSize = '24px';


const HeaderLine = styled.div`
  display: flex;
  justify-content: center;
  height: 85vh;
  align-items: center;
  // height: ${headerHeight}; 
  // border-bottom: 1px solid grey;
`

const Flex = styled.div`
  display: flex;
`

const FlexCont = styled.div`
  display: flex;
`

const FieldsName = styled(FlexCont)`
    color: grey;
    font-size: 12px;
    margin-bottom: 5px;
`

const Title = styled.b`
  display: flex;
  color: ${colors.blue};
  justify-content: center;
  font-size: 22px;
  margin-bottom: 40px;
`

const InputBox = styled.div`
  // width: 350px;
  margin-bottom: 20px;
`

const InputField = styled.input`
  width: 350px;
  border: 1px solid lightgrey;
`


const Textarea = styled.textarea`
  width: 350px;
  border: 1px solid lightgrey;
`


const Select = styled.select`
  // width: 350px;
  border: 1px solid lightgrey;
`


const SubmitButton = styled.button`
  margin-top: 20px;
  border-radius: 30px;
  background-color: ${colors.blue};
  height: 50px;
  line-height: 50px;
  width: 110px;
  color: white;
  font-weight: 700;
`

const monthesDay = Array.from(Array(32).keys())
monthesDay.shift()

const monthes = ['Январь', "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
const years = [2022, 2023, 2024, 2025, 2026]
console.log(years)

function CreateEvent() {
    return (
        <HeaderLine>
            <form>
                <Title>Создать мероприятие</Title>
                <InputBox>
                    <FieldsName>Название мероприятия</FieldsName>
                    <InputField type={"text"}/>
                </InputBox>
                <InputBox>
                    <FieldsName>Описание мероприятия</FieldsName>
                    <Textarea/>
                </InputBox>
                <InputBox>
                    <FieldsName>День проведения мероприятия</FieldsName>
                    <Flex>
                        <Select name="days" id="days">
                            {monthesDay.map((value: any) => {
                                return <option key={nanoid()}>{value}</option>
                            })}
                        </Select>
                        <Select name="months" id="months" style={{margin: '0 40px 0 40px'}}>
                            {monthes.map((value: any) => {
                                return <option key={nanoid()}>{value}</option>
                            })}
                        </Select>
                        <Select name="years" id="years">
                            {years.map((value: any) => {
                                return <option key={nanoid()}>{value}</option>
                            })}
                        </Select>
                    </Flex>
                </InputBox>
                <InputBox>
                    <FieldsName>Время проведения мероприятия</FieldsName>
                    <InputField type={"text"}/>
                </InputBox>
                <InputBox>
                    <FieldsName>Город</FieldsName>
                    <Select name="cities" id="cities" style={{width: '350px'}}>
                        {cities.map((value: any) => {
                            return <option key={nanoid()}>{value}</option>
                        })}
                    </Select>
                </InputBox>
                <InputBox>
                    <FieldsName>Отдел</FieldsName>
                    <Select name="cities" id="cities" style={{width: '350px'}}>
                        {cities.map((value: any) => {
                            return <option key={nanoid()}>{value}</option>
                        })}
                    </Select>
                </InputBox>
                <InputBox>
                    <FieldsName>Место проведения</FieldsName>
                    <InputField type={"text"}/>
                </InputBox>
                <InputBox>
                    <FieldsName>Количество человек(необязательное поле)</FieldsName>
                    <InputField type={"number"}/>
                </InputBox>
                <FlexCont style={{justifyContent: 'end'}}>
                    <Button type={"submit"} text={'Создать'}/>
                </FlexCont>
            </form>
        </HeaderLine>
    );
}

export default CreateEvent;
