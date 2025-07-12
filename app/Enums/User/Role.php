<?php

namespace App\Enums\User;

enum Role: int
{
    case STAFF = 1;
    case MEMBER = 9;

    public function label(): string
    {
        return match ($this) {
            self::STAFF => 'スタッフ',
            self::MEMBER => 'メンバー',
        };
    }

    public static function options(): array
    {
        return array_map(
            fn(self $type) => [
                'label' => $type->label(),
                'value' => $type->value,
            ],
            self::cases()
        );
    }

    public static function values(): array
    {
        return array_map(fn(self $type) => $type->value, self::cases());
    }

    public static function labelByValue(int|string|null $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $case = self::tryFrom(intval($value));

        return $case?->label();
    }
}
