import { NoData } from '@/shared/ui/no-data/no-data';
import { FlatList } from 'react-native';

export const NoteGroup = () => {
	const notes: string[] = [];

	return notes.length > 0 ? (
		<>
			<FlatList
				data={notes}
				renderItem={({ item }) => <></>}
			/>
		</>
	) : (
		<NoData
			title='Ничего нет'
			desctiption='Быстрее добавьте хотя бы одну запись!'
		/>
	);
};
