import { useImagePicker } from '@/shared/hooks/use-picker-image';
import { ButtonAdd } from '@/shared/ui/buttons/button-add/button-add';
import { NoData } from '@/shared/ui/no-data/no-data';
import { FlatList } from 'react-native';
import { Photo } from './photo/photo';
import { useEffect, useState } from 'react';

export const Album = () => {
	const { image, pickImage, isLoading } = useImagePicker();
    const [photos, setPhotos] = useState<string[]>([])

    useEffect(() => {
		if (image) {
			setPhotos(prev => [...prev, image]);
		}
	}, [image]); 

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
