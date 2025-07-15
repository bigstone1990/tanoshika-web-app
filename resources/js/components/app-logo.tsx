import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex w-full items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="w-full fill-current text-white dark:text-black bg-primary-foreground" />
            </div>
        </>
    );
}
