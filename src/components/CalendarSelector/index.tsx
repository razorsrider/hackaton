import { useCallback, useState } from 'react';
import { DayClickEventHandler, DayMouseEventHandler, DayPicker } from 'react-day-picker';
import ru from 'date-fns/locale/ru';

interface Day {
  selectedDay: Date
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>
}

interface Events {
  name: string
  time: string
  city: string
  picURL: string
  like: boolean
}

interface Data {
  date: Date
  events: Events[]
}

interface Props {
  day: Day
  data: Data[]
}

export const CalendarSelector = ({day, data}: Props) => {
  const selectedDays = data.map(item => item.date);
  const [amountDay, setAmountDay] = useState(-1);

  const handleDayClick: DayClickEventHandler = (date) => {
    day.setSelectedDay(date);
  };

  const handleDayFocus: DayMouseEventHandler = (date) => {
    const indexDay = data.findIndex(item => item.date.getTime() === date.getTime())

    if(indexDay >= 0) {
      setAmountDay(data[indexDay].events.length)
    } else { setAmountDay(-1) }
  };

  const footer = useCallback(() => (
    `На этот день запланированно ${amountDay > 0 ? amountDay : 0} мероприятий. Выбрано ${day.selectedDay.getDate()} число`
  ), [amountDay, day.selectedDay])

  return (
    <DayPicker
      weekStartsOn={ 1 }
      onDayClick={handleDayClick}
      onDayMouseEnter={handleDayFocus}
      selected={selectedDays}
      locale={ru}
      modifiersClassNames={{
        selected: 'my-selected',
        today: 'my-today'
      }}
      footer={footer()}
    />
  );
}
