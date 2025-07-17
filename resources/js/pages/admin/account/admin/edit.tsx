import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useCallback } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type EditAdmin } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: '管理者一覧',
        href: '/admin/account/admins',
    },
    {
        title: '管理者編集',
        href: '',
    },
];

type FormDataType = {
    name: string;
    kana: string;
    updated_at: string;
};

interface EditProps {
    admin: EditAdmin;
}

export default function Edit({ admin }: EditProps) {
    const { data, setData, put, processing, errors } = useForm<Required<FormDataType>>({
        name: admin.name,
        kana: admin.kana,
        updated_at: admin.updated_at,
    });

    const submit: FormEventHandler = useCallback((e) => {
        e.preventDefault();
        put(route('admin.account.admins.update', { admin: admin.id }));
    }, [put, admin.id]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="管理者編集" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <section className="max-w-xl">
                    <header className="flex flex-col space-y-1.5">
                        <h2 className="font-semibold tracking-tight text-xl">
                            管理者変種
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            管理者を編集できます。
                        </p>
                    </header>

                    <form onSubmit={submit} className="mt-6">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">ID</Label>

                                <Input
                                    id="id"
                                    type="text"
                                    value={admin.id}
                                    disabled
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">名前</Label>

                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    autoComplete="name"
                                    autoFocus
                                    placeholder="管理者"
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
                                    placeholder="カンリシャ"
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
                                    value={admin.email}
                                    disabled
                                />
                            </div>

                            <div className="grid gap-2">
                                <InputError message={errors.updated_at} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Link
                                    href={route('admin.account.admins.index')}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/90 h-9 px-4 py-2 has-[>svg]:px-3"
                                >
                                    一覧に戻る
                                </Link>
                                <Button type="submit" disabled={processing}>更新する</Button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </AppLayout>
    );
}
