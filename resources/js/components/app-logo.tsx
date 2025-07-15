import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex h-full items-center justify-center rounded-md bg-primary-foreground text-primary">
                <AppLogoIcon className="w-full fill-current text-white dark:text-black" />
            </div>
        </>
    );
}
