import { createContext, useContext, useEffect, useState } from 'react';
import { useGetItemsAll } from './hooks/useGetItems';
import { supabase } from './supabaseClient';

interface TaskContextType {
    taskArr: any[];
    toggleIsChecked: any;
}

const { data: items } = useGetItemsAll()

const TaskContext = createContext<TaskContextType>({
    taskArr: [],
    toggleIsChecked: async () => {}
})

export const useTasks = () => useContext(TaskContext)

export const TaskProvider = ({ children }: any) => {

    const [loading, setLoading] = useState<boolean>(true)

    const value = {
        items,
        taskArr: [],
        toggleIsChecked: async () => {}
    }

    return (
        <TaskContext.Provider value={value}>
            {!loading && children}
        </TaskContext.Provider>
    )
}