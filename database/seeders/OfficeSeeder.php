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
                'name' => '事業所1',
                'kana' => 'ジギョウショ1',
                'creator_id' => null,
                'updater_id' => null,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '事業所2',
                'kana' => 'ジギョウショ2',
                'creator_id' => 1,
                'updater_id' => 1,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '事業所3',
                'kana' => 'ジギョウショ3',
                'creator_id' => 2,
                'updater_id' => 2,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '事業所4',
                'kana' => 'ジギョウショ4',
                'creator_id' => 2,
                'updater_id' => 2,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '事業所5',
                'kana' => 'ジギョウショ5',
                'creator_id' => 2,
                'updater_id' => 2,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '事業所6',
                'kana' => 'ジギョウショ6',
                'creator_id' => 3,
                'updater_id' => 3,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '事業所7',
                'kana' => 'ジギョウショ7',
                'creator_id' => 3,
                'updater_id' => 3,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '事業所8',
                'kana' => 'ジギョウショ8',
                'creator_id' => 3,
                'updater_id' => 3,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '事業所9',
                'kana' => 'ジギョウショ9',
                'creator_id' => 3,
                'updater_id' => 3,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '事業所10',
                'kana' => 'ジギョウショ10',
                'creator_id' => 3,
                'updater_id' => 3,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '事業所11',
                'kana' => 'ジギョウショ11',
                'creator_id' => 10,
                'updater_id' => 10,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '事業所12',
                'kana' => 'ジギョウショ12',
                'creator_id' => 10,
                'updater_id' => 10,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '事業所13',
                'kana' => 'ジギョウショ13',
                'creator_id' => 10,
                'updater_id' => 10,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '事業所14',
                'kana' => 'ジギョウショ14',
                'creator_id' => 10,
                'updater_id' => 10,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => '事業所15',
                'kana' => 'ジギョウショ15',
                'creator_id' => 10,
                'updater_id' => 10,
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
        ]);
    }
}
