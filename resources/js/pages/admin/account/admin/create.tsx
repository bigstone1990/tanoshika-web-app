import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useCallback } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: '管理者一覧',
        href: '/admin/account/admins',
    },
    {
        title: '管理者作成',
        href: '/admin/account/admins/create',
    },
];

type FormDataType = {
    name: string;
    kana: string;
    email: string;
};

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<Required<FormDataType>>({
        name: '',
        kana: '',
        email: '',
    });

    const submit: FormEventHandler = useCallback((e) => {
        e.preventDefault();
        post(route('admin.account.admins.store'));
    }, [post]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="管理者作成" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <section className="max-w-xl">
                    <header className="flex flex-col space-y-1.5">
                        <h2 className="font-semibold tracking-tight text-xl">
                            管理者作成
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            管理者を作成できます。
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
                                    value={data.email}
                                    autoComplete="username"
                                    placeholder="admin@example.com"
                                    required
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Link
                                    href={route('admin.account.admins.index')}
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
