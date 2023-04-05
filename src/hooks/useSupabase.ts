import { useIonLoading, useIonToast } from "@ionic/react";
import { useState } from "react";

import { supabase } from "../supabaseClient";

export function useSupabase() {

    const [lists, setLists] = useState([])

    const [loading, setLoading] = useState(false)
    const [showLoading, hideLoading] = useIonLoading()
    const [showToast] = useIonToast()

    const logIn = async (email: string, password: string) => {
        await showLoading();
        try {
          await supabase.auth.signInWithPassword({ email, password });
        //   await showToast({ message: 'Check your email for the login link!' });
        } catch (e: any) {
          await showToast({ message: e.error_description || e.message , duration: 5000});
        } finally {
          await hideLoading();
        }
    }

    const logOut = async () => {
        const { error } = await supabase.auth.signOut()
    }

    const getLists = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase
          .from('LISTS')
          .select()

          if (error) {
            throw new Error(error.message);
          }
          console.log(data);
        } catch (error) {
          // setError(error);
          console.log(error)
        } finally {
          setLoading(false);
        }
        // await showLoading()
        // try {
    
        //   const { error, data } = await supabase
        //     .from("LISTS")
        //     .select()
    
        //   if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block
    
        //   if (data) setLists(data);
    
        // } catch (error) {
        //   alert(error.error_description || error.message);
        // } finally {
        //   await hideLoading()
        // }
    }

    return {
        logIn,
        logOut,
        getLists
    }

}