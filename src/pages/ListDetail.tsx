import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { cart, checkmarkCircle } from 'ionicons/icons';
import './ListDetail.css';

import useGetItems from '../hooks/useGetItems';

const Tab3: React.FC = () => {

  const { data: items } = useGetItems(2)

//   const listDisplay = lists?.map(item => (
//     <IonItem>
//       <IonIcon icon={item.list_type === 'grocery' ? cart : checkmarkCircle} slot='start' /> 
//       {item.name}
//     </IonItem>
//   ))

  const itemDisplay = items?.map(item => <h3>{item.title}</h3>)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton text="Back" defaultHref='/app/lists' />
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
            {itemDisplay}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;