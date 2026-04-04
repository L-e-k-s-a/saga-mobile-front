import { RegisterForm } from '@/features/register-form/RegisterForm';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';

export function Auth() {
	return (
		<BackgroundContainer>
			<AlignContainer>
				<RegisterForm />
			</AlignContainer>
		</BackgroundContainer>
	);
}
