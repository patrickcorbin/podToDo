import { IonCard, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import { format } from "date-fns";
import { SwiperSlide, useSwiperSlide } from "swiper/react";

import './DateCard.css';

interface ContainerProps {
    date: any;
}

const DateCard: React.FC<ContainerProps> = ({ date }) => {

    const weekday = format(date, 'ccc')
    const day = format(date, 'dd')

    const swiperSlide = useSwiperSlide()

    return (
            <IonCard className={`date-card ${swiperSlide.isActive ? 'activeCard' : ''}`}>
                <IonCardSubtitle>{weekday}</IonCardSubtitle>
                <IonCardTitle>{day}</IonCardTitle>
            </IonCard>
    )
}

export default DateCard