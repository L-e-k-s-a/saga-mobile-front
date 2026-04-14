import { SignInForm } from '@/features/forms/sign-in-form/sign-in-form';
import { useGetFamilies } from '@/shared/api/family/use-get-families';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';

export function Auth() {
	const { data, loading, error } = useGetFamilies();

	console.log('data', data);

	return (
		<BackgroundContainer>
			<AlignContainer>
				<SignInForm />
			</AlignContainer>
		</BackgroundContainer>
	);
}
