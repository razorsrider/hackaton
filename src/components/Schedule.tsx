import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { colors } from '../styles/variables'
import { Card } from './Card'
import { nanoid } from 'nanoid'
import {getAllParticipants, getCities, getEvents} from "../api/api";


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

const directions: string[] = ['Все', 'Общие', 'Бэкэнд', 'Фронтэнд', 'Тестирование', 'Аналитика', 'Тест']
const other: string[] = ['Участвую', 'Ограничение по количеству']

interface Cities {
    id: string
    name: string
}
interface Events {
    eventId: string
    date: string
    time: string
    city: string
    name: string
    picURL: string
}

function Schedule() {
    const [cities, setCities] = useState<Cities[]>([])
    const [events, setEvents] = useState<Events[]>([])

    useEffect(() => {
        getEvents().then((data: any[]) => {
            const arr: Events[] = []
            data.map((e) => {
                const parsed = e.geteventsbyfilters
                    .replace('(', '')
                    .replace(')', '')
                    .replaceAll('"', '')
                    .replaceAll('\/', '')
                    .split(',' )

                arr.push({
                    eventId: parsed[0],
                    date: parsed[2],
                    time: parsed[3],
                    city: parsed[4],
                    name: parsed[1],
                    picURL: parsed[9],
                })

            })

            setEvents(arr)
        })

        getCities().then((data: any[]) => {
            const arr: Cities[] = []
            // eslint-disable-next-line array-callback-return
            data.map((e) => {
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
            <Column style={{width: '200px'}}>
                <Vertical>
                    <Title>Города</Title>
                    <Vertical>
                        {cities.map(item => {
                            return <RadioList key={nanoid()}>
                                <input type={"radio"} id={item?.id}/>
                                <label style={{marginLeft: '6px'}} htmlFor={item?.id}>{item?.name}</label>
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
            <Flex style={{width: '100%', justifyContent: 'center'}}>
                <Column style={{width: '700px'}}>
                    {events.map(item => {
                        return <Card key={nanoid()} data={item}/>
                    })}
                </Column>
            </Flex>
        </Flex>
    );
}


export default Schedule;
