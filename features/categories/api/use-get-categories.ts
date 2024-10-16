import { useQuery } from "@tanstack/react-query";

import {client}  from "@/lib/hono"

export const useGetCategories = ()=>{
    
    const query = useQuery({
        queryKey : ["categories"],
        queryFn : async() =>{
            console.log("2")
            try {
                const response = await client.api.categories.$get();
                console.log(response)
    
                if(!response.ok){
                    throw new Error("Failed to fetch categories")
                }
    
                const { data } = await response.json()
                console.log(data)
                return data;
            }
           catch(e) {
            console.log('oops', e)
            return [];
           }
        },
    });
    return query;
}