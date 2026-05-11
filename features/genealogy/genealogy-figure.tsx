import { COLORS } from '@/shared/constants/colors';
import { ICONS } from '@/shared/icons/icons';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { styleForm } from '@/shared/styles/forms';
import { Button } from '@/shared/ui/buttons/button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { ModalWindow } from '@/shared/ui/modal/modal-window';
import { Typography } from '@/shared/ui/typography/typography';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export type Shape = 'rectangle' | 'circle' | 'line' | 'move' | 'trash' | 'hand' | 'eye';

type GenealogyFigureProps = {
	selectedShape: Shape;
	setSelectedShape: (shape: Shape) => void;
	isConnecting?: boolean;
	onCancelConnection?: () => void;
};

interface EditModalProps {
	visible: boolean;
	onClose: () => void;
	onSave: (title: string, description: string) => void;
	initialTitle?: string;
	initialDescription?: string;
}

const shapes = [
	{ type: 'rectangle' as Shape, icon: ICONS.rectangle, label: 'Блок' },
	{ type: 'circle' as Shape, icon: ICONS.circle, label: 'Круг' },
	{ type: 'line' as Shape, icon: ICONS.line, label: 'Линия' },
] as const;

export const EditFigureModal = ({
	visible,
	onClose,
	onSave,
	initialTitle = '',
	initialDescription = '',
}: EditModalProps) => {
	const [title, setTitle] = useState(initialTitle);
	const [description, setDescription] = useState(initialDescription);

	const disabled = title.trim() === ''

	useEffect(() => {
		if (visible) {
			setTitle(initialTitle);
			setDescription(initialDescription);
		}
	}, [visible, initialTitle, initialDescription]);

	const handleSave = () => {
		onSave(title, description);
		onClose();
	};

	return (
		<ModalWindow
			visible={visible}
			onClose={onClose}
			content={() => (
				<View>
					<View style={modalStyles.modalHeader}>
						<Typography
							variant='h3'
							textColor='secondary'>
							Информация
						</Typography>
					</View>

					<View style={modalStyles.inputContainer}>
						<Input
							style={styleForm.input}
							value={title}
							onChangeText={setTitle}
							placeholder='Ваш родственник'
						/>
					</View>

					<View style={modalStyles.inputContainer}>
						<Input
							style={[modalStyles.input, modalStyles.textArea]}
							value={description}
							onChangeText={setDescription}
							placeholder='Более подробное описание'
							multiline
						/>
					</View>

					<Button
						style={modalStyles.saveButton}
						onPress={handleSave}
						fullWidth
						text='Сохранить'
						disabled={disabled}
					/>
				</View>
			)}
		/>
	);
};

export const GenealogyFigure = ({
	selectedShape,
	setSelectedShape,
	isConnecting = false,
	onCancelConnection,
}: GenealogyFigureProps) => {
	return (
		<View style={styles.container}>
			<Typography
				variant='h3'
				textColor='secondary'
				style={styles.title}>
				Фигуры
			</Typography>

			{isConnecting && (
				<View style={styles.connectionBanner}>
					{onCancelConnection && (
						<TouchableOpacity
							style={styles.cancelButton}
							onPress={onCancelConnection}>
							<Typography style={styles.cancelButtonText}>✕ Отмена</Typography>
						</TouchableOpacity>
					)}
				</View>
			)}

			<HorLayout style={styles.shapes}>
				{shapes.map((shape) => (
					<TouchableOpacity
						key={shape.type}
						style={[
							styles.tool,
							selectedShape === shape.type && styles.toolActive,
							shape.type === 'line' && isConnecting && styles.toolConnecting,
						]}
						onPress={() => setSelectedShape(shape.type)}>
						<View>{shape.icon}</View>
						<Typography
							style={[
								styles.toolLabel,
								selectedShape === shape.type && styles.toolLabelActive,
							]}>
							{shape.type === 'line' && isConnecting
								? 'Соединение...'
								: shape.label}
						</Typography>
					</TouchableOpacity>
				))}
			</HorLayout>
		</View>
	);
};

const modalStyles = StyleSheet.create({
	modalContainer: {
		backgroundColor: COLORS.white,
		borderRadius: 12,
		padding: 20,
		width: '90%',
		maxWidth: 400,
	},
	modalHeader: {
		marginBottom: 20,
		alignItems: 'center',
	},
	inputContainer: {
		marginBottom: 16,
	},
	label: {
		marginBottom: 8,
		fontWeight: '500',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		padding: 10,
		fontSize: 16,
		backgroundColor: '#fff',
	},
	textArea: {
		minHeight: 80,
		textAlignVertical: 'top',
	},
	cancelButtonText: {
		color: '#666',
		fontWeight: '500',
	},
	saveButton: {
		flex: 1,
		padding: 12,
		backgroundColor: COLORS.secondary,
		borderRadius: 8,
		alignItems: 'center',
	},
	saveButtonText: {
		color: '#fff',
		fontWeight: '500',
	},
});

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 10,
		right: 10,
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
	connectionBanner: {
		backgroundColor: '#E3F2FD',
		borderRadius: 8,
		padding: 12,
		marginBottom: 12,
		borderLeftWidth: 4,
		borderLeftColor: '#2196F3',
	},
	connectionText: {
		fontSize: 14,
		color: '#1976D2',
		fontWeight: '500',
		marginBottom: 8,
	},
	cancelButton: {
		backgroundColor: '#FF5252',
		borderRadius: 6,
		padding: 8,
		alignItems: 'center',
	},
	cancelButtonText: {
		color: 'white',
		fontSize: 13,
		fontWeight: '600',
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
	toolConnecting: {
		backgroundColor: '#2196F3' + '20',
		outlineColor: '#2196F3',
		outlineWidth: 3,
		outlineStyle: 'solid',
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
