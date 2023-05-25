import { IonCard, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import { format } from "date-fns";

import './DateCard.css';

interface ContainerProps {
    date: any;
}

const DateCard: React.FC<ContainerProps> = ({ date }) => {

    const weekday = format(date, 'ccc')
    const day = format(date, 'dd')


    return (
        <IonCard className='date-card'>
            <IonCardSubtitle>{weekday}</IonCardSubtitle>
            <IonCardTitle>{day}</IonCardTitle>
        </IonCard>
    )
}

export default DateCard