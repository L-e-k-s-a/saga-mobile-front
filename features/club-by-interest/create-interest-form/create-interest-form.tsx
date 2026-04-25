import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { Interest } from '@/shared/types/interest';
import { Input } from '@/shared/ui/Input/Input';
import { useState } from 'react';

export const CreateInterestForm = () => {
	const [form, setForm] = useState<Interest>({
		title: '',
		moreDetails: '',
	});

	return (
		<VerLayout>
			<Input
				placeholder='Напиши тему интереса'
				value={form.title}
			/>
			<Input
				placeholder='Опишите подробнее, то чем хотели бы поделится'
				value={form.moreDetails}
			/>
		</VerLayout>
	);
};
