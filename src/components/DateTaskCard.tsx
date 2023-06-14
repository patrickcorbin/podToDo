import { IonBadge, IonCard, IonCardSubtitle, IonCardTitle, IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import { useSwiperSlide } from "swiper/react";
import { useGetItemsByDate } from '../hooks/useGetItems';
import { isPast, format, parseISO } from 'date-fns'

import './DateTaskCard.css';
import ListItem from "./ListItem";

interface ContainerProps {
    date: any;
}

const DateTaskCard: React.FC<ContainerProps> = ({ date }) => {

    const { data: items } = useGetItemsByDate(date.toISOString())

    const weekday = format(date, 'ccc')
    const day = format(date, 'MMMM dd')

    const swiperSlide = useSwiperSlide()

    let itemDisplay = items?.map(item => (
        <ListItem
          key={item.id}
          item={item}
        />
      ))

    return (
            <IonCard className="date-task-card">
                <IonCardSubtitle>{weekday}, {day}</IonCardSubtitle>
                {itemDisplay}
            </IonCard>
    )
}

export default DateTaskCard