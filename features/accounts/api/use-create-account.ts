import { toast } from "sonner"
import {InferRequestType, InferResponseType}  from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import {client} from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.accounts.$post>
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"]

export const useCreateAccount = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn : async (json) =>{
            console.log("first")
            console.log(client.api.accounts)
            const response = await client.api.accounts.$post({ json })
            console.log("second")
            console.log(response)
            return await response.json()
        },
        onSuccess : () => {
            console.log("second")
            toast.success("Account Created")
            queryClient.invalidateQueries({queryKey : ["accounts"]} );
        },
        onError : (error) => {
            toast.error("Failed to create account")
            console.error(error)
        }
    });
    return mutation;
}