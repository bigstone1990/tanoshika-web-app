import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useCallback, useMemo } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { type ShowUser } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'ユーザー一覧',
        href: '/admin/account/users',
    },
    {
        title: 'ユーザー詳細',
        href: '',
    },
];

type PermissionKey = 'can_manage_jobs' | 'can_manage_rules' | 'can_manage_groupings';

type Permission = {
    key: PermissionKey;
    label: string;
    description: string;
};

const PERMISSIONS: readonly Permission[] = [
    {
        key: 'can_manage_jobs',
        label: '求人管理機能',
        description: '求人の管理ができるようになります',
    },
    {
        key: 'can_manage_rules',
        label: 'ルールブック管理機能',
        description: 'ルールブックの管理ができるようになります',
    },
    {
        key: 'can_manage_groupings',
        label: 'グループ分け管理機能',
        description: 'グループ分けの管理ができるようになります',
    },
] as const;

interface ShowProps {
    user: ShowUser;
}

export default function Create({ user }: ShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="ユーザー詳細" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <section className="max-w-xl">
                    <header className="flex flex-col space-y-1.5">
                        <h2 className="font-semibold tracking-tight text-xl">
                            ユーザー詳細
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            ユーザーの詳細を確認できます。
                        </p>
                    </header>

                    <div className="mt-6">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="id">ID</Label>

                                <Input
                                    id="id"
                                    type="text"
                                    value={user.id}
                                    readOnly
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">名前</Label>

                                <Input
                                    id="name"
                                    type="text"
                                    value={user.name}
                                    readOnly
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="kana">カナ</Label>

                                <Input
                                    id="kana"
                                    type="text"
                                    value={user.kana}
                                    readOnly
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">メールアドレス</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    value={user.email}
                                    readOnly
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="role">役割</Label>

                                <Input
                                    id="role"
                                    type="text"
                                    value={user.role}
                                    readOnly
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="office">所属事業所</Label>

                                <Input
                                    id="office"
                                    type="text"
                                    value={user.office}
                                    readOnly
                                />
                            </div>

                            <div className="grid gap-2">
                                <p className="text-sm leading-none font-medium select-none">
                                    権限設定<span className="text-destructive"> *役割によっては機能の一部が制限されます</span>
                                </p>

                                <div className="space-y-4">
                                    {PERMISSIONS.map(permission => (
                                        <div key={permission.key}>
                                            <Label
                                                htmlFor={permission.key}
                                                className="gap-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                                            >
                                                <div className="space-y-0.5">
                                                    <div className="text-sm font-medium select-none">
                                                        {permission.label}<br />
                                                        <span className="text-muted-foreground text-sm font-normal">
                                                            {permission.description}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Switch
                                                    id={permission.key}
                                                    checked={user[permission.key]}
                                                />
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="created_at">作成日時</Label>

                                <Input
                                    id="created_at"
                                    type="text"
                                    value={user.created_at}
                                    readOnly
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="creator">作成者</Label>

                                <Input
                                    id="creator"
                                    type="text"
                                    value={user.creator ?? 'なし'}
                                    readOnly
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="updated_at">更新日時</Label>

                                <Input
                                    id="updated_at"
                                    type="text"
                                    value={user.updated_at}
                                    readOnly
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="updater">更新者</Label>

                                <Input
                                    id="updater"
                                    type="text"
                                    value={user.updater ?? 'なし'}
                                    readOnly
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <Link
                                    href={route('admin.account.users.index')}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-9 px-4 py-2 has-[>svg]:px-3"
                                >
                                    一覧に戻る
                                </Link>
                                <Link
                                    href={route('admin.account.users.edit', { user: user.id })}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
                                >
                                    編集する
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
