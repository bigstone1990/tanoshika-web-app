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
                'kana' => 'おふぃすいち',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス2',
                'kana' => 'おふぃすに',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス3',
                'kana' => 'おふぃすさん',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス4',
                'kana' => 'おふぃすよん',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス5',
                'kana' => 'おふぃすご',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
        ]);
    }
}
