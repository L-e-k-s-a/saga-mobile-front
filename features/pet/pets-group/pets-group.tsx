import { useUserStore } from '@/shared/store/user/user-store';
import { NoData } from '@/shared/ui/no-data/no-data';
import { useGetPets } from '../hooks/use-get-pets';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { FlatList } from 'react-native-gesture-handler';
import { CardPet } from '../card-pet/card-pet';

export const PetsGroup = () => {
	const { activeFamily } = useUserStore();
	const { pets, isLoading, error } = useGetPets(activeFamily);

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

    if(!pets){
        return 
    }

    if(isLoading){
        return <Spinner />
    }


    return (
        pets.length > 0 ? (
            <FlatList 
                data={pets}
                keyExtractor={item => item.description}
                renderItem={({item}) => <CardPet pet={item}/>}
            />
        ) : (
            <NoData title='У Вас нет ещё не одного питомца' desctiption='Добавьте питомца и информацию о нём'/>
        )
    )
};
