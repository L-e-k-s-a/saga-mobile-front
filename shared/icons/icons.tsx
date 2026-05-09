import React, { JSX } from 'react';
import Svg, { Circle, Line, Path, Polyline, Rect } from 'react-native-svg';
import { COLORS } from '../constants/colors';

type IconType = 'rectangle' | 'circle' | 'line' | 'arrow' | 'trash' | 'move';

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
	trash: (
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
				x1='2'
				y1='6'
				x2='22'
				y2='6'
			/>
			<Path d='M6 6 L8 20 C8.2 21.5 9.5 22 12 22 C14.5 22 15.8 21.5 16 20 L18 6' />
			<Line
				x1='8'
				y1='4'
				x2='16'
				y2='4'
			/>
			<Line
				x1='10'
				y1='11'
				x2='10'
				y2='18'
			/>
			<Line
				x1='14'
				y1='11'
				x2='14'
				y2='18'
			/>
		</Svg>
	),
	move: (
		<Svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke={COLORS.secondary}
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<Polyline points='5 9 2 12 5 15' />
			<Polyline points='9 5 12 2 15 5' />
			<Polyline points='15 19 12 22 9 19' />
			<Polyline points='19 9 22 12 19 15' />
			<Line
				x1='2'
				y1='12'
				x2='22'
				y2='12'
			/>
			<Line
				x1='12'
				y1='2'
				x2='12'
				y2='22'
			/>
		</Svg>
	),
};
