<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Notifications\Admin\CustomResetPassword;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\DB;

class Admin extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'kana',
        'email',
        'password',
        'creator_id',
        'updater_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function sendPasswordResetNotification($token): void
    {
        $this->notify(new CustomResetPassword($token));
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'creator_id')->withDefault();
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'updater_id')->withDefault();
    }

    public function createdAdmins(): HasMany
    {
        return $this->hasMany(Admin::class, 'creator_id')->chaperone();
    }

    public function updatedAdmins(): HasMany
    {
        return $this->hasMany(Admin::class, 'updater_id')->chaperone();
    }

    public function createdOffices(): HasMany
    {
        return $this->hasMany(Office::class, 'creator_id')->chaperone();
    }

    public function updatedOffices(): HasMany
    {
        return $this->hasMany(Office::class, 'updater_id')->chaperone();
    }

    public function createdUsers(): MorphMany
    {
        return $this->morphMany(User::class, 'creator')->chaperone();
    }

    public function updatedUsers(): MorphMany
    {
        return $this->morphMany(User::class, 'updater')->chaperone();
    }

    protected static function booted(): void
    {
        static::deleting(function (Admin $admin) {
            DB::transaction(function () use ($admin) {
                User::where('creator_type', Admin::class)
                    ->where('creator_id', $admin->id)
                    ->update([
                        'creator_id' => null,
                        'creator_type' => null,
                    ]);

                User::where('updater_type', Admin::class)
                    ->where('updater_id', $admin->id)
                    ->update([
                        'updater_id' => null,
                        'updater_type' => null,
                    ]);
            });
        });
    }
}
