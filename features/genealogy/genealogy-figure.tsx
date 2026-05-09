import { COLORS } from '@/shared/constants/colors';
import { ICONS } from '@/shared/icons/icons';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { Typography } from '@/shared/ui/typography/typography';
import { StyleSheet, TouchableOpacity, View, Modal, TextInput } from 'react-native';
import { useEffect, useState } from 'react';

export type Shape = 'rectangle' | 'circle' | 'line' | 'move' | 'trash' | 'hand';

type GenealogyFigureProps = {
	selectedShape: Shape;
	setSelectedShape: (shape: Shape) => void;
	isConnecting?: boolean;
	onCancelConnection?: () => void;
};

// Пропсы для модального окна
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

// Компонент модального окна для редактирования
export const EditFigureModal = ({ 
	visible, 
	onClose, 
	onSave, 
	initialTitle = '', 
	initialDescription = '' 
}: EditModalProps) => {
	const [title, setTitle] = useState(initialTitle);
	const [description, setDescription] = useState(initialDescription);

	// Обновляем состояния при изменении initial пропсов
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
		<Modal
			visible={visible}
			transparent={true}
			animationType="slide"
			onRequestClose={onClose}>
			<View style={modalStyles.overlay}>
				<View style={modalStyles.modalContainer}>
					<View style={modalStyles.modalHeader}>
						<Typography variant="h3">Редактировать фигуру</Typography>
					</View>
					
					<View style={modalStyles.inputContainer}>
						<Typography style={modalStyles.label}>Заголовок</Typography>
						<TextInput
							style={modalStyles.input}
							value={title}
							onChangeText={setTitle}
							placeholder="Введите заголовок..."
							maxLength={50}
							placeholderTextColor="#999"
						/>
					</View>

					<View style={modalStyles.inputContainer}>
						<Typography style={modalStyles.label}>Описание</Typography>
						<TextInput
							style={[modalStyles.input, modalStyles.textArea]}
							value={description}
							onChangeText={setDescription}
							placeholder="Введите описание..."
							multiline
							numberOfLines={4}
							maxLength={200}
							placeholderTextColor="#999"
						/>
					</View>

					<View style={modalStyles.modalButtons}>
						<TouchableOpacity style={modalStyles.cancelButton} onPress={onClose}>
							<Typography style={modalStyles.cancelButtonText}>Отмена</Typography>
						</TouchableOpacity>
						<TouchableOpacity style={modalStyles.saveButton} onPress={handleSave}>
							<Typography style={modalStyles.saveButtonText}>Сохранить</Typography>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
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
					<Typography style={styles.connectionText}>
						🔗 Выберите вторую фигуру для соединения
					</Typography>
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
						<View style={{ width: 24, height: 24 }}>{shape.icon}</View>
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
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
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
	modalButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
		gap: 10,
	},
	cancelButton: {
		flex: 1,
		padding: 12,
		backgroundColor: '#f5f5f5',
		borderRadius: 8,
		alignItems: 'center',
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