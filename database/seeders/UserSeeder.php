<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datetime = Carbon::today()->format('Y-m-d H:i:s');

        DB::table('users')->insert([
            [
                'office_id' => 1,
                'name' => 'スタッフ1',
                'kana' => 'スタッフ1',
                'email' => 'staff1@test.com',
                'password' => Hash::make('password'),
                'role' => 1,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'スタッフ2',
                'kana' => 'スタッフ2',
                'email' => 'staff2@test.com',
                'password' => Hash::make('password'),
                'role' => 1,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'スタッフ3',
                'kana' => 'スタッフ3',
                'email' => 'staff3@test.com',
                'password' => Hash::make('password'),
                'role' => 1,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 2,
                'name' => 'スタッフ4',
                'kana' => 'スタッフ4',
                'email' => 'staff4@test.com',
                'password' => Hash::make('password'),
                'role' => 1,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => null,
                'name' => 'スタッフ5',
                'kana' => 'スタッフ5',
                'email' => 'staff5@test.com',
                'password' => Hash::make('password'),
                'role' => null,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'メンバー1',
                'kana' => 'メンバー1',
                'email' => 'member1@test.com',
                'password' => Hash::make('password'),
                'role' => 9,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'メンバー2',
                'kana' => 'メンバー2',
                'email' => 'member2@test.com',
                'password' => Hash::make('password'),
                'role' => 9,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'メンバー3',
                'kana' => 'メンバー3',
                'email' => 'member3@test.com',
                'password' => Hash::make('password'),
                'role' => 9,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'メンバー4',
                'kana' => 'メンバー4',
                'email' => 'member4@test.com',
                'password' => Hash::make('password'),
                'role' => 9,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'メンバー5',
                'kana' => 'メンバー5',
                'email' => 'member5@test.com',
                'password' => Hash::make('password'),
                'role' => 9,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
        ]);
    }
}
