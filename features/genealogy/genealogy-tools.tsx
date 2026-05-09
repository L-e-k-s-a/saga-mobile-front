import { COLORS } from '@/shared/constants/colors';
import { ICONS } from '@/shared/icons/icons';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { Typography } from '@/shared/ui/typography/typography';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Shape } from './genealogy-figure';

type GenealogyToolsProps = {
	selectedShape: Shape;
	setSelectedShape: (shape: Shape) => void;
};

const shapes = [
	{ type: 'trash' as Shape, icon: ICONS.trash, label: 'Стереть' },
	{ type: 'move' as Shape, icon: ICONS.move, label: 'Двигать' },
	{ type: 'hand' as Shape, icon: ICONS.hand, label: 'Рука' }
] as const;

export const GenealogyTools = ({
	selectedShape,
	setSelectedShape,
}: GenealogyToolsProps) => {
	return (
		<View style={styles.container}>
			<Typography
				variant='h3'
				textColor='secondary'
				style={styles.title}>
				Инструменты
			</Typography>

			{selectedShape === 'move' && (
				<View style={styles.moveBanner}>
					<Typography style={styles.moveText}>
						✋ Зажмите и перетащите фигуру для перемещения
					</Typography>
				</View>
			)}

			{selectedShape === 'hand' && (
				<View style={styles.handBanner}>
					<Typography style={styles.handText}>
						👆 Нажмите на фигуру, чтобы редактировать текст
					</Typography>
				</View>
			)}

			<HorLayout style={styles.shapes}>
				{shapes.map((shape) => (
					<TouchableOpacity
						key={shape.type}
						style={[
							styles.tool,
							selectedShape === shape.type && styles.toolActive,
							shape.type === 'move' &&
								selectedShape === 'move' &&
								styles.toolMoveActive,
							shape.type === 'hand' &&
								selectedShape === 'hand' &&
								styles.toolHandActive,
						]}
						onPress={() => setSelectedShape(shape.type)}>
						<View style={{ width: 24, height: 24 }}>{shape.icon}</View>
						<Typography 
							style={[
								styles.toolLabel,
								selectedShape === shape.type && styles.toolLabelActive
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
		left: 10,
		right: 10,
		bottom: 100,
		backgroundColor: COLORS.white,
		borderRadius: 10,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 12,
		elevation: 8,
		zIndex: 10,
	},
	title: {
		width: '100%',
		textAlign: 'center',
		marginBottom: 10,
	},
	moveBanner: {
		backgroundColor: '#FFF3E0',
		borderRadius: 8,
		padding: 12,
		marginBottom: 12,
		borderLeftWidth: 4,
		borderLeftColor: '#FF9800',
	},
	moveText: {
		fontSize: 14,
		color: '#E65100',
		fontWeight: '500',
	},
	handBanner: {
		backgroundColor: '#E8F5E9',
		borderRadius: 8,
		padding: 12,
		marginBottom: 12,
		borderLeftWidth: 4,
		borderLeftColor: '#4CAF50',
	},
	handText: {
		fontSize: 14,
		color: '#2E7D32',
		fontWeight: '500',
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
		backgroundColor: '#d9d9d9' + '5',
		outlineColor: COLORS.secondary + '20',
		outlineWidth: 3,
		outlineStyle: 'solid',
	},
	toolMoveActive: {
		backgroundColor: '#FF9800' + '20',
		outlineColor: '#FF9800',
		outlineWidth: 3,
		outlineStyle: 'solid',
	},
	toolHandActive: {
		backgroundColor: '#4CAF50' + '20',
		outlineColor: '#4CAF50',
		outlineWidth: 3,
		outlineStyle: 'solid',
	},
	toolLabel: {
		fontSize: 11,
		color: '#999',
		fontWeight: '500',
		marginTop: 4,
	},
	toolLabelActive: {
		color: COLORS.secondary,
		fontWeight: '600',
	},
});