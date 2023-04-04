import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';

import ExploreContainer from '../components/ExploreContainer';
import './Lists.css';

import { supabase } from '../supabaseClient';

const Lists: React.FC = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
        .from('LISTS')
        .select()
        if (error) {
          throw new Error(error.message);
        }
        console.log(data);
      } catch (error) {
        // setError(error);
        console.log(error)
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  // useEffect(() => {
  //   const getLists = async () => {
  //     const { data, error } = await supabase
  //       .from('LISTS')
  //       .select()
  // })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  );
};

export default Lists;
