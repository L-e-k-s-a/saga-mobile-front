
import { SignInForm } from '@/features/forms';
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
