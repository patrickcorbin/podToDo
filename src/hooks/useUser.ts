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

// export default async function useUser() {
//     // const { data } = await supabase.auth.getSession()
//     const { data } = await supabase.auth.getUser()
//     // const { data: { user } } = await supabase.auth.getUser()
//     return useQuery('user', async () => {
//         console.log('fetch user')
//         // return await getUser(data.session?.user.id)
//         return await getUser(data.user?.id)
//     })
// }

export default async function useUser() {
    // const { data } = await supabase.auth.getSession()
    const { data } = await supabase.auth.getUser()
    // const { data: { user } } = await supabase.auth.getUser()
    return useQuery('user', () => getUser(data.user?.id))
}