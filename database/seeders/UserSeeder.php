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
                'kana' => 'すたっふいち',
                'email' => 'staff1@test.com',
                'password' => Hash::make('password'),
                'role' => 1,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'スタッフ2',
                'kana' => 'すたっふに',
                'email' => 'staff2@test.com',
                'password' => Hash::make('password'),
                'role' => 1,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'スタッフ3',
                'kana' => 'すたっふさん',
                'email' => 'staff3@test.com',
                'password' => Hash::make('password'),
                'role' => 1,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'スタッフ4',
                'kana' => 'すたっふよん',
                'email' => 'staff4@test.com',
                'password' => Hash::make('password'),
                'role' => 1,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'スタッフ5',
                'kana' => 'すたっふご',
                'email' => 'staff5@test.com',
                'password' => Hash::make('password'),
                'role' => 1,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'メンバー1',
                'kana' => 'めんばーいち',
                'email' => 'member1@test.com',
                'password' => Hash::make('password'),
                'role' => 9,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'メンバー2',
                'kana' => 'めんばーに',
                'email' => 'member2@test.com',
                'password' => Hash::make('password'),
                'role' => 9,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'メンバー3',
                'kana' => 'めんばーさん',
                'email' => 'member3@test.com',
                'password' => Hash::make('password'),
                'role' => 9,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'メンバー4',
                'kana' => 'めんばーよん',
                'email' => 'member4@test.com',
                'password' => Hash::make('password'),
                'role' => 9,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'office_id' => 1,
                'name' => 'メンバー5',
                'kana' => 'めんばーご',
                'email' => 'member5@test.com',
                'password' => Hash::make('password'),
                'role' => 9,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
        ]);
    }
}
