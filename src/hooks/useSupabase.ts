import { useIonLoading, useIonToast } from "@ionic/react";
import { useState } from "react";

import { supabase } from "../supabaseClient";

export function useSupabase() {

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

    return {
        logIn,
        logOut
    }

}