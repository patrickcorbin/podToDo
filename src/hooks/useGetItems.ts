import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { supabase } from "../supabaseClient";

// Queries for list items

const fetchItems = async (listId: number) => {
    const { data, error } = await supabase
        .from('listItems')
        .select()
        .eq('list_id', listId)
        .order('id')

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export function useGetItems(listId: number) {
    return useQuery(['listItems', listId], () => fetchItems(listId), {
        refetchInterval: 1000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        retry: false,
        suspense: true,
      })
}

const fetchItem = async (itemId: number) => {
    const { data, error } = await supabase
        .from('listItems')
        .select()
        .eq('id', itemId)
        .single()

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
    const { data, error } = await supabase
        .from('listItems')
        .update(updates)
        .eq('id', itemId)
    
    if (error) {
        throw new Error(error.message)
    }

    // return data
}

export function useUpdateItem(itemId: number, updates: any) {
    const queryClient = useQueryClient()
    return useMutation('listItems', () => updateItem(itemId, updates)
    , {
        onSuccess: () => {
            queryClient.refetchQueries('listItems')
        }
    })
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

// const [listItems, setListItems] = useState()

// const listItemsSubscription = supabase.channel('custom-all-channel')
//   .on(
//     'postgres_changes',
//     { event: '*', schema: 'public', table: 'listItems' },
//     (payload) => {
//       console.log('Change received!', payload)
//     }
//   )
//   .subscribe()

// export function useUpdateItemsOptimistic() {
//     const queryClient = useQueryClient()

//     useMutation({
//         mutationFn: updateItem,
//         onMutate: async (newItem: any) => {
//             await queryClient.cancelQueries({ queryKey: ['listItems']})

//             const previousItems = queryClient.getQueryData(['listItems'])

//             queryClient.setQueryData(['listItems'], (old: any) => [...old, newItem])

//             return { previousItems }
//         },
//           // If the mutation fails,
//         // use the context returned from onMutate to roll back
//         onError: (err: any, newItem: any, context: any) => {
//             queryClient.setQueryData(['listItems'], context.previousTodos)
//         },
//         // Always refetch after error or success:
//         onSettled: () => {
//             queryClient.invalidateQueries({ queryKey: ['listItems'] })
//         },
//     })
// }

// const queryClient = useQueryClient()

// useMutation({
//   mutationFn: updateTodo,
//   // When mutate is called:
//   onMutate: async (newTodo) => {
//     // Cancel any outgoing refetches
//     // (so they don't overwrite our optimistic update)
//     await queryClient.cancelQueries({ queryKey: ['todos'] })

//     // Snapshot the previous value
//     const previousTodos = queryClient.getQueryData(['todos'])

//     // Optimistically update to the new value
//     queryClient.setQueryData(['todos'], (old) => [...old, newTodo])

//     // Return a context object with the snapshotted value
//     return { previousTodos }
//   },
//   // If the mutation fails,
//   // use the context returned from onMutate to roll back
//   onError: (err, newTodo, context) => {
//     queryClient.setQueryData(['todos'], context.previousTodos)
//   },
//   // Always refetch after error or success:
//   onSettled: () => {
//     queryClient.invalidateQueries({ queryKey: ['todos'] })
//   },
// })

// useMutation({
//     mutationFn: updateTodo,
//     // When mutate is called:
//     onMutate: async (newTodo) => {
//       // Cancel any outgoing refetches
//       // (so they don't overwrite our optimistic update)
//       await queryClient.cancelQueries({ queryKey: ['todos', newTodo.id] })
  
//       // Snapshot the previous value
//       const previousTodo = queryClient.getQueryData(['todos', newTodo.id])
  
//       // Optimistically update to the new value
//       queryClient.setQueryData(['todos', newTodo.id], newTodo)
  
//       // Return a context with the previous and new todo
//       return { previousTodo, newTodo }
//     },
//     // If the mutation fails, use the context we returned above
//     onError: (err, newTodo, context) => {
//       queryClient.setQueryData(
//         ['todos', context.newTodo.id],
//         context.previousTodo,
//       )
//     },
//     // Always refetch after error or success:
//     onSettled: (newTodo) => {
//       queryClient.invalidateQueries({ queryKey: ['todos', newTodo.id] })
//     },
//   })