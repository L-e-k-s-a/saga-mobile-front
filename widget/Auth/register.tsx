import { AuthForm } from '@/features/auth-form/auth-form';
import { RegisterForm } from '@/features/register-form/register-form';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';

export function Register() {
    return (
        <BackgroundContainer>
            <AlignContainer>
                <RegisterForm />
            </AlignContainer>
        </BackgroundContainer>
    );
}
