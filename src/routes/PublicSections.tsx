import { IonRouterOutlet } from "@ionic/react"
import { Route } from 'react-router-dom';
import Login from "../pages/Login"


const PublicSections: React.FC = () => {
    return (
        // <IonRouterOutlet>
            <Route path="/login">
                <Login />
            </Route>
        // </IonRouterOutlet>
    )
}

export default PublicSections