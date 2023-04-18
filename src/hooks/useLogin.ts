import { useMutation } from "react-query";
import { supabase } from "../supabaseClient";

const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export default function useLogin(email: string, password: string) {
    return useMutation('login', () => login(email, password))
}