import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import useGetLists from '../hooks/useGetLists';
// import { useEffect } from 'react';
import useGetItems from '../hooks/useGetItems';

const Tab3: React.FC = () => {

  const { data: lists } = useGetLists()

  const { data: items } = useGetItems(2)

  // useEffect(() => console.log('test'), [])

  const listDisplay = lists?.map(item => <h2>{item.name}</h2>)

  const itemDisplay = items?.map(item => <h3>{item.title}</h3>)

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
        {itemDisplay}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
