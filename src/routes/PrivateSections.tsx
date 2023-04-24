import { IonRouterOutlet } from "@ionic/react"
import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import Lists from '../pages/Lists';
import Tab3 from '../pages/Tab3';


const PrivateSections: React.FC = () => {
    return (
        // <IonRouterOutlet>
        <>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/lists">
                <Lists />
            </Route>
            <Route path="/tab3">
                <Tab3 />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
        </>
        // </IonRouterOutlet>
    )
}

export default PrivateSections