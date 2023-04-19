import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import useGetLists from '../hooks/useGetLists';
import { useEffect } from 'react';

const Tab3: React.FC = () => {

  const { data } = useGetLists()

  useEffect(() => console.log('test'), [])

  const listDisplay = data?.map(item => <h2>{item.name}</h2>)

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
        <ExploreContainer name="Tab 3 page" />
        {listDisplay}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
