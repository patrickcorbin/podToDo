import { Redirect } from 'react-router-dom';

interface ContainerProps {
    children: any;
    session: any;
}

const PublicRoute: React.FC<ContainerProps> = ({ children, session }) => {
    return session 
        ? <Redirect to="/" />
        : children
}

export default PublicRoute