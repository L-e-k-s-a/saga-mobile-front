import { COLORS } from '@/shared/constants/colors';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { Typography } from '@/shared/ui/typography/typography';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

type NoDataProps = {
	title?: string;
	desctiption?: string;
	style?: StyleProp<ViewStyle>;
	colorText?: 'primary' | 'secondary';
};

export const NoData = ({
	title = 'Данных нет',
	desctiption = 'Добавьте данные',
	style,
	colorText = 'primary',
}: NoDataProps) => {
	return (
		<VerLayout styles={[style, styleNoData.noDataContainer]}>
			<Typography
				variant='h3'
				style={styleNoData[colorText]}>
				{title}
			</Typography>
			<Typography style={styleNoData[colorText]}>{desctiption}</Typography>
		</VerLayout>
	);
};

const styleNoData = StyleSheet.create({
	noDataContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	primary: {
		color: COLORS.white
	},
	secondary: {
		color: COLORS.black
	}
});
