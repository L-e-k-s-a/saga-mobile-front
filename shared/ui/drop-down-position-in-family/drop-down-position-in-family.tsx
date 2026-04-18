import { BORDER_RADII } from '@/shared/constants/borderRadii';
import { COLORS } from '@/shared/constants/colors';
import { FAMILY_MEMBERS_ROLE } from '@/shared/constants/family/family-role-members';
import { FONT_SIZE } from '@/shared/constants/font-size';
import { PADDINGS } from '@/shared/constants/paddings';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { capitalize } from '@/shared/lib/capitalize';
import { CreateFamilyFormType } from '@/shared/types/create-family-form-type';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
	Modal,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { Typography } from '../Typography/Typography';

type DropDownRegisterFormProps = {
	title: string;
	form: CreateFamilyFormType;
	onFormChange: (field: string, value: any) => void;
};

type Item = {
	role: string;
	ru: string;
};

export const DropDownPositionInFamily = ({
	form,
	title,
	onFormChange,
}: DropDownRegisterFormProps) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const handleDropDown = () => {
		setIsVisible(!isVisible);
	};

	const handleSelect = (item: Item) => {
		setIsVisible(false);
		onFormChange('positionInFamily', item.ru);
		onFormChange('role', item.role);
	};

	return (
		<>
			<HorLayout style={styleDropDown.dropDown}>
				<Typography style={styleDropDown.text}>
					{form.positionInFamily ? capitalize(form.positionInFamily) : title}
				</Typography>
				<TouchableOpacity onPress={handleDropDown}>
					{isVisible ? (
						<Ionicons
							style={styleDropDown.icon}
							name='chevron-up'
						/>
					) : (
						<Ionicons
							style={styleDropDown.icon}
							name='chevron-down'
						/>
					)}
				</TouchableOpacity>
			</HorLayout>
			<Modal
				visible={isVisible}
				transparent={true}
				animationType='fade'>
				<TouchableOpacity
					style={styleDropDown.modalOverlay}
					activeOpacity={1}
					onPress={() => setIsVisible(false)}>
					<View
						style={[
							styleDropDown.dropdownList,
							{
								bottom: 210,
								left: 0,
								right: 0,
							},
						]}>
						<ScrollView>
							{FAMILY_MEMBERS_ROLE.map((item: Item) => (
								<TouchableOpacity
									key={item.role}
									onPress={() => handleSelect(item)}
									style={styleDropDown.dropdownItem}>
									<Typography style={styleDropDown.text}>
										{capitalize(item.ru)}
									</Typography>
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>
				</TouchableOpacity>
			</Modal>
		</>
	);
};

const styleDropDown = StyleSheet.create({
	dropDown: {
		flexDirection: 'row',
		width: '80%',
		justifyContent: 'space-between',
		borderRadius: BORDER_RADII.primary,
		height: 52,
		borderWidth: 1,
		alignItems: 'center',
		backgroundColor: COLORS.white,
		zIndex: 1,
	},
	icon: {
		padding: PADDINGS.px10,
		paddingRight: PADDINGS.px16,
		fontSize: 24,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.3)',
	},
	dropdownList: {
		position: 'absolute',
		backgroundColor: COLORS.white,
		borderRadius: BORDER_RADII.primary,
		borderWidth: 1,
		maxHeight: 200,
		marginHorizontal: PADDINGS.px16,
		zIndex: 1000,
		elevation: 1000,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
	},
	dropdownItem: {
		paddingVertical: PADDINGS.px16,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.secondary,
	},
	text: {
		color: COLORS.black,
		paddingLeft: PADDINGS.px16,
		fontSize: FONT_SIZE.primary,
	},
});
