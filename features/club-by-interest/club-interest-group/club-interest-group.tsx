import { useUserStore } from "@/shared/store/user/user-store"
import { useGetInterest } from "../hooks/use-get-interest"
import { Spinner } from "@/shared/ui/spinner/spinner"
import { FlatList } from "react-native-gesture-handler"
import { NoData } from "@/shared/ui/no-data/no-data"
import { CardInterest } from "../card-interest/card-interest"
import { useEffect } from "react"


type CardInterestGroupProps = {
    refetchTrigger: boolean
}

export const ClubInterestGroup = ({refetchTrigger}: CardInterestGroupProps) => {
    const { activeFamily } = useUserStore()
    const { data: interestes, isLoading, error, refetch } = useGetInterest(activeFamily)
    
    useEffect(() => {
        refetch()
    }, [refetchTrigger])

    if(error){
        return
    }

    if(!interestes){
        return 
    }

    if(isLoading){
        return <Spinner />
    }


    return (
        interestes.length > 0 ? (
            <FlatList 
                data={interestes}
                keyExtractor={(item) => item.interesId}
                renderItem={({item}) => <CardInterest interest={item}/>}
            />
        ) : (
            <NoData title="Нет записей" desctiption="Быстрее добавьте, то что Вам интересно!"/>
        )
    )
}