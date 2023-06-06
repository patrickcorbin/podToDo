import { IonCard, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import { format } from "date-fns";
import { useSwiperSlide } from "swiper/react";

import './DateTaskCard.css';

interface ContainerProps {
    date: any;
}

const DateTaskCard: React.FC<ContainerProps> = ({ date }) => {

    const weekday = format(date, 'ccc')
    const day = format(date, 'dd')

    const swiperSlide = useSwiperSlide()

    return (
            <IonCard className="date-task-card">
                <IonCardSubtitle>{weekday}</IonCardSubtitle>
                <IonCardTitle>{day}</IonCardTitle>
            </IonCard>
    )
}

export default DateTaskCard