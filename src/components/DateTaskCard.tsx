import { IonCard, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import { format } from "date-fns";
import { useSwiperSlide } from "swiper/react";
import { useGetItemsByDate } from '../hooks/useGetItems';

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