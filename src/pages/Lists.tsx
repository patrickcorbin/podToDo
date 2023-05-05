import { IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { cart, checkmarkCircle } from 'ionicons/icons';
import './Lists.css';

import useGetLists from '../hooks/useGetLists';
import useGetItems from '../hooks/useGetItems';

const Lists: React.FC = () => {

  const { data: lists } = useGetLists()

  const { data: items } = useGetItems(2)

  const listDisplay = lists?.map(item => (
    <IonItem className="background-white"
      routerLink='/app/lists/list'
    >
      <IonIcon icon={item.list_type === 'grocery' ? cart : checkmarkCircle} slot='start' /> 
      {item.name}
    </IonItem>
  ))

  const itemDisplay = items?.map(item => <h3>{item.title}</h3>)

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
        {itemDisplay}
      </IonContent>
    </IonPage>
  );
};

export default Lists;
