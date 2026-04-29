import { db, storage } from '@/firebase/firebase';
import { useUserStore } from '@/shared/store/user/user-store';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useSavePhoto = () => {
	const { activeFamily } = useUserStore();
	const [image, setImage] = useState<string | null>(null);
	const [uploading, setUploading] = useState(false);

	const savePhotoMeta = async (url: string, fileName: string) => {
		await addDoc(collection(db, 'album'), {
			url: url,
			fileName: fileName,
		});
	};

	const uploadingPhoto = async (image: string) => {
		if (!image) {
			Alert.alert('Ошибка', 'Сначала выберите фото');
			return;
		}

		try {
			const fileName = `${Date.now()}_${Math.random().toString(36)}.jpg`;
			const imageRef = ref(storage, `photos/${activeFamily}/${fileName}`);
			const response = await fetch(image);
			const blob = await response.blob();

			await uploadBytes(imageRef, blob);

			const downloadURL = await getDownloadURL(imageRef);

			setImage(null);
			Alert.alert('Успех', 'Фото успешно загружено');

			await savePhotoMeta(downloadURL, fileName);
		} catch (error) {
			Alert.alert('Ошибка', 'Не удалось загрузить фото');
		} finally {
			setUploading(false);
		}
	};

	return { uploadingPhoto };
};
