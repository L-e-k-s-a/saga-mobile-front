import { useImagePicker } from '@/shared/hooks/use-picker-image';
import { useUserStore } from '@/shared/store/user/user-store';
import { ButtonAdd } from '@/shared/ui/buttons/button-add/button-add';
import { NoData } from '@/shared/ui/no-data/no-data';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Photo } from './photo/photo';

export const Album = () => {
	const { activeFamily } = useUserStore();
	const { image, pickImage, isLoading } = useImagePicker();
	const [photos, setPhotos] = useState<string[]>([]);

	useEffect(() => {
		if (image) {
			setPhotos((prev) => [...prev, image]);
		}
	}, [image]);

	if (!activeFamily) {
		return (
			<NoData
				title='Похоже Вы не состоите в семье'
				desctiption='Быстрее создайте или вступите в семью!'
			/>
		);
	}

	const handleAddPhoto = async () => {
		await pickImage([3, 1]);
	};

	return (
		<>
			{photos.length > 0 ? (
				<FlatList
					data={photos}
					keyExtractor={(item, index) => item + index}
					renderItem={({ item }) => <Photo photo={item} />}
				/>
			) : (
				<NoData
					title='Ничего нет'
					desctiption='Добавьте фотографию!'
				/>
			)}
			<ButtonAdd action={handleAddPhoto} />
		</>
	);
};
