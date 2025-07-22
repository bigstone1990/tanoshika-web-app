import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useMemo, useCallback } from 'react';
import { type SharedData, type IndexOffice } from '@/types';

import DataTable from '@/components/data-table';
import { createColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: '事業所一覧',
        href: '/admin/offices',
    },
];

const columnLabelMap: Record<string, string> = {
    id: "ID",
    name: "名前",
    kana: "カナ",
};

const searchableColumns = ['id', 'name', 'kana'];

const keywordPlaceholder = "キーワード検索（ID, 名前, カナ）";

const initialColumnVisibility = {
    id: true,
    name: true,
    kana: false,
};

interface IndexProps {
    offices: IndexOffice[];
}

export default function Index({ offices }: IndexProps) {
    const { errors } = usePage<SharedData>().props;

    const { delete: destroy, processing } = useForm({});

    const handleDelete = useCallback((id: number) => {
        destroy(route('admin.offices.destroy', { office: id }), {
            preserveScroll: true,
        });
    }, [destroy]);

    const columns = useMemo(() => createColumns({
        onDelete: handleDelete,
        isProcessing: processing
    }), [handleDelete, processing]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="事業所一覧" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex justify-end">
                    <Link
                        href={route('admin.offices.create')}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
                    >
                        新規作成
                    </Link>
                </div>
                <DataTable
                    data={offices}
                    columns={columns}
                    errors={errors}
                    searchableColumns={searchableColumns}
                    keywordPlaceholder={keywordPlaceholder}
                    columnLabelMap={columnLabelMap}
                    initialColumnVisibility={initialColumnVisibility}
                    bulkDestroyRouteName="admin.offices.bulk-destroy"
                    deleteDialogDisplayField="name"
                />
            </div>
        </AppLayout>
    );
}
