<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datetime = Carbon::today()->format('Y-m-d H:i:s');

        DB::table('admins')->insert([
            [
                'name' => '管理者1',
                'kana' => 'カンリシャ1',
                'email' => 'admin1@test.com',
                'password' => Hash::make('password'),
                'creator_id' => null,
                'updater_id' => null,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者2',
                'kana' => 'カンリシャ2',
                'email' => 'admin2@test.com',
                'password' => Hash::make('password'),
                'creator_id' => 1,
                'updater_id' => 1,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者3',
                'kana' => 'カンリシャ3',
                'email' => 'admin3@test.com',
                'password' => Hash::make('password'),
                'creator_id' => 2,
                'updater_id' => 2,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者4',
                'kana' => 'カンリシャ4',
                'email' => 'admin4@test.com',
                'password' => Hash::make('password'),
                'creator_id' => 2,
                'updater_id' => 2,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者5',
                'kana' => 'カンリシャ5',
                'email' => 'admin5@test.com',
                'password' => Hash::make('password'),
                'creator_id' => 2,
                'updater_id' => 2,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者6',
                'kana' => 'カンリシャ6',
                'email' => 'admin6@test.com',
                'password' => Hash::make('password'),
                'creator_id' => 3,
                'updater_id' => 3,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者7',
                'kana' => 'カンリシャ7',
                'email' => 'admin7@test.com',
                'password' => Hash::make('password'),
                'creator_id' => 3,
                'updater_id' => 3,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者8',
                'kana' => 'カンリシャ8',
                'email' => 'admin8@test.com',
                'password' => Hash::make('password'),
                'creator_id' => 3,
                'updater_id' => 3,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者9',
                'kana' => 'カンリシャ9',
                'email' => 'admin9@test.com',
                'password' => Hash::make('password'),
                'creator_id' => 3,
                'updater_id' => 3,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者10',
                'kana' => 'カンリシャ10',
                'email' => 'admin10@test.com',
                'password' => Hash::make('password'),
                'creator_id' => 3,
                'updater_id' => 3,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者11',
                'kana' => 'カンリシャ11',
                'email' => 'admin11@test.com',
                'password' => Hash::make('password'),
                'creator_id' => 10,
                'updater_id' => 10,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者12',
                'kana' => 'カンリシャ12',
                'email' => 'admin12@test.com',
                'password' => Hash::make('password'),
                'creator_id' => 10,
                'updater_id' => 10,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者13',
                'kana' => 'カンリシャ13',
                'email' => 'admin13@test.com',
                'password' => Hash::make('password'),
                'creator_id' => 10,
                'updater_id' => 10,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者14',
                'kana' => 'カンリシャ14',
                'email' => 'admin14@test.com',
                'password' => Hash::make('password'),
                'creator_id' => 10,
                'updater_id' => 10,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '管理者15',
                'kana' => 'カンリシャ15',
                'email' => 'admin15@test.com',
                'password' => Hash::make('password'),
                'creator_id' => 10,
                'updater_id' => 10,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
        ]);
    }
}
