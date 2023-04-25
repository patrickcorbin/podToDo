// import { Redirect } from 'react-router-dom';

// interface ContainerProps {
//     children: any;
//     session: any;
// }

// const PublicRoute: React.FC<ContainerProps> = ({ children, session }) => {
//     return session 
//         ? <Redirect to="/" />
//         : children
// }

// export default PublicRoute

import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import Login from '../pages/Login';


const PublicRoute: React.FC = () => {
    return (
        <IonRouterOutlet>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
    )
}

export default PublicRoute