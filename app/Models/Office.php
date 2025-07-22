<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Office extends Model
{
    protected $fillable = [
        'name',
        'kana',
        'creator_id',
        'updater_id',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'creator_id')->withDefault();
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'updater_id')->withDefault();
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class)->chaperone();
    }
}
