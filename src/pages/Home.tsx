import { IonButton, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar, IonSkeletonText, IonDatetime, useIonViewDidEnter} from '@ionic/react';
import './Home.css';

import { useProfile } from '../hooks/useUser';
import { useAuth } from '../AuthContext';
import { useEffect, useState } from 'react';
import DateCard from '../components/DateCard';

import { add, addDays, format, subDays } from 'date-fns';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';

const Home: React.FC = () => {

  const [currentDate, setCurrentDate] = useState<Date>(new Date)
  const [daysArr, setDaysArr] = useState<Date[]>([])

  // const { logOut } = useSupabase()
  const { signOut, user } = useAuth()

  // const { data } = useUser()
  const { data: profile } = useProfile()

  // const swiper = useSwiper()

  const daysDisplay = daysArr.map((day: any) => (
    <DateCard 
      key={Math.random()}
      date={day}
    />
  ))

  const daysSwiper = daysArr.map((day: Date) => (
    <SwiperSlide
        key={Math.random()}
        className='swiper-slide'
    >
        <DateCard 
          date={day}
        />
    </SwiperSlide>
  ))

  const getDaysArr = () => {
    const newArr = [currentDate]
    for (let i = 1; i <= 10; i++) {
      newArr.push(addDays(currentDate, i))
      newArr.unshift(subDays(currentDate, i))
    }
    setDaysArr([...newArr])
  }

  useEffect(() => {
    getDaysArr()
  }, [])


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
        <Swiper
          className='swiper-container'
          slidesPerView={5}
          centeredSlides={true}
          initialSlide={10}
        >
          {daysSwiper}
        </Swiper>
        {/* {daysDisplay} */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
