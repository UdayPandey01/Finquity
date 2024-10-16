import { toast } from "sonner"
import {InferRequestType, InferResponseType}  from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import {client} from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.categories.$post>
type RequestType = InferRequestType<typeof client.api.categories.$post>["json"]

export const useCreateCategory = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn : async (json) =>{
            console.log("first")
            console.log(client.api.categories)
            const response = await client.api.categories.$post({ json })
            console.log("second")
            console.log(response)
            return await response.json()
        },
        onSuccess : () => {
            console.log("second")
            toast.success("Category Created")
            queryClient.invalidateQueries({queryKey : ["categories"]} );
        },
        onError : (error) => {
            toast.error("Failed to create category")
            console.error(error)
        }
    });
    return mutation;
}