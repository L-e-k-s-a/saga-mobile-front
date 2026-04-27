import { COLORS } from '@/shared/constants/colors';
import { Card } from '@/shared/ui/card/card';

import { Image, StyleSheet } from 'react-native';

type PhotoProps = {
	photo: string;

};

export const Photo = ({ photo }: PhotoProps) => {

	return (
		<Card style={stylePhoto.container}>
			<Image source={{uri: photo}} style={stylePhoto.image}/>
		</Card>
	)
};

const stylePhoto = StyleSheet.create({
	container: {
		height: 200,
		padding: 0
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 10
	}
});
