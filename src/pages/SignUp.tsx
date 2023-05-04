import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonLoading,
    useIonRouter,
    useIonToast
  } from '@ionic/react';

import './Login.css'

import { useState} from 'react';
import { useAuth } from '../AuthContext';

const SignUp: React.FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signUp } = useAuth()

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signUp(email, password)
        setEmail('')
        setPassword('')
    }

    return (
        <IonPage>
            {/* <IonHeader>
                <IonToolbar>
                <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader> */}

            <IonContent className="background-white">
                <div className="ion-padding">
                <h1>Create an Account</h1>
                </div>
                <IonList inset={true}>
                <form onSubmit={async (e) => handleSignUp(e)}>
                    <IonItem>
                    <IonInput
                        value={email}
                        name="email"
                        label='Email'
                        labelPlacement='stacked'
                        onIonChange={(e) => setEmail(e.detail.value! as string)}
                        type="email"
                    ></IonInput>
                    </IonItem>
                    <IonItem>
                    <IonInput
                        value={password}
                        name="password"
                        label='Password'
                        labelPlacement='stacked'
                        onIonChange={(e) => setPassword(e.detail.value! as string)}
                        type="password"
                    ></IonInput>
                    </IonItem>
                    <div className="ion-text-center">
                    <IonButton 
                        className='login-btn'
                        type='submit' 
                        size='large'
                        expand='block'
                        routerLink='/login'
                    >
                        Create Account
                    </IonButton>
                    </div>
                </form>
                </IonList>
            </IonContent>
      </IonPage>
    );
  };
  
  export default SignUp;
  