import { IonButton, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

import useUser from '../hooks/useUser';
import { useSupabase } from '../hooks/useSupabase';
import { supabase } from '../supabaseClient';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {

  const { logOut } = useSupabase()
  const [session] = useState(() => supabase.auth.getSession())

  const [profile, setProfile] = useState({
    username: '',
    first_name: '',
    last_name: '',
  });

  const getProfile = async () => {
    console.log('get profile');
    const { data: { user } } = await supabase.auth.getUser()
    try {
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, first_name, last_name`)
        .eq('id', user?.id)
        .single();
      if (data) {
        setProfile({
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
        })
        console.log(profile)
      }
      console.log(user)
    } catch (error: any) {
      throw error
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  // const { data } = useUser()

  // async function signOut() {
  //   await logOut()
  // }

  // console.log(data)


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
        <IonItem>test</IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
