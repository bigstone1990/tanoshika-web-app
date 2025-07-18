<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class OfficeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datetime = Carbon::today()->format('Y-m-d H:i:s');

        DB::table('offices')->insert([
            [
                'name' => 'オフィス1',
                'kana' => 'オフィス1',
                'creator_id' => null,
                'updater_id' => null,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス2',
                'kana' => 'オフィス2',
                'creator_id' => 1,
                'updater_id' => 1,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス3',
                'kana' => 'オフィス3',
                'creator_id' => 2,
                'updater_id' => 2,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス4',
                'kana' => 'オフィス4',
                'creator_id' => 2,
                'updater_id' => 2,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス5',
                'kana' => 'オフィス5',
                'creator_id' => 2,
                'updater_id' => 2,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス6',
                'kana' => 'オフィス6',
                'creator_id' => 3,
                'updater_id' => 3,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス7',
                'kana' => 'オフィス7',
                'creator_id' => 3,
                'updater_id' => 3,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス8',
                'kana' => 'オフィス8',
                'creator_id' => 3,
                'updater_id' => 3,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス9',
                'kana' => 'オフィス9',
                'creator_id' => 3,
                'updater_id' => 3,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス10',
                'kana' => 'オフィス10',
                'creator_id' => 3,
                'updater_id' => 3,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス11',
                'kana' => 'オフィス11',
                'creator_id' => 10,
                'updater_id' => 10,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス12',
                'kana' => 'オフィス12',
                'creator_id' => 10,
                'updater_id' => 10,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス13',
                'kana' => 'オフィス13',
                'creator_id' => 10,
                'updater_id' => 10,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス14',
                'kana' => 'オフィス14',
                'creator_id' => 10,
                'updater_id' => 10,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス15',
                'kana' => 'オフィス15',
                'creator_id' => 10,
                'updater_id' => 10,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
        ]);
    }
}
