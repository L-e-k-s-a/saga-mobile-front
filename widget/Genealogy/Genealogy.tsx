import { Genealogy } from '@/features/genealogy/genealogy';
import { COLORS } from '@/shared/constants/colors';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { useUserStore } from '@/shared/store/user/user-store';
import { NoData } from '@/shared/ui/no-data/no-data';
import { StyleSheet } from 'react-native';

export const GenealogyWidget = () => {
	const { activeFamily } = useUserStore();

	if (!activeFamily) {
		return (
			<NoData
				title='Похоже Вы не состоите в семье'
				desctiption='Быстрее создайте или вступите в семью!'
				style={styles.noData}
			/>
		);
	}
	return (
		<BackgroundContainer>
			<Genealogy />
		</BackgroundContainer>
	);
};


const styles = StyleSheet.create({
	noData: {
		backgroundColor: COLORS.primary
	}
})

