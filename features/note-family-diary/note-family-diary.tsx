import { COLORS } from '@/shared/constants/colors';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { Button } from '@/shared/ui/Button/Button';
import { StyleSheet } from 'react-native';

export const NoteFamilyDiary = () => {
	const handleClickAddNote = () => {};

	return (
		<VerLayout styles={styleFamilyDiary.container}>
			<Button
				text='Добавить'
				variant='secondary'
				onPress={handleClickAddNote}
				style={styleFamilyDiary.add}
			/>
		</VerLayout>
	);
};

const styleFamilyDiary = StyleSheet.create({
    container: {
        flex: 1
    },
    add:{
        position: 'absolute',
        bottom: 85,
        right: 0,
        width: 95
    }
});
