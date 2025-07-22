import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useCallback, useMemo } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { type Option } from '@/types';

import Combobox from '@/components/combobox';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'ユーザー一覧',
        href: '/admin/account/users',
    },
    {
        title: 'ユーザー作成',
        href: '/admin/account/users/create',
    },
];

interface Office {
    id: number;
    name: string;
}

type FormDataType = {
    name: string;
    kana: string;
    email: string;
    role: number | null;
    office: number | null;
    can_manage_jobs: boolean;
    can_manage_rules: boolean;
    can_manage_groupings: boolean;
};

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

interface CreateProps {
    roles: Option[];
    offices: Office[];
}

export default function Create({ roles, offices }: CreateProps) {
    const officeOptions = useMemo(() => {
        const mappedOffices = offices.map(office => ({
            label: office.name,
            value: office.id,
        }));
        return [{ label: '未所属', value: 0 }, ...mappedOffices];
    }, [offices]);

    const roleOptions = useMemo(() => {
        return [{ label: '未設定', value: 0 }, ...roles];
    }, [roles]);

    const { data, setData, post, processing, errors } = useForm<Required<FormDataType>>({
        name: '',
        kana: '',
        email: '',
        role: null,
        office: null,
        can_manage_jobs: false,
        can_manage_rules: false,
        can_manage_groupings: false,
    });

    const submit: FormEventHandler = useCallback((e) => {
        e.preventDefault();
        post(route('admin.account.users.store'));
    }, [post]);

    const enableAllPermissions = useCallback(() => {
        PERMISSIONS.forEach(permission => {
            setData(permission.key, true);
        });
    }, [setData]);

    const disableAllPermissions = useCallback(() => {
        PERMISSIONS.forEach(permission => {
            setData(permission.key, false);
        });
    }, [setData]);

    const areAllPermissionsEnabled = useMemo(() => {
        return PERMISSIONS.every(permission => data[permission.key] === true);
    }, [data]);

    const areAllPermissionsDisabled = useMemo(() => {
        return PERMISSIONS.every(permission => data[permission.key] === false);
    }, [data]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="ユーザー作成" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <section className="max-w-xl">
                    <header className="flex flex-col space-y-1.5">
                        <h2 className="font-semibold tracking-tight text-xl">
                            ユーザー作成
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            ユーザーを作成できます。
                        </p>
                    </header>

                    <form onSubmit={submit} className="mt-6">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">名前</Label>

                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    autoComplete="name"
                                    autoFocus
                                    placeholder="ユーザー"
                                    required
                                    onChange={(e) => setData('name', e.target.value)}
                                />

                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="kana">カナ</Label>

                                <Input
                                    id="kana"
                                    type="text"
                                    value={data.kana}
                                    autoComplete="kana"
                                    placeholder="ユーザー"
                                    required
                                    onChange={(e) => setData('kana', e.target.value)}
                                />

                                <InputError message={errors.kana} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">メールアドレス</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    autoComplete="username"
                                    placeholder="user@example.com"
                                    required
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="role">役割</Label>

                                <Combobox
                                    id="role"
                                    options={roleOptions}
                                    value={data.role}
                                    onValueChange={(value) => setData('role', value)}
                                    placeholder="役割を選択してください..."
                                />

                                <InputError message={errors.role} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="office">所属事業所</Label>

                                <Combobox
                                    id="office"
                                    options={officeOptions}
                                    value={data.office}
                                    onValueChange={(value) => setData('office', value)}
                                    placeholder="所属事業所を選択してください..."
                                />

                                <InputError message={errors.office} />
                            </div>

                            <div className="grid gap-2">
                                <p className="text-sm leading-none font-medium select-none">
                                    権限設定<span className="text-destructive"> *役割によっては機能の一部が制限されます</span>
                                </p>

                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={enableAllPermissions}
                                        disabled={areAllPermissionsEnabled}
                                    >
                                        全て有効
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={disableAllPermissions}
                                        disabled={areAllPermissionsDisabled}
                                    >
                                        全て無効
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {PERMISSIONS.map(permission => (
                                        <div key={permission.key}>
                                            <Label
                                                htmlFor={permission.key}
                                                className="gap-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs  hover:bg-accent/90 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
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
                                                    checked={data[permission.key]}
                                                    onCheckedChange={(checked) => setData(permission.key, checked)}
                                                />
                                            </Label>

                                            <InputError message={errors[permission.key]} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Link
                                    href={route('admin.account.users.index')}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-9 px-4 py-2 has-[>svg]:px-3"
                                >
                                    一覧に戻る
                                </Link>
                                <Button type="submit" disabled={processing}>作成する</Button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </AppLayout>
    );
}
