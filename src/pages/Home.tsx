import { IonButton, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

import { useProfile, useUser } from '../hooks/useUser';
import { useSupabase } from '../hooks/useSupabase';

const Home: React.FC = () => {

  const { logOut } = useSupabase()

  const { data } = useUser()
  const { data: profile } = useProfile()


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Test</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
        <IonButton size="large" onClick={logOut}>Logout</IonButton>
        <IonItem>{data?.email}</IonItem>
        <IonItem>{profile?.first_name}</IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
