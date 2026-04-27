import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
type MenuProps = {
	content: ReactNode;
};

export const Menu = ({ content }: MenuProps) => {
	return <VerLayout styles={styleMenu.menu}>{content}</VerLayout>;
};

const styleMenu = StyleSheet.create({
	menu: {
		width: '100%',
		alignItems: 'center',
		gap: 10,
	},
});
