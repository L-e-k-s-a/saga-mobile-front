import { MARGINS } from '@/shared/constants/margins';
import { StyleSheet } from 'react-native';
import { VerLayout } from '../VerLayout/VerLayout';

type AlignContainerProps = {
	children: React.ReactNode;
};

export const AlignContainer = ({ children }: AlignContainerProps) => {
	return <VerLayout styles={stylesContainer.container}>{children}</VerLayout>;
};

const stylesContainer = StyleSheet.create({
	container: {
		flex: 1,
		margin: MARGINS.px20,
	},
});
