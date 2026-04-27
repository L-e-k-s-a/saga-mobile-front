import { COLORS } from '@/shared/constants/colors';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type Indicator = {
    importance: string,
    color: string
}

type IndicatorImportantProps = {
	typeIndicator: 'task' | 'tradition' | 'reminder'
    setIndicator: (value: string) => void
}

export const IndicatorImportant = ({typeIndicator, setIndicator}: IndicatorImportantProps) => {
	const indicatorsTaskAndReminder = [
		{ importance: 'hard', color: COLORS.brown },
		{ importance: 'middle', color: COLORS.yellow },
		{ importance: 'low', color: COLORS.green },
	];

	const indicatorsTradition = [
        { importance: 'hard', color: COLORS.blue },
        { importance: 'middle', color: COLORS.violet },
        { importance: 'low', color: COLORS.turquoise },
    ];

	const indicators = typeIndicator === 'tradition' ? indicatorsTradition : indicatorsTaskAndReminder

    const [activeIndicator, setActiveIndicator] = useState<Indicator | null>(indicators[0]);


	const handlePress = (indicator: Indicator) => {
        setActiveIndicator(indicator)
        setIndicator(indicator.importance)
    };

	return (
		<HorLayout style={styleIndicatorImportant.buttons}>
			{indicators.map((indicator: Indicator) => (
				<TouchableOpacity
                    key={indicator.importance}
					style={[
						styleIndicatorImportant.radio,
                        {backgroundColor: indicator.color},
                        activeIndicator?.importance === indicator.importance ? styleIndicatorImportant.active : styleIndicatorImportant.inactive
					]}
					onPress={() => handlePress(indicator)}
				/>
			))}
		</HorLayout>
	);
};

const styleIndicatorImportant = StyleSheet.create({
	buttons: {
		gap: 8,
	},
	radio: {
		padding: 16,
		borderRadius: '50%',
		backgroundColor: COLORS.black,
	},
	active: {
		borderWidth: 0.5,
		borderColor: COLORS.white,
	},
    inactive: {
        opacity: 0.35
    }
});
