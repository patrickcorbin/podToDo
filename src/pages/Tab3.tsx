import { IonContent, IonDatetime, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ListItem from '../components/ListItem';
import { useGetItemsByDate } from '../hooks/useGetItems';

import './Tab3.css';



const Tab3: React.FC = () => {

  const [date, setDate] = useState<any>(new Date().toISOString())

  const { data: items, refetch } = useGetItemsByDate(date)

  let itemDisplay = items?.map(item => (
    <ListItem
      key={item.id}
      item={item}
    />
  ))

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h2>Calendar</h2>
        <IonDatetime
          presentation='date'
          value={date}
          onIonChange={(e) => setDate(e.detail.value!)}
        >
        </IonDatetime>
        {itemDisplay}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;