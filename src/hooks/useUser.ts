import { useQuery } from "react-query";
import { supabase } from "../supabaseClient";

const getUser = async (userId: string | undefined) => {
    const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', userId)
        .single()

    if(error) {
        throw new Error(error.message)
    }

    if(!data) {
        throw new Error("User not found")
    }

    return data
}

export default function useUser() {
    // const { data } = await supabase.auth.getSession()
    // const { data: { user } } = await supabase.auth.getUser()
    return useQuery('user', async () => {
        const { data } = await supabase.auth.getSession()
        console.log('fetch user')
        return getUser(data.session?.user.id)
    })
  }