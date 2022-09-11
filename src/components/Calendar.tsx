import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {colors} from '../styles/variables'
import {nanoid} from 'nanoid'
import {getAllParticipants, getCities, getEvents} from "../api/api";

const Flex = styled.div`
  display: flex;
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
  font-size: 22px;
  margin-bottom: 20px;
`

const Column = styled.div`
  margin: 50px 0 0 30px;
`

const CardWrapper = styled.div`
  border-bottom: 1px solid grey;
  height: 80px;
  padding-bottom: 10px; 
  margin-bottom: 10px;
`

const labelSize = '10px'
const CardColorLabel = styled.div`
  height: ${labelSize};
  line-height: ${labelSize};
  border-radius: 30px;
  padding: 5px 10px 5px 10px;
  color: white;
  background-color: ${({color}) => color === 'green' ? colors.green : colors.orange};
`

interface cardData {
    name: string,
    time: string,
    city: string,
    picURL: string,
    like: boolean
}

// const cities: string[] = ['Все', 'Ульяновск', 'Казань', 'Самара', 'Саранск', 'Димитровград', 'Краснодар', 'Удаленка']
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


function Card({data}: any) {
    return (
        <CardWrapper style={{display: 'flex'}}>
            <div>
                <div style={{width: '120px', height: '80px', backgroundColor: 'lightgrey'}}/>
            </div>
            <Flex style={{justifyContent: 'space-between', width: '100%'}}>
                <div style={{marginLeft: '20px'}}>
                    <div>{data.name}</div>
                    <div style={{color: colors.headerLinkInactive, marginTop: '5px'}}>
                        {data.time}
                        {/*12:00 - 13:00*/}
                    </div>
                </div>
                <Vertical style={{justifyContent: 'space-between', alignItems: 'end'}}>
                    <CardColorLabel color={'green'}>{data.city}</CardColorLabel>
                    <div style={{width: '30px', height: '30px', backgroundColor: 'red'}}></div>
                </Vertical>
            </Flex>
        </CardWrapper>
    )
}

function Calendar() {
    const [cities, setCities] = useState([])
    // const [directions, setDirections] = []
    // const [events, setEvents] = []
    // alert(cities)
    useEffect(() => {
        // getAllParticipants().then((e) => console.log(e))
        getEvents().then((e) => console.log(e))
        getCities().then((data) => {
            const arr = []
            data.map(e => {
                const parsed = e.getcity.replace('(', '').replace(')', '').split(',' )
                arr.push({
                    id: parsed[0],
                    name: parsed[1]
                })
            })
            setCities(arr)
        })
    }, [])
    return (
        <Flex>
            <Column style={{width: '300px'}}>
                <Vertical>
                    <Title>Города</Title>
                    <Vertical>
                        {cities?.map(item => {
                            return <RadioList key={nanoid()}>
                                <input type={"radio"} id={item}/>
                                <label style={{marginLeft: '6px'}} htmlFor={item}>{item.name}</label>
                            </RadioList>
                        })}
                    </Vertical>
                </Vertical>
                <Vertical style={{marginTop: '10px'}}>
                    <Title>Направление</Title>
                    <Vertical>
                        {directions.map(item => {
                            return <RadioList key={nanoid()}>
                                <input type={"checkbox"} id={item}/>
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
                            return <RadioList key={nanoid()}>
                                <input type={"checkbox"} id={item}/>
                                <label style={{marginLeft: '6px'}} htmlFor={item}>{item}</label>
                            </RadioList>
                        })}
                    </Vertical>
                </Vertical>
            </Column>
            <Column style={{width: '40%'}}>
                {fakeData.map(item => {
                    // @ts-ignore
                    return <Card key={nanoid()} data={item}/>
                })}

            </Column>
        </Flex>
    );
}


export default Calendar;
