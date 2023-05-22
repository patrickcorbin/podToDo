import { IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { cart, checkmarkCircle } from 'ionicons/icons';
import './Lists.css';

import { useGetLists } from '../hooks/useGetLists';

const Lists: React.FC = () => {

  const { data: lists } = useGetLists()

  const listDisplay = lists?.map(item => (
    <IonItem className="background-white"
      routerLink={`/app/lists/${item.id}`}
      key={item.id}
    >
      <IonIcon icon={item.list_type === 'grocery' ? cart : checkmarkCircle} slot='start' /> 
      {item.name}
    </IonItem>
  ))

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Lists</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Lists</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList className="container">
          {listDisplay}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Lists;
