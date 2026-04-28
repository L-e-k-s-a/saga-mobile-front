import { useUserStore } from "@/shared/store/user/user-store"
import { useGetInterest } from "../hooks/use-get-interest"
import { Spinner } from "@/shared/ui/spinner/spinner"
import { FlatList } from "react-native-gesture-handler"
import { NoData } from "@/shared/ui/no-data/no-data"
import { CardInterest } from "../card-interest/card-interest"


export const ClubInterestGroup = () => {
    const { activeFamily } = useUserStore()
    const { interests, isLoading, error } = useGetInterest(activeFamily)

    if (!activeFamily) {
		return (
			<NoData
				title='Похоже Вы не состоите в семье'
				desctiption='Быстрее создайте или вступите в семью!'
			/>
		);
	}

    if(error){
        return
    }

    if(!interests){
        return 
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        interests.length > 0 ? (
            <FlatList 
                data={interests}
                keyExtractor={(item) => item.interesId}
                renderItem={({item}) => <CardInterest interest={item}/>}
            />
        ) : (
            <NoData title="Нет записей" desctiption="Быстрее добавьте, то что Вам интересно!"/>
        )
    )
}