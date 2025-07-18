import { router } from '@inertiajs/react';

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
    RowSelectionState,
    Row,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import InputError from '@/components/input-error';

type Errors = Record<string, string>;
type ErrorBag = Record<string, Errors>;

interface DataTableProps<TData, TValue> {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    errors: Errors & ErrorBag;
    searchableColumns?: string[];
    keywordPlaceholder?: string;
    columnLabelMap?: Record<string, string>;
    initialColumnVisibility?: VisibilityState;
    bulkDestroyRouteName: string;
    deleteDialogDisplayField?: keyof TData;
}

export default function DataTable<TData extends { id: number }, TValue>({
    data,
    columns,
    errors,
    searchableColumns = [],
    keywordPlaceholder = "キーワード検索",
    columnLabelMap = {},
    initialColumnVisibility = {},
    bulkDestroyRouteName,
    deleteDialogDisplayField,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(initialColumnVisibility);
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

    const [globalFilter, setGlobalFilter] = React.useState("");

    const [open, setOpen] = React.useState(false);
    const [isProcessing, setIsProcessing] = React.useState(false);

    const globalFilterFn = React.useCallback(
        (row: Row<TData>, columnId: string, value: string): boolean => {
            if (!value?.trim()) return true;

            const columnsToSearch = searchableColumns.length > 0
                ? searchableColumns
                : Object.keys(row.original)
                    .filter(key => key !== 'id');

            const keywords = value
                .split(/[\s　]+/)
                .map(k => k.trim().toLowerCase())
                .filter(Boolean);

            if (keywords.length === 0) return true;

            const searchText = columnsToSearch
                .map(column => {
                    try {
                        const value = row.getValue(column);
                        return value?.toString().toLowerCase() ?? '';
                    } catch {
                        return '';
                    }
                })
                .join(' ');

            return keywords.every(keyword => searchText.includes(keyword));
        }, [searchableColumns]
    );

    const table = useReactTable({
        data,
        columns,
        getRowId: (row) => String(row.id),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: globalFilterFn,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
    });

    const handleBulkDelete = React.useCallback((): void => {
        const selectedIds = table.getFilteredSelectedRowModel().rows.map(row => Number(row.id));

        if (selectedIds.length === 0) {
            return;
        }

        setIsProcessing(true);

        router.post(route(bulkDestroyRouteName), {
            ids: selectedIds,
        }, {
            preserveScroll: true,
            onFinish: () => {
                setOpen(false);
                setIsProcessing(false);
            },
        });
    }, [table, bulkDestroyRouteName]);

    return (
        <div className="w-full">
            <div className="flex items-center py-4 gap-4">
                <Input
                    placeholder={keywordPlaceholder}
                    value={globalFilter}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            列 <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(column => column.getCanHide())
                            .map(column => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={value =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {columnLabelMap[column.id] ?? column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredRowModel().rows.length}件中
                    {table.getFilteredSelectedRowModel().rows.length}件を選択中
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.toggleAllRowsSelected(true)}
                        disabled={table.getIsAllRowsSelected()}
                    >
                        全件選択
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.toggleAllRowsSelected(false)}
                        disabled={table.getFilteredSelectedRowModel().rows.length === 0}
                    >
                        全件解除
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                        disabled={table.getFilteredSelectedRowModel().rows.length === 0 || isProcessing}
                    >
                        一括削除
                    </Button>
                    <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    {table.getFilteredSelectedRowModel().rows.length}件のデータを削除しますか？
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    この操作は取り消すことができません。<br />
                                    選択された{table.getFilteredSelectedRowModel().rows.length}件を完全に削除し、すべてのデータが失われます。
                                </AlertDialogDescription>
                                <ScrollArea className="h-72 w-80 rounded-md border self-center">
                                    <div className="p-4">
                                        <h4 className="mb-4 text-sm leading-none font-medium">対象データ</h4>
                                        {table.getFilteredSelectedRowModel().rows.map((row) => (
                                            <React.Fragment key={row.id}>
                                                <div className="text-sm">
                                                    <span>ID: {row.id}</span>
                                                    {deleteDialogDisplayField && (
                                                        <span className="ml-2">
                                                            {columnLabelMap[String(deleteDialogDisplayField)] || String(deleteDialogDisplayField)}: {String(row.original[deleteDialogDisplayField] ?? '不明')}
                                                        </span>
                                                    )}
                                                </div>
                                                <Separator className="my-2" />
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleBulkDelete}
                                    className="bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
                                    disabled={isProcessing}
                                >
                                    削除する
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            {errors && Object.keys(errors).length > 0 && (
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="text-muted-foreground flex-1 text-sm">
                        {Object.entries(errors).map(([field, value]) => (
                            <div key={field}>
                                {typeof value === 'string' ? (
                                    <InputError message={value} />
                                ) : (
                                    Object.entries(value as Record<string, string>).map(([subField, subValue]) => (
                                        <InputError key={`${field}-${subField}`} message={subValue} />
                                    ))
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    データがみつかりません
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        前へ
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        次へ
                    </Button>
                </div>
            </div>
        </div>
    );
}
