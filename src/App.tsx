import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { checkbox, checkboxOutline, home, homeOutline, people, peopleOutline } from 'ionicons/icons';
import Home from './pages/Home';
import Lists from './pages/Lists';
import Tab3 from './pages/Tab3';
import Login from './pages/Login';

import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient';
import { Session } from '@supabase/supabase-js'

import PublicRoute from './routes/PublicRoute';
import PublicSections from './routes/PublicSections';
import PrivateRoute from './routes/PrivateRoute';
import PrivateSections from './routes/PrivateSections';
// import { useUser } from './hooks/useUser';
import Tabs from './pages/Tabs';
import { AuthProvider, useAuth } from './AuthContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Common styling */
import './theme/styles.css'


setupIonicReact();

const App: React.FC = () => {

  // const [session, setSession] = useState<Session | null>(null)

  // useEffect(() => {
  //   // setSession(supabase.auth.getSession())
  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session)
  //   })
  // }, [session])

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange((event, session) => {
  //     if (event == 'SIGNED_IN') {
  //       console.log('signed in', session)
  //     }
  //   })
  // }, [])

  const { user } = useAuth()

  console.log('test from app', user?.email)

  return (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Redirect to="/app/home" />
          </Route>
          {/* <Route exact path="/">
            <Redirect to="/login" />
          </Route> */}
          {/* <Route 
            exact path="/"
            render={() => {
              return user ? <Tabs /> : <Redirect to="/login" />
            }}
          /> */}
          <Route
            path="/app"
            render={() => {
              return user ? <Tabs /> : <Redirect to="/login" />
            }}
          />
          {/* <Route path="/app">
            <Tabs />
          </Route> */}
      </IonRouterOutlet>
      {/* <IonTabs>
        <IonRouterOutlet>

          <Route exact path="/home">
            <Home />
          </Route>
          <Route 
            exact path="/lists"
            render={() => {
              return session ? <Lists /> : <Redirect to="/login" />
            }}
          />
          <Route exact path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route 
            exact 
            path="/"
            render={() => {
              return session ? <Redirect to="/home" /> : <Login />
            }}
          />

        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon aria-hidden="true" className='selected' icon={home}  />
            <IonIcon aria-hidden="true" className = 'unselected' icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="lists" href="/lists">
          <IonIcon aria-hidden="true" className='selected' icon={checkbox}  />
            <IonIcon aria-hidden="true" className = 'unselected' icon={checkboxOutline} />
            <IonLabel>Lists</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" className='selected' icon={people}  />
            <IonIcon aria-hidden="true" className = 'unselected' icon={peopleOutline} />
            <IonLabel>Pods</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs> */}
    </IonReactRouter>
  </IonApp>
)};

export default App;
