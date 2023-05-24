import { IonButton, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar, IonSkeletonText, IonDatetime, useIonViewDidEnter} from '@ionic/react';
import './Home.css';

import { useProfile } from '../hooks/useUser';
import { useAuth } from '../AuthContext';
import { useState } from 'react';


const Home: React.FC = () => {

  // console.log(format(date, 'MM/dd/yyyy'))

  // const { logOut } = useSupabase()
  const { signOut, user } = useAuth()

  // const { data } = useUser()
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
        <IonButton 
          size="large" 
          // onClick={logOut}
          onClick={signOut}
          routerLink={'/login'}
        >Logout</IonButton>
        {
          profile ? 
            <>
              <IonItem>
                {user?.email}
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
