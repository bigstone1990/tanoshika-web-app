import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Option } from '@/types';

interface ComboboxProps {
    id: string;
    options: Option[];
    value: number | null;
    onValueChange: (value: number | null) => void;
    placeholder: string;
}

export default function Combobox({
    id,
    options,
    value,
    onValueChange,
    placeholder,
}: ComboboxProps) {
    const [open, setOpen] = React.useState(false);

    const selectedOption = React.useMemo(() => {
        return options.find((option) => option.value === value);
    }, [options, value]);

    const handleSelect = React.useCallback((currentLabel: string) => {
        const selected = options.find(opt => opt.label === currentLabel);
        onValueChange(selected ? selected.value : null);
        setOpen(false);
    }, [options, onValueChange]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between font-normal"
                >
                    {selectedOption ? selectedOption.label : placeholder}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                    <CommandInput
                        placeholder="キーワード検索"
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>結果が見つかりませんでした</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={handleSelect}
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
