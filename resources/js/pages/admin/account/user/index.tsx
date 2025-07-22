import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useMemo, useCallback, useState } from 'react';
import { type SharedData, type IndexUser, type IndexUserProps } from '@/types';

import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import DataTable from '@/components/data-table';
import { createColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'ユーザー一覧',
        href: '/admin/account/users',
    },
];

const columnLabelMap: Record<string, string> = {
    id: "ID",
    name: "名前",
    kana: "カナ",
    email: "メールアドレス",
    office: "所属事業所",
};

const searchableColumns = ['id', 'name', 'kana', 'email', 'office'];

const keywordPlaceholder = "キーワード検索（ID, 名前, カナ、メールアドレス, 所属事業所）";

const initialColumnVisibility = {
    id: true,
    name: true,
    kana: false,
    email: true,
    office: true,
};

const mapUserToTableData = (user: IndexUserProps): IndexUser => ({
    id: user.id,
    name: user.name,
    kana: user.kana,
    email: user.email,
    office: user.office?.name || '未所属',
});

interface IndexProps {
    staff: IndexUserProps[];
    members: IndexUserProps[];
    others: IndexUserProps[];
}

export default function Index({ staff, members, others }: IndexProps) {
    const [activeTab, setActiveTab] = useState('staff');

    const { errors } = usePage<SharedData>().props;

    const { delete: destroy, processing } = useForm({});

    const staffTableData = useMemo(() => staff.map(mapUserToTableData), [staff]);
    const memberTableData = useMemo(() => members.map(mapUserToTableData), [members]);
    const otherTableData = useMemo(() => others.map(mapUserToTableData), [others]);

    const handleDelete = useCallback((id: number) => {
        destroy(route('admin.account.users.destroy', { user: id }), {
            preserveScroll: true,
        });
    }, [destroy]);

    const columns = useMemo(() => createColumns({
        onDelete: handleDelete,
        isProcessing: processing
    }), [handleDelete, processing]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="ユーザー一覧" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex justify-end">
                    <Link
                        href={route('admin.account.users.create')}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
                    >
                        新規作成
                    </Link>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="staff">スタッフ</TabsTrigger>
                        <TabsTrigger value="member">メンバー</TabsTrigger>
                        <TabsTrigger value="other">その他</TabsTrigger>
                    </TabsList>
                    <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <div style={{ display: activeTab === 'staff' ? 'block' : 'none' }}>
                            <DataTable
                                data={staffTableData}
                                columns={columns}
                                errors={errors}
                                searchableColumns={searchableColumns}
                                keywordPlaceholder={keywordPlaceholder}
                                columnLabelMap={columnLabelMap}
                                initialColumnVisibility={initialColumnVisibility}
                                bulkDestroyRouteName="admin.account.users.bulk-destroy"
                                deleteDialogDisplayField="name"
                            />
                        </div>
                        <div style={{ display: activeTab === 'member' ? 'block' : 'none' }}>
                            <DataTable
                                data={memberTableData}
                                columns={columns}
                                errors={errors}
                                searchableColumns={searchableColumns}
                                keywordPlaceholder={keywordPlaceholder}
                                columnLabelMap={columnLabelMap}
                                initialColumnVisibility={initialColumnVisibility}
                                bulkDestroyRouteName="admin.account.users.bulk-destroy"
                                deleteDialogDisplayField="name"
                            />
                        </div>
                        <div style={{ display: activeTab === 'other' ? 'block' : 'none' }}>
                            <DataTable
                                data={otherTableData}
                                columns={columns}
                                errors={errors}
                                searchableColumns={searchableColumns}
                                keywordPlaceholder={keywordPlaceholder}
                                columnLabelMap={columnLabelMap}
                                initialColumnVisibility={initialColumnVisibility}
                                bulkDestroyRouteName="admin.account.users.bulk-destroy"
                                deleteDialogDisplayField="name"
                            />
                        </div>
                    </div>
                </Tabs>
            </div>
        </AppLayout>
    );
}
