import { COLORS } from '@/shared/constants/colors';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { Typography } from '@/shared/ui/typography/typography';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export type Shape = 'rect' | 'circle' | 'line' | 'text';

type GenealogyToolbarProps = {
	selectedShape: Shape | null;
	onSelectedShape: (shape: Shape) => void;
};

const shapes = [
	{ type: 'rect', icon: '1', label: 'Блок' },
	{ type: 'circle', icon: '2', label: 'Круг' },
	{ type: 'line', icon: '3', label: 'Линия' },
	{ type: 'text', icon: '4', label: 'Текст' },
] as const;

export const GenealogyToolbar = ({
	selectedShape,
	onSelectedShape,
}: GenealogyToolbarProps) => {
	return (
		<View style={styles.container}>
			<Typography variant='h3' textColor='secondary' style={styles.title}>Инструменты</Typography>
			<HorLayout style={styles.shapes}>
				{shapes.map((shape) => (
					<TouchableOpacity
						key={shape.type}
						style={[
							styles.tool,
							selectedShape === shape.type && styles.toolActive,
						]}
						onPress={() => onSelectedShape(shape.type)}>
						<Typography
							style={[
								styles.toolIcon,
								selectedShape === shape.type && styles.toolIconActive,
							]}>
							{shape.icon}
						</Typography>
						<Typography
							style={[
								styles.toolLabel,
								selectedShape === shape.type && styles.toolLabelActive,
							]}>
							{shape.label}
						</Typography>
					</TouchableOpacity>
				))}
			</HorLayout>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 16,
		right: 16,
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
        marginBottom: 10
	},
    shapes: {
        gap: 10,
        width: '100%',
        justifyContent: 'center'
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
