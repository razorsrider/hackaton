import React from 'react'
import styled from 'styled-components'
import {colors} from '../styles/variables'
import {nanoid} from 'nanoid'

const headerHeight = '80px';
const headerLinkTextSize = '24px';


const Flex = styled.div`
  display: flex;
  align-items: start;
`

const Vertical = styled(Flex)`
  flex-direction: column;
`

const RadioList = styled(Flex)`
  margin-bottom: 10px;
`


const HeaderLink = styled.div<{ active?: boolean }>`
  color: ${({active}) => active ? 'black' : colors.headerLinkInactive};
  line-height: ${headerHeight};
  font-size: ${headerLinkTextSize};
  margin-right: 50px;
  cursor: pointer;
}
`


const Title = styled.b`
  display: flex;
  color: ${colors.blue};
  // justify-content: center;
  font-size: 22px;
  margin-bottom: 20px;
`

const FieldsName = styled(Title)`
    color: grey;
    font-size: 12px;
`


const InputBox = styled.div`
  // width: 350px;
  margin-bottom: 20px;
`

const Column = styled.div`
  margin: 50px 0 0 30px;
`

const SubmitButton = styled.div`
  margin-top: 20px;
  border-radius: 30px;
  background-color: ${colors.blue};
  height: 50px;
  line-height: 50px;
  width: 110px;
  color: white;
  font-weight: 700;
`


const CardWrapper = styled.div`
  border: 1px solid grey;
`


const cities: string[] = ['Все', 'Ульяновск', 'Казань', 'Самара', 'Саранск', 'Димитровград', 'Краснодар', 'Удаленка']
const directions: string[] = ['Все', 'Общие', 'Бэкэнд', 'Фронтэнд', 'Тестирование', 'Аналитика', 'Тест']
const other: string[] = ['Участвую', 'Ограничение по количеству']


function Card() {
    return (
        <CardWrapper style={{display: 'flex'}}>
            <div>
                <div style={{width: '100px', height: '70px', backgroundColor: 'lightgrey'}}/>
            </div>
            <div>
                <div>Пикник с клубом кулинарии</div>
                <div style={{color: colors.headerLinkInactive}}>12:00 - 13:00</div>
            </div>
        </CardWrapper>
    )
}

function Calendar() {
    return (
        <Flex>
            <Column style={{width: '300px'}}>
                <Vertical>
                    <Title>Города</Title>
                    <Vertical>
                        {cities.map(item => {
                            return <RadioList>
                                <input type={"radio"} id={item} key={nanoid()}/>
                                <label style={{marginLeft: '6px'}} htmlFor={item}>{item}</label>
                            </RadioList>
                        })}
                    </Vertical>
                </Vertical>
                <Vertical style={{marginTop: '10px'}}>
                    <Title>Направление</Title>
                    <Vertical>
                        {directions.map(item => {
                            return <RadioList>
                                <input type={"checkbox"} id={item} key={nanoid()}/>
                                <label style={{marginLeft: '6px'}} htmlFor={item}>{item}</label>
                            </RadioList>
                        })}
                    </Vertical>
                </Vertical>
            </Column>
            <Column style={{width: '350px'}}>
                <Vertical style={{marginTop: '10px'}}>
                    <Title>Прочее</Title>
                    <Vertical>
                        {other.map(item => {
                            return <RadioList>
                                <input type={"checkbox"} id={item} key={nanoid()}/>
                                <label style={{marginLeft: '6px'}} htmlFor={item}>{item}</label>
                            </RadioList>
                        })}
                    </Vertical>
                </Vertical>
            </Column>
            <Column style={{width: '40%'}}>
                <Card/>
            </Column>
        </Flex>
    );
}


export default Calendar;
