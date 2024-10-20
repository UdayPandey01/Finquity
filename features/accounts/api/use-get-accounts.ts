import { useQuery } from "@tanstack/react-query";

import {client}  from "@/lib/hono"

export const useGetAccounts = ()=>{
    
    const query = useQuery({
        queryKey : ["accounts"],
        queryFn : async() =>{
            console.log("2")
            try {
                const response = await client.api.accounts.$get();
                console.log(response)
    
                if(!response.ok){
                    throw new Error("Failed to fetch accounts")
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