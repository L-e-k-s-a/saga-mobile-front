import { SignInForm } from '@/features/sign-in-form/SignInForm';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';

export function SignIn() {
    return (
        <BackgroundContainer>
            <AlignContainer>
                <SignInForm />
            </AlignContainer>
        </BackgroundContainer>
    );
}
