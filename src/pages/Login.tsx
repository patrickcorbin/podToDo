import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
  } from '@ionic/react';

import './Login.css'

import { useState} from 'react';
// import { useSupabase } from '../hooks/useSupabase';
import useLogin from '../hooks/useLogin';

const Login: React.FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const [showLoading, hideLoading] = useIonLoading()
    // const [showToast] = useIonToast()

    // const { logIn } = useSupabase()

    const loginMutation = useLogin(email, password)

    // const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     await logIn(email, password)
    // }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        loginMutation.mutate()
    }

    // const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    //     console.log()
    //     e.preventDefault();
    //     await showLoading();
    //     try {
    //       await supabase.auth.signInWithPassword({ email, password });
    //       await showToast({ message: 'Check your email for the login link!' });
    //     } catch (e: any) {
    //       await showToast({ message: e.error_description || e.message , duration: 5000});
    //     } finally {
    //       await hideLoading();
    //     }
    // }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="background-white">
                <div className="ion-padding">
                <h1>Login</h1>
                </div>
                <IonList inset={true}>
                {/* <form onSubmit={handleLogin}> */}
                <form onSubmit={handleLogin}>
                    <IonItem>
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput
                        value={email}
                        name="email"
                        // onIonChange={(e) => setEmail(e.detail.value ?? '')}
                        onIonChange={(e) => setEmail(e.detail.value! as string)}
                        type="email"
                    ></IonInput>
                    </IonItem>
                    <IonItem>
                    <IonLabel position="stacked">Password</IonLabel>
                    <IonInput
                        value={password}
                        name="password"
                        // onIonChange={(e) => setEmail(e.detail.value ?? '')}
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
                        routerLink='/home'
                    >
                        Login
                    </IonButton>
                    </div>
                </form>
                </IonList>
            </IonContent>
      </IonPage>
    );
  };
  
  export default Login;
  