import { useUserStore } from '@/shared/store/user/user-store';
import { NoData } from '@/shared/ui/no-data/no-data';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { FlatList } from 'react-native';
import { CardNote } from '../card-note/card-note';
import { useGetNote } from '../hooks/use-get-note';

export const NoteGroup = () => {
	const { activeFamily } = useUserStore();
	const { notes, isLoading, error } = useGetNote(activeFamily);

	if (!activeFamily) {
		return (
			<NoData
				title='Похоже Вы не состоите в семье'
				desctiption='Быстрее создайте или вступите в семью!'
			/>
		);
	}

	if (error) {
		return;
	}

	if (!notes) {
		return;
	}

	if (isLoading) {
		return <Spinner />;
	}
	return notes.length > 0 ? (
		<>
			<FlatList
				data={notes}
				renderItem={({ item }) => <CardNote note={item} />}
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
