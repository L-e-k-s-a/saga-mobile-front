import React, { JSX } from 'react';
import Svg, { Circle, Line, Polyline, Rect } from 'react-native-svg';
import { COLORS } from '../constants/colors';

type IconType = 'rectangle' | 'circle' | 'line' | 'arrow';

export const ICONS: Record<IconType, JSX.Element> = {
	rectangle: (
		<Svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke={COLORS.secondary}
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<Rect
				x='3'
				y='3'
				width='18'
				height='18'
				rx='2'
				ry='2'
			/>
		</Svg>
	),
	circle: (
		<Svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke={COLORS.secondary}
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<Circle
				cx='12'
				cy='12'
				r='10'
			/>
		</Svg>
	),
	line: (
		<Svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke={COLORS.secondary}
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<Line
				x1='5'
				y1='12'
				x2='19'
				y2='12'
			/>
		</Svg>
	),
	arrow: (
		<Svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke={COLORS.secondary}
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<Line
				x1='5'
				y1='12'
				x2='19'
				y2='12'
			/>
			<Polyline points='12 5 19 12 12 19' />
		</Svg>
	),
};
