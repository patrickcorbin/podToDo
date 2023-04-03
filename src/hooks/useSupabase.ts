import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY as string

export function useSupabase() {

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    return (
        supabase
    )

}