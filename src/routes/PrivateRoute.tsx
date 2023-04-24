import { Redirect } from 'react-router-dom';

interface ContainerProps {
    children: any;
    session: any;
}

const PrivateRoute: React.FC<ContainerProps> = ({ children, session }) => {
    return session 
        ? children
        : <Redirect to="/login" />
}

export default PrivateRoute

// import { Route, Redirect } from 'react-router-dom';

// interface ContainerProps {
//     component: any;
//     session: any;
// }

// const PrivateRoute: React.FC<ContainerProps> = ({ component: Component, session, ...rest }) => {

//     return (
//         <Route {...rest} render={props => {
//             if (!session) {
//                 // not logged in so redirect to login page with the return url
//                 // return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//                 return <Redirect to="/login" />
//             }

//             // authorized so return component
//             return <Component {...props} />
//         }} />
//     );
// }

// export default PrivateRoute