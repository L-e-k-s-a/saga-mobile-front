import { COLORS } from '@/shared/constants/colors';
import { ICONS } from '@/shared/icons/icons';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { Typography } from '@/shared/ui/typography/typography';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export type Shape = 'rectangle' | 'circle' | 'line';

type GenealogyToolbarProps = {};

const shapes = [
	{ type: 'rectangle', icon: ICONS.rectangle, label: 'Блок' },
	{ type: 'circle', icon: ICONS.circle, label: 'Круг' },
	{ type: 'line', icon: ICONS.line, label: 'Линия' },
] as const;

export const GenealogyToolbar = ({}: GenealogyToolbarProps) => {
	const [selectedShape, setSelectedShape] = useState<Shape>('rectangle');
	return (
		<View style={styles.container}>
			<Typography
				variant='h3'
				textColor='secondary'
				style={styles.title}>
				Инструменты
			</Typography>
			<HorLayout style={styles.shapes}>
				{shapes.map((shape) => (
					<TouchableOpacity
						key={shape.type}
						style={[
							styles.tool,
							selectedShape === shape.type && styles.toolActive,
						]}
						onPress={() => setSelectedShape(shape.type)}>
						<View
							style={{ width: 24, height: 24 }}
>
							{shape.icon}
						</View>
						<Typography style={styles.toolLabel}>{shape.label}</Typography>
					</TouchableOpacity>
				))}
			</HorLayout>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		marginHorizontal: 10,
		backgroundColor: COLORS.white,
		borderRadius: 10,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 12,
		elevation: 8,
	},
	title: {
		width: '100%',
		textAlign: 'center',
		marginBottom: 10,
	},
	shapes: {
		gap: 10,
		width: '100%',
		justifyContent: 'center',
	},
	tool: {
		alignItems: 'center',
		padding: 12,
		borderRadius: 12,
		backgroundColor: '#f5f5f5',
		minWidth: 64,
	},
	toolActive: {
		backgroundColor: COLORS.secondary + '20',
		borderWidth: 1,
		borderColor: COLORS.secondary,
		borderStyle: 'solid',
	},
	toolIcon: {
		fontSize: 24,
		marginBottom: 4,
		color: '#999',
	},
	toolIconActive: {
		color: COLORS.secondary,
	},
	toolLabel: {
		fontSize: 11,
		color: '#999',
		fontWeight: '500',
	},
	toolLabelActive: {
		color: COLORS.secondary,
		fontWeight: '600',
	},
});
