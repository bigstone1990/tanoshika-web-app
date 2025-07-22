import { useState, useCallback, memo } from 'react';

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

import { type IndexOffice } from '@/types';

interface CreateColumnsProps {
    onDelete: (id: number) => void;
    isProcessing?: boolean;
}

export const createColumns = ({ onDelete, isProcessing = false }: CreateColumnsProps): ColumnDef<IndexOffice>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    名前
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "kana",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    カナ
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.getValue("kana")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const office = row.original;

            return (
                <ActionsCell
                    office={office}
                    onDelete={onDelete}
                    isProcessing={isProcessing}
                />
            );
        },
    },
];

interface ActionsCellProps {
    office: IndexOffice;
    onDelete: (id: number) => void;
    isProcessing: boolean;
}

const ActionsCell = memo(({
    office,
    onDelete,
    isProcessing
}: ActionsCellProps) => {
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

    const handleSelectDelete = useCallback(() => {
        setIsDropdownMenuOpen(false);
        setIsAlertDialogOpen(true);
    }, []);

    const handleDelete = useCallback(() => {
        onDelete(office.id);
    }, [onDelete, office.id]);

    return (
        <>
            <DropdownMenu open={isDropdownMenuOpen} onOpenChange={setIsDropdownMenuOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>操作</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <a
                            href={route('admin.offices.show', { office: office.id })}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            詳細
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a
                            href={route('admin.offices.edit', { office: office.id })}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            編集
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <button
                            type="button"
                            className="w-full"
                            onClick={handleSelectDelete}
                        >
                            削除
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
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
                            disabled={isProcessing}
                        >
                            削除する
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
});
