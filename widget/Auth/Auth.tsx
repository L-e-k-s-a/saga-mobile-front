import { SignInForm } from '@/features/forms/sign-in-form/sign-in-form';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';

export function Auth() {
	return (
		<BackgroundContainer>
			<AlignContainer>
				<SignInForm />
			</AlignContainer>
		</BackgroundContainer>
	);
}
