// import { Redirect } from 'react-router-dom';

// interface ContainerProps {
//     children: any;
//     session: any;
// }

// const PrivateRoute: React.FC<ContainerProps> = ({ children, session }) => {
//     return session 
//         ? children
//         : <Redirect to="/login" />
// }

// export default PrivateRoute

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
import Tab3 from '../pages/Tab3';


const PrivateRoute: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/home">
                    <Home />
                </Route>
                <Route exact path="/lists">
                    <Lists />
                </Route>
                <Route exact path="/tab3">
                    <Tab3 />
                </Route>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
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
        </IonTabs>
    )
}

export default PrivateRoute