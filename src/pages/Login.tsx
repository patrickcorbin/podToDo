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

import { useState, useEffect } from 'react';
// import { useSupabase } from '../hooks/useSupabase';
import useLogin from '../hooks/useLogin';
import { useAuth } from '../AuthContext';
import { supabase } from '../supabaseClient';

const Login: React.FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showLoading, hideLoading] = useIonLoading()
    const [showToast] = useIonToast()

    // const { logIn } = useSupabase()

    const loginMutation = useLogin(email, password)

    const { signIn, user } = useAuth()

    const router = useIonRouter()

    // const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     await logIn(email, password)
    // }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        loginMutation.mutate()
    }

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signIn(email, password)
        setEmail('')
        setPassword('')
    }

    const logIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await showLoading();
        try {
            await signIn(email, password)
        //   await supabase.auth.signInWithPassword({ email, password });
        //   await showToast({ message: 'Check your email for the login link!' });
        } catch (err: any) {
          await showToast({ message: err.error_description || err.message , duration: 5000});
        } finally {
        //   setEmail('')
          await hideLoading();
        }
    }

    useEffect(() => {
        // supabase.auth.onAuthStateChange((event, session) => {
        // if (event === 'SIGNED_IN') {
        //     console.log('signed in', session)
        //     router.push('/app/home', 'forward', 'replace')
        // }
        // })
        console.log('user var changed', user)
        if (user) {
            console.log('user var changed', user)
            router.push('/app/home', 'forward', 'replace')
        }
        
    }, [user])

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
                <form onSubmit={async (e) => handleSignIn(e)}>
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
                        // routerLink='/app/home'
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
  