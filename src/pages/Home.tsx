import { IonButton, IonContent, IonHeader, IonicSlides, IonItem, IonPage, IonTitle, IonToolbar, IonSkeletonText, IonDatetime, useIonViewDidEnter} from '@ionic/react';
import './Home.css';

import { useProfile } from '../hooks/useUser';
import { useAuth } from '../AuthContext';
import { useEffect, useLayoutEffect, useState } from 'react';
import DateCard from '../components/DateCard';

import { add, addDays, format, subDays } from 'date-fns';
import { Controller, Swiper as SwiperInterface } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useGetItemsByDate } from '../hooks/useGetItems';
import ListItem from '../components/ListItem';
import DateTaskCard from '../components/DateTaskCard';

const Home: React.FC = () => {

  const daySpan = 10

  const [currentDate, setCurrentDate] = useState<Date>(new Date)
  const [daysArr, setDaysArr] = useState<Date[]>([currentDate])
  // const [daySwiper, setDaySwiper] = useState<SwiperInterface>()
  // const [taskSwiper, setTaskSwiper] = useState<SwiperInterface>()
  const [swiperIndex, setSwiperIndex] = useState<number>(daySpan)
  // const [swiperDate, setSwiperDate] = useState<string>(new Date().toISOString())

  // const { logOut } = useSupabase()
  const { signOut, user } = useAuth()

  // const { data } = useUser()
  const { data: profile } = useProfile()

  // const { data } = useGetItemsByDate(daysArr[swiperIndex].toISOString())
  const { data: items, refetch } = useGetItemsByDate(daysArr[swiperIndex]?.toISOString())


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

  const dayTaskSwiper = daysArr.map((day: Date) => (
    <SwiperSlide
        key={Math.random()}
        className='swiper-slide'
    >
        <DateTaskCard 
          date={day}
        />
    </SwiperSlide>
  ))

  const getDaysArr = () => {
    const newArr = [currentDate]
    for (let i = 1; i <= daySpan; i++) {
      newArr.push(addDays(currentDate, i))
      newArr.unshift(subDays(currentDate, i))
    }
    setDaysArr([...newArr])
  }
  
  let itemDisplay = items?.map(item => (
    <ListItem
      key={item.id}
      item={item}
    />
  ))

  useLayoutEffect(() => {
    getDaysArr()
  }, [])

  useIonViewDidEnter(() => {
    console.log('view entered')
    refetch()
  })

  // useLayoutEffect(() => {
  //   daySwiper?.slideTo(daySpan, 1)
  //   // taskSwiper?.slideTo(daySpan, 1)
  // }, [daySwiper])

  // useEffect(() => {
  //   setSwiperDate(daysArr[swiperIndex])
  // }, [swiperIndex])

  // console.log(swiperDate.toISOString())

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
          id='day-swiper'
          className='swiper-container'
          modules={[Controller, IonicSlides]}
          slidesPerView={5}
          centeredSlides={true}
          // onSwiper={(swiper) => {
          //   setDaySwiper(swiper)
          //   setSwiperIndex(swiper.realIndex)
          // }}
          initialSlide={daySpan}
          // controller={{ control: taskSwiper }}
          onRealIndexChange={(swiper) => {
            setSwiperIndex(swiper.realIndex)
          }}
        >
          {daysSwiper}
        </Swiper>
        {itemDisplay}
        {/* <Swiper
          id='task-swiper'
          className='swiper-container-vertical'
          modules={[Controller, IonicSlides]}
          slidesPerView={3}
          centeredSlides={true}
          direction='vertical'
          onSwiper={(swiper) => setTaskSwiper(swiper)}
          initialSlide={daySpan}
          controller={{ control: daySwiper }}
          // onRealIndexChange={(swiper) => {
          //   setSwiperIndex(swiper.realIndex)
          // }}
        >
          {dayTaskSwiper}
        </Swiper> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
