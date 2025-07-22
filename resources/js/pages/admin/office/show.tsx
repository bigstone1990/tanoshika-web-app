import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type ShowOffice } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: '事業所一覧',
        href: '/admin/offices',
    },
    {
        title: '事業所詳細',
        href: '',
    },
];

interface ShowProps {
    office: ShowOffice;
}

export default function Show({ office }: ShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="事業所詳細" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <section className="max-w-xl">
                    <header className="flex flex-col space-y-1.5">
                        <h2 className="font-semibold tracking-tight text-xl">
                            事業所詳細
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            事業所の詳細を確認できます。
                        </p>
                    </header>

                    <div className="mt-6">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="id">ID</Label>

                                <Input
                                    id="id"
                                    type="text"
                                    value={office.id}
                                    readOnly
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">名前</Label>

                                <Input
                                    id="name"
                                    type="text"
                                    value={office.name}
                                    readOnly
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="kana">カナ</Label>

                                <Input
                                    id="kana"
                                    type="text"
                                    value={office.kana}
                                    readOnly
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="created_at">作成日時</Label>

                                <Input
                                    id="created_at"
                                    type="text"
                                    value={office.created_at}
                                    readOnly
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="creator">作成者</Label>

                                <Input
                                    id="creator"
                                    type="text"
                                    value={office.creator ?? 'なし'}
                                    readOnly
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="updated_at">更新日時</Label>

                                <Input
                                    id="updated_at"
                                    type="text"
                                    value={office.updated_at}
                                    readOnly
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="updater">更新者</Label>

                                <Input
                                    id="updater"
                                    type="text"
                                    value={office.updater ?? 'なし'}
                                    readOnly
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <Link
                                    href={route('admin.offices.index')}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-9 px-4 py-2 has-[>svg]:px-3"
                                >
                                    一覧に戻る
                                </Link>
                                <Link
                                    href={route('admin.offices.edit', { office: office.id })}
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
