import { useQuery } from "react-query";
import { supabase } from "../supabaseClient";

const fetchLists = async () => {
    const { data, error } = await supabase
        .from('LISTS')
        .select()

    if(error) {
        throw new Error(error.message)
    }

    return data
}

export function useGetLists() {
    return useQuery('lists', () => fetchLists())
}