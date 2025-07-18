import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpenText, Building, Folder, House, LayoutGrid, UserPlus } from 'lucide-react';
import AppLogo from './app-logo';
import { type SharedData } from '@/types';
import { useMemo } from 'react';

const footerNavItems: NavItem[] = [
    {
        title: 'TANOSHIKAホームページ',
        href: 'https://tanoshika.jp/',
        icon: House,
    },
    {
        title: 'AKARI',
        href: 'https://akari-media.com/',
        icon: BookOpenText,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    const mainNavItems = useMemo<NavItem[]>(() => {
        const adminMainNavItems: NavItem[] = [
            {
                title: "ダッシュボード",
                href: '/admin/dashboard',
                icon: LayoutGrid,
            },
            {
                title: "管理者管理",
                href: '/admin/account/admins',
                icon: UserPlus,
            },
            {
                title: "事業所管理",
                href: '/admin/offices',
                icon: Building,
            },
        ];

        const userMainNavItems: NavItem[] = [
            {
                title: "ダッシュボード",
                href: '/dashboard',
                icon: LayoutGrid,
            },
        ];

        return auth.guard === 'admin' ? adminMainNavItems : userMainNavItems;
    }, [auth.guard]);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={auth.guard === "admin" ? "/admin" : "/"} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
