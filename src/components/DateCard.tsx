import { format } from "date-fns";

interface ContainerProps {
    date: any;
}

const DateCard: React.FC<ContainerProps> = ({ date }) => {

    const weekday = format(date, 'ccc')
    const day = format(date, 'dd')


    return (
        <div className='date-card__container'>

        <h1>{weekday}, {day}</h1>
        </div>
    )
}

export default DateCard