import { IonButton, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar, IonSkeletonText, IonDatetime, useIonViewDidEnter} from '@ionic/react';
import './Home.css';

import { useProfile } from '../hooks/useUser';
import { useAuth } from '../AuthContext';
import { useState } from 'react';
import DateCard from '../components/DateCard';
import { format } from 'date-fns';


const Home: React.FC = () => {

  const [currentDate, setCurrentDate] = useState<Date>(new Date)
  const [daysArr, setDaysArr] = useState<any>([currentDate])

  // const { logOut } = useSupabase()
  const { signOut, user } = useAuth()

  // const { data } = useUser()
  const { data: profile } = useProfile()

  const daysDisplay = daysArr.map((day: any) => (
    <DateCard 
      key={Math.random()}
      date={currentDate}
    />
  ))


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
        {daysDisplay}
      </IonContent>
    </IonPage>
  );
};

export default Home;
