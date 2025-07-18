import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useCallback } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { type EditOffice } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: '事業所一覧',
        href: '/admin/offices',
    },
    {
        title: '事業所編集',
        href: '',
    },
];

type FormDataType = {
    name: string;
    kana: string;
    updated_at: string;
};

interface EditProps {
    office: EditOffice;
}

export default function Edit({ office }: EditProps) {
    const { data, setData, put, delete: destroy, processing, errors } = useForm<Required<FormDataType>>({
        name: office.name,
        kana: office.kana,
        updated_at: office.updated_at,
    });

    const submit: FormEventHandler = useCallback((e) => {
        e.preventDefault();
        put(route('admin.offices.update', { office: office.id }));
    }, [put, office.id]);

    const handleDelete = useCallback(() => {
        destroy(route('admin.offices.destroy', { office: office.id }));
    }, [destroy, office.id]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="事業所編集" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <section className="max-w-xl">
                    <header className="flex flex-col space-y-1.5">
                        <h2 className="font-semibold tracking-tight text-xl">
                            事業所編集
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            事業所を編集できます。
                        </p>
                    </header>

                    <form onSubmit={submit} className="mt-6">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="id">ID</Label>

                                <Input
                                    id="id"
                                    type="text"
                                    value={office.id}
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
                                    placeholder="事業所"
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
                                    placeholder="ジギョウショ"
                                    required
                                    onChange={(e) => setData('kana', e.target.value)}
                                />

                                <InputError message={errors.kana} />
                            </div>

                            <div className="grid gap-2">
                                <InputError message={errors.updated_at} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Link
                                    href={route('admin.offices.index')}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-9 px-4 py-2 has-[>svg]:px-3"
                                >
                                    一覧に戻る
                                </Link>
                                <Button type="submit" disabled={processing}>更新する</Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            disabled={processing}
                                        >
                                            削除する
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>事業所を削除しますか？</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                この操作は取り消すことができません。<br />
                                                事業所「{office.name}」を完全に削除し、すべてのデータが失われます。
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>キャンセル</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleDelete}
                                                className="bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
                                                disabled={processing}
                                            >
                                                削除する
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </AppLayout>
    );
}
