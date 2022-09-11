import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles/variables'
import { Card } from './Card'
import { nanoid } from 'nanoid'


const Flex = styled.div`
    display: flex;
    // align-items: start;
`

const Vertical = styled(Flex)`
    flex-direction: column;
`

const RadioList = styled(Flex)`
    margin-bottom: 10px;
`

const Title = styled.b`
    display: flex;
    color: ${colors.blue};
    // justify-content: center;
    font-size: 22px;
    margin-bottom: 20px;
`

const Column = styled.div`
    margin: 50px 0 0 30px;
`

interface cardData {
    name: string,
    time: string,
    city: string,
    picURL: string,
    like: boolean
}

const cities: string[] = ['Все', 'Ульяновск', 'Казань', 'Самара', 'Саранск', 'Димитровград', 'Краснодар', 'Удаленка']
const directions: string[] = ['Все', 'Общие', 'Бэкэнд', 'Фронтэнд', 'Тестирование', 'Аналитика', 'Тест']
const other: string[] = ['Участвую', 'Ограничение по количеству']

const fakeData: cardData[] = [
    {
        name: 'Пикник с клубом кулинарии',
        time: '12:00 - 13:00',
        city: 'Ульяновск',
        picURL: '',
        like: false
    },
    {
        name: 'Велопрогулка по центру',
        time: '15:00 - 16:00',
        city: 'Казань',
        picURL: '',
        like: false
    },
    {
        name: 'Драматический театр. Постановка Лес.',
        time: '17:00 - 20:00',
        city: 'ДГ',
        picURL: '',
        like: false
    },
    {
        name: 'Лазертаг',
        time: '18:00 - 19:00',
        city: 'Самара',
        picURL: '',
        like: true
    },
    {
        name: 'Картинг "Форсаж"',
        time: '19:00 - 20:00',
        city: 'Казань',
        picURL: '',
        like: false
    },
    {
        name: 'Настолки в офисе',
        time: '20:00 - 23:00',
        city: 'Все города',
        picURL: '',
        like: false
    },
    {
        name: 'Кинопоказ в офисе',
        time: '20:00 - 22:00',
        city: 'Саранск',
        picURL: '',
        like: true
    }
]

function Schedule() {
    return (
        <Flex>
            <Column style={{width: '200px'}}>
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
            <Flex style={{width: '100%', justifyContent: 'center'}}>
                <Column style={{width: '700px'}}>
                    {fakeData.map(item => {
                        // @ts-ignore
                        return <Card data={item}/>
                    })}
                </Column>
            </Flex>
        </Flex>
    );
}


export default Schedule;
