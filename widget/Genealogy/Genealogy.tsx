import { Genealogy } from '@/features/genealogy/genealogy';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';

export const GenealogyWidget = () => {
	const familyData = {
		rootId: '1',
		people: [
			{
				id: '1',
				name: 'Иван Петров',
				gender: 'male',
				birthDate: '1950',
				children: ['2', '3'],
				spouse: ['4'],
			},
			{
				id: '2',
				name: 'Мария Иванова',
				gender: 'female',
				birthDate: '1975',
				parents: ['1'],
				children: ['5'],
			},
			{
				id: '3',
				name: 'Петр Иванов',
				gender: 'male',
				birthDate: '1978',
				parents: ['1'],
				children: ['6'],
			},
			{
				id: '4',
				name: 'Елена Петрова',
				gender: 'female',
				birthDate: '1952',
				spouse: ['1'],
			},
			{
				id: '5',
				name: 'Анна Смирнова',
				gender: 'female',
				birthDate: '2000',
				parents: ['2'],
			},
			{
				id: '6',
				name: 'Дмитрий Иванов',
				gender: 'male',
				birthDate: '2005',
				parents: ['3'],
			},
		],
	};

	return (
		<BackgroundContainer>
			<AlignContainer>
				<Genealogy data={familyData}/>
			</AlignContainer>
		</BackgroundContainer>
	);
};
