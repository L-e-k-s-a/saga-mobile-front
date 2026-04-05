import { AuthForm } from '@/features/auth-form/auth-form';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';

export function Auth() {
	return (
		<BackgroundContainer>
			<AlignContainer>
				<AuthForm />
			</AlignContainer>
		</BackgroundContainer>
	);
}
