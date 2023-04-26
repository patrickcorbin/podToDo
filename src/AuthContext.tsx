import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

interface AuthContextType {
    session: Session | null | undefined;
    user: User | null | undefined;
    signIn: any;
    signUp: any;
    signOut: any;

}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    signIn: async () => {},
    signUp: async () => {},
    signOut: async () => {}
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: any) => {
    const [session, setSession] = useState<Session | null>()
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const setData = async () => {
            const { data: { session }, error } = await supabase.auth.getSession()

            if (error) throw error

            setSession(session)
            setUser(session?.user)
            setLoading(false)
        }

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user)
            setLoading(false)
        })

        setData()

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    const value = {
        session,
        user,
        signIn: async (email: string, password: string) => {
            const { error } = await supabase.auth.signInWithPassword({
              email,
              password,
            })
            if (error) throw error
        },
        signUp: async (email: string, password: string) => {
            const { error } = await supabase.auth.signUp({
                email,
                password
            })
            if (error) throw error
        },
        signOut: async () => {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
        }
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
    // useEffect(() => {
    //     const session = supabase.auth.getSession();
    //     setUser(session.user ?? null);
    //     setLoading(false);
    
    //     const { data: authListener } = supabase.auth.onAuthStateChange(
    //       async (event, session) => {
    //         setUser(session?.user ?? null);
    //         setLoading(false);
    //       }
    //     );
    
    //     return () => {
    //       authListener?.subscription.unsubscribe();
    //     };
    //   }, []);
