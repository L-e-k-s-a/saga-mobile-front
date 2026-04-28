import { COLORS } from '@/shared/constants/colors';
import { NoData } from '@/shared/ui/no-data/no-data';
import { FlatList } from 'react-native';
import { useGetNote } from '../hooks/use-get-note';
import { useUserStore } from '@/shared/store/user/user-store';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { CardNote } from '../card-note/card-note';
import { useEffect } from 'react';

type NoteGroupProps = {
	refetchTrigger: boolean
}

export const NoteGroup = ({refetchTrigger}: NoteGroupProps) => {
	const {activeFamily} = useUserStore()
	const {data: notes, isLoading, error, refetch} = useGetNote(activeFamily)

	useEffect(() => {
		refetch()
	}, [refetchTrigger])

	if(error){
		return
	}

	if(!notes){
		return
	}

	if(isLoading){
		return <Spinner />
	}


	console.log(notes)

	return notes.length > 0 ? (
		<>
			<FlatList
				data={notes}
				renderItem={({ item }) => <CardNote note={item}/>}
			/>
		</>
	) : (
		<NoData
			title='Ничего нет'
			desctiption='Быстрее добавьте хотя бы одну запись!'
			colorText='primary'
		/>
	);
};
