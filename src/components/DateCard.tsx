import { format } from "date-fns";

interface ContainerProps {
    date: any;
}

const DateCard: React.FC<ContainerProps> = ({ date }) => {


    return (
        <h1>{format(date, 'MMM dd yyyy')}</h1>
    )
}

export default DateCard