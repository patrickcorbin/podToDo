import { IonButton, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar, IonSkeletonText} from '@ionic/react';
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
        <IonButton 
          size="large" 
          onClick={logOut}
          routerLink={'/login'}
        >Logout</IonButton>
        {
          profile ? 
            <>
            <IonItem>
                {data?.email}
              </IonItem>
              <IonItem>
                  {profile?.first_name}
              </IonItem> 
            </> :
            <>
              <IonItem>
                <IonSkeletonText animated={true} style={{ 'width': '30%' }}></IonSkeletonText>
              </IonItem>
              <IonItem>
                <IonSkeletonText animated={true} style={{ 'width': '30%' }}></IonSkeletonText>
              </IonItem>
            </>
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
