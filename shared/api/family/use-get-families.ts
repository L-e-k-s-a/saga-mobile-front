import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";



const GET_FAMILIES = gql`
    query GetFamilies{
        getFamilies
    }
`


export const useGetFamilies = () => {
    const { data, loading, error, refetch } = useQuery(GET_FAMILIES)

    return {
        data,
        loading, 
        error, 
        refetch
    }
}