import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../supabaseClient";

interface User {
    email: string;
    password: string;
}

const createUser = async (user: User) => {
    // Check if user email exists
    const { data: userWithUsername } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', user.email)
        .single()
    
    if (userWithUsername) {
        throw new Error('User with this email already exists')
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
        email: user.email,
        password: user.password
    })

    if (signUpError) {
        throw signUpError
    }

    return data
}

export default function useCreateUser(user: User) {
    return useMutation(() => createUser(user))
}