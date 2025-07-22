<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Enums\User\Role;
use App\Notifications\User\CustomResetPassword;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'office_id',
        'name',
        'kana',
        'email',
        'password',
        'role',
        'can_manage_jobs',
        'can_manage_rules',
        'can_manage_groupings',
        'creator_id',
        'creator_type',
        'updater_id',
        'updater_type',
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
            'role' => Role::class,
            'can_manage_jobs' => 'boolean',
            'can_manage_rules' => 'boolean',
            'can_manage_groupings' => 'boolean',
        ];
    }

    public function sendPasswordResetNotification($token): void
    {
        $this->notify(new CustomResetPassword($token));
    }

    public function office(): BelongsTo
    {
        return $this->belongsTo(Office::class)->withDefault();
    }

    public function creator(): MorphTo
    {
        return $this->morphTo('creator')->withDefault();
    }

    public function updater(): MorphTo
    {
        return $this->morphTo('updater')->withDefault();
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
        static::deleting(function (User $user) {
            DB::transaction(function () use ($user) {
                User::where('creator_type', User::class)
                    ->where('creator_id', $user->id)
                    ->update([
                        'creator_id' => null,
                        'creator_type' => null,
                    ]);

                User::where('updater_type', User::class)
                    ->where('updater_id', $user->id)
                    ->update([
                        'updater_id' => null,
                        'updater_type' => null,
                    ]);
            });
        });
    }
}
