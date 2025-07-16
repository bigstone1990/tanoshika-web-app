import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import FlashMessage from '@/components/flash-message';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <>
            <FlashMessage />
            <AuthLayoutTemplate title={title} description={description} {...props}>
                {children}
            </AuthLayoutTemplate>
        </>
    );
}
