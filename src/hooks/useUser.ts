import { useQuery } from "react-query";
import { supabase } from "../supabaseClient";


const getUser = async () => {

  const { data: { user } } = await supabase.auth.getUser()

  return user

}

const getProfile = async () => {

    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await supabase
        .from('profiles')
        .select(`username, first_name, last_name`)
        .eq('id', user?.id)
        .single()

    if(error) {
        throw new Error(error.message)
    }

    return data

}

export function useUser() {
    return useQuery('user', () => getUser())
}

export function useProfile() {
    return useQuery('profile', () => getProfile())
}