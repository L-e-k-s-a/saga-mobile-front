import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const useImagePicker = (initialImage?: string) => {
  const [image, setImage] = useState(initialImage || '');
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async (aspect: [number, number] = [1, 1]) => {
    try {
      setIsLoading(true);
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Ошибка', 'Необходим доступ к галерее');
        return false;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: aspect,
        quality: 0.9,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        return true;
      }
      return false;
    } catch (error) {
      console.log('Ошибка при выборе фото:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить фото');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetImage = () => {
    setImage('');
  };

  return {
    image,
    setImage,
    isLoading,
    pickImage,
    resetImage,
  };
};