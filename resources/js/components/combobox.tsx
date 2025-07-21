import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Option } from '@/types'

interface ComboboxProps {
    id?: string
    className?: string
    options: Option[]
    value: number
    onValueChange: (value: number) => void
    placeholder?: string
}

export default function Combobox({
    id,
    className,
    options,
    value,
    onValueChange,
    placeholder = "選択してください...",
}: ComboboxProps) {
    const [open, setOpen] = React.useState(false)

    const selectedOption = React.useMemo(() => {
        return options.find((option) => option.value === value)
    }, [options, value])

    const handleSelect = React.useCallback((currentLabel: string) => {
        const selected = options.find(opt => opt.label === currentLabel)
        const selectedValue = selected?.value ?? 0
        onValueChange(selectedValue)
        setOpen(false)
    }, [options, onValueChange])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-full justify-between", className)}
                >
                    {selectedOption ? selectedOption.label : placeholder}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                <Command>
                    <CommandInput
                        placeholder="キーワード検索"
                        className="h-9 my-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
    )
}
