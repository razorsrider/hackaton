import { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import {colors} from '../styles/variables'
import {nanoid} from 'nanoid'
import { CalendarSelector } from './CalendarSelector'
import { Card } from './Card'
import { getCities } from "../api/api";

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

const directions: string[] = ['Все', 'Общие', 'Бэкэнд', 'Фронтэнд', 'Тестирование', 'Аналитика', 'Тест']
const other: string[] = ['Участвую', 'Ограничение по количеству']

interface Cities {
    id: string
    name: string
}

const data = [
    {
        date: new Date(2022, 8, 12),
        events: [
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
        ],
    },
    {
        date: new Date(2022, 8, 17),
        events: [
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
        ],
    },
    {
        date: new Date(2022, 8, 15),
        events: [
            {
                name: 'Помощь приюту',
                time: '18:00 - 20:00',
                city: 'Ульяновск',
                picURL: '',
                like: false
            },
        ],
    },
    {
        date: new Date(2022, 8, 23),
        events: [
            {
                name: 'Уборка Леса',
                time: '15:00 - 20:00',
                city: 'Саратов',
                picURL: '',
                like: false
            },
        ],
    },
]

function Calendar() {
    const [cities, setCities] = useState<Cities[]>([])
    const [selectedDay, setSelectedDay] = useState<Date>(new Date());
    const selectedEvents = useMemo(() => {
        const dataIndex = data.findIndex(item => item.date.getTime() === selectedDay.getTime());
        return dataIndex >= 0 ? data[dataIndex].events : []
    }, [selectedDay])


    useEffect(() => {
        getCities().then((data: any) => {
            const arr: Cities[] = [];
            // eslint-disable-next-line array-callback-return
            data?.map((e: { getcity: string }) => {
                const parsed = e.getcity.replace('(', '').replace(')', '').split(',' )
                arr.push({
                    id: parsed[0],
                    name: parsed[1]
                })
            })
            setCities(arr)
        });
    }, [])

    return (
        <Flex>
            <Column style={{width: '300px'}}>
                <Vertical>
                    <Title>Города</Title>
                    <Vertical>
                        {cities?.map(item => (
                            <RadioList key={nanoid()}>
                                <input type={"radio"} id={item?.id}/>
                                <label style={{marginLeft: '6px'}} htmlFor={item?.id}>{item?.name}</label>
                            </RadioList>
                        ))}
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
            <Column style={{width: '20%'}}>
                <CalendarSelector data={data} day={{selectedDay, setSelectedDay}} />
            </Column>
            <Column style={{width: '40%'}}>
                {selectedEvents?.map(item => {
                    return <Card key={nanoid()} data={item}/>
                })}

            </Column>
        </Flex>
    );
}


export default Calendar;
