import { useQuery } from "react-query";
import { supabase } from "../supabaseClient";

const fetchItems = async (listId: number) => {
    const { data, error } = await supabase
        .from('listitems')
        .select()
        .eq('list_id', listId)

        if (error) {
            throw new Error(error.message)
        }

        return data
}

export default function useGetItems(listId: number) {
    return useQuery('listItems', () => fetchItems(listId))
}