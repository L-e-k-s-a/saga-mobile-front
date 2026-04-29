import { storage } from '@/firebase/firebase';
import { useUserStore } from '@/shared/store/user/user-store';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { useState } from 'react';

export const useGetPhotos = () => {
	const { activeFamily } = useUserStore();
	const [photos, setPhotos] = useState<{}>([]);
	const [isLoading, setIsLoading] = useState(false);

	const getPhotos = async () => {
		try {
			const listRef = ref(storage, `photos/${activeFamily}`);

			const result = await listAll(listRef);
			const photoList = await Promise.all(
				result.items.map(async (itemRef) => {
					const url = await getDownloadURL(itemRef);
					return {
						id: itemRef.name,
						url: url,
						name: itemRef.name,
					};
				}),
			);

			setPhotos(photoList);
		} catch (error) {
			console.error('Ошибка загрузки фото:', error);
		} finally {
			setIsLoading(false);
		}
	};

    return {
        photos, isLoading
    }
};
