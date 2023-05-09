import { useQuery } from "react-query";
import { supabase } from "../supabaseClient";

// Queries for list items

const fetchItems = async (listId: number) => {
    const { data, error } = await supabase
        .from('listItems')
        .select()
        .eq('list_id', listId)

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export function useGetItems(listId: number) {
    return useQuery('listItems', () => fetchItems(listId))
}

const fetchItem = async (itemId: number) => {
    const { data, error } = await supabase
        .from('listItems')
        .select()
        .eq('id', itemId)

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export function useGetItem(itemId: number) {
    return useQuery('listItem', () => fetchItem(itemId))
} 

// Update item functions

export const updateItem = async (itemId: number, updates: any) => {
    const { error } = await supabase
        .from('listItems')
        .update(updates)
        .eq('id', itemId)
    
    if (error) {
        throw new Error(error.message)
    }
}

export const insertItem = async (item: any) => { 
    const { error } = await supabase
        .from('listItems')
        .insert(item)
    
    if (error) {
        throw new Error(error.message)
    }
}

export const deleteItem = async (itemId: number) => {
    const { error } = await supabase
        .from('listItems')
        .delete()
        .eq('id', itemId)

    if (error) {
        throw new Error(error.message)
    }
}