import { useQuery, useMutation, useQueryClient } from "react-query";
import { supabase } from "../supabaseClient";
import { add, formatISO, parseISO, sub } from 'date-fns'

// Queries for list items

const fetchItems = async (col: string, colId: any) => {
    const { data, error } = await supabase
        .from('listItems')
        .select()
        .eq(col, colId)
        .order('id')

    if (error) {
        throw new Error(error.message)
    }

    return data
}

const fetchItemsByDate = async (col: string, colDate: any) => {
    const startDate = formatISO(sub(parseISO(colDate), {days: 1}))
    const endDate = formatISO(add(parseISO(colDate), {days: 1}))
    const { data, error } = await supabase
        .from('listItems')
        .select()
        .gte(col, startDate)
        .lte(col, colDate)
        .order('id')

    if (error) {
        throw new Error(error.message)
    }

    return data
}

const fetchItemsAll = async () => {
    const { data, error } = await supabase
        .from('listItems')
        .select()
        .order('id')

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export function useGetItemsByList(listId: number) {
    return useQuery(['listItems', listId], () => fetchItems('list_id', listId))
}

export function useGetItemsByDate(dateISO: string) {
    return useQuery(['listItems', dateISO], () => fetchItemsByDate('due_date', dateISO))
}

export function useGetItemsAll() {
    return useQuery(['allItems'], () => fetchItemsAll())
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

// export function useUpdateItem(itemId: number, listId: number, updates: any) {
//     const queryClient = useQueryClient()
//     return useMutation('listItems', () => updateItem(itemId, updates)
//     , {
//         onSuccess: () => {
//             // queryClient.invalidateQueries({queryKey: ['listItems', listId]})
//             queryClient.refetchQueries('listItems')
//         }
//     })
// }

export function useUpdateItem(itemId: number, listId: number, updates: any) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => updateItem(itemId, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['listItems']})
            console.log('item updated')
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

export function useInsertItem(item: any) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => insertItem(item),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['listItems']})
            console.log('item inserted')
        }
    })
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

export function useDeleteItem(itemId: number) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => deleteItem(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['listItems']})
            console.log('item deleted')
        }
    })
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