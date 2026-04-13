import { AuthForm } from '@/features/forms/auth-form/auth-form';
import { useGetFamilies } from '@/shared/api/family/use-get-families';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';

export function Auth() {

	const { data, loading, error } = useGetFamilies()

	console.log("data", data)

	return (
		<BackgroundContainer>
			<AlignContainer>
				<AuthForm />
			</AlignContainer>
		</BackgroundContainer>
	);
}
