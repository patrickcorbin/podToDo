import { IonButton, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar, IonSkeletonText, IonDatetime, useIonViewDidEnter} from '@ionic/react';
import './Home.css';

import { useProfile, useUser } from '../hooks/useUser';
import { useSupabase } from '../hooks/useSupabase';
import { useAuth } from '../AuthContext';
import { useState } from 'react';
import { format } from 'date-fns'
import { useGetItemsByDate } from '../hooks/useGetItems';
import ListItem from '../components/ListItem';

const Home: React.FC = () => {

  const [date, setDate] = useState<any>(new Date().toISOString())

  // console.log(format(date, 'MM/dd/yyyy'))

  // const { logOut } = useSupabase()
  const { signOut, user } = useAuth()

  // const { data } = useUser()
  const { data: profile } = useProfile()

  const { data: items, refetch } = useGetItemsByDate(date)

  let itemDisplay = items?.map(item => (
    <ListItem 
      key={item.id}
      item={item}
    />
  ))

  useIonViewDidEnter(() => refetch())

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

export default Home;
