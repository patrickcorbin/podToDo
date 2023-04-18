import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

import useUser from '../hooks/useUser';
import { useSupabase } from '../hooks/useSupabase';

const Home: React.FC = () => {

  const { logOut } = useSupabase()

  const { data } = useUser()

  // async function signOut() {
  //   await logOut()
  // }


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
      </IonContent>
    </IonPage>
  );
};

export default Home;
