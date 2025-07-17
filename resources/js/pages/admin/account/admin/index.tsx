import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useMemo, useCallback } from 'react';
import { type SharedData, type IndexAdmin } from '@/types';

import DataTable from '@/components/data-table';
import { createColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: '管理者一覧',
        href: '/admin/account/admins',
    },
];

const columnLabelMap: Record<string, string> = {
    id: "ID",
    name: "名前",
    kana: "カナ",
    email: "メールアドレス",
};

const searchableColumns = ['id', 'name', 'kana', 'email'];

const keywordPlaceholder = "キーワード検索（ID, 名前, カナ、メールアドレス）";

const initialColumnVisibility = {
    id: true,
    name: true,
    kana: false,
    email: true,
};

interface IndexProps {
    admins: IndexAdmin[];
}

export default function Index({ admins }: IndexProps) {
    const { errors } = usePage<SharedData>().props;

    const { delete: destroy, processing } = useForm({});

    const handleDelete = useCallback((id: number) => {
        destroy(route('admin.account.admins.destroy', { admin: id }), {
            preserveScroll: true,
        });
    }, [destroy]);

    const columns = useMemo(() => createColumns({
        onDelete: handleDelete,
        isProcessing: processing
    }), [handleDelete, processing]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="管理者一覧" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex justify-end">
                    <Link
                        href={route('admin.account.admins.create')}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
                    >
                        新規作成
                    </Link>
                </div>
                <DataTable
                    data={admins}
                    columns={columns}
                    errors={errors}
                    searchableColumns={searchableColumns}
                    keywordPlaceholder={keywordPlaceholder}
                    columnLabelMap={columnLabelMap}
                    initialColumnVisibility={initialColumnVisibility}
                    bulkDestroyRouteName="admin.account.admins.bulk-destroy"
                    deleteDialogDisplayField="name"
                />
            </div>
        </AppLayout>
    );
}
