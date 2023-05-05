import { IonContent, IonHeader, IonItem, IonPage, IonSkeletonText, IonTitle, IonToolbar, IonThumbnail, IonLabel } from '@ionic/react';
import { useEffect, useState } from 'react';

import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

import { supabase } from '../supabaseClient';
import { useSupabase } from '../hooks/useSupabase';

const Tab3: React.FC = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const { getLists, lists } = useSupabase()

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
    // fetchData();
    getLists()
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
        {loading && <IonItem>
          <IonThumbnail slot="start">
              <IonSkeletonText animated={true}></IonSkeletonText>
            </IonThumbnail>
            <IonLabel>
              <h3>
                <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
              </h3>
              <p>
                <IonSkeletonText animated={true} style={{ 'width': '60%' }}></IonSkeletonText>
              </p>
              <p>
                <IonSkeletonText animated={true} style={{ 'width': '30%' }}></IonSkeletonText>
              </p>
            </IonLabel>
          </IonItem>
        }
        <h2>test 2</h2>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;