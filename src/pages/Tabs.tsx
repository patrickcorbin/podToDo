import { Redirect, Route } from 'react-router-dom';
import {
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from '@ionic/react';
import { checkbox, checkboxOutline, home, homeOutline, people, peopleOutline } from 'ionicons/icons';
import Home from '../pages/Home';
import Lists from '../pages/Lists';
import Tab3 from './Tab3';
import ProtectedRoute from '../components/ProtectedRoute';



const Tabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/app/home">
                    <Home />
                </Route>
                <Route path="/app/lists">
                    <Lists />
                </Route>
                <Route exact path="/app/tab3">
                    <ProtectedRoute>
                        <Tab3 />
                    </ProtectedRoute>
                </Route>
                <Route exact path="/app/">
                    <Redirect to="/app/home" />
                </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/app/home">
                    <IonIcon aria-hidden="true" className='selected' icon={home}  />
                    <IonIcon aria-hidden="true" className = 'unselected' icon={homeOutline} />
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="lists" href="/app/lists">
                <IonIcon aria-hidden="true" className='selected' icon={checkbox}  />
                    <IonIcon aria-hidden="true" className = 'unselected' icon={checkboxOutline} />
                    <IonLabel>Lists</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/app/tab3">
                    <IonIcon aria-hidden="true" className='selected' icon={people}  />
                    <IonIcon aria-hidden="true" className = 'unselected' icon={peopleOutline} />
                    <IonLabel>Pods</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default Tabs