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
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス2',
                'kana' => 'オフィス2',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス3',
                'kana' => 'オフィス3',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス4',
                'kana' => 'オフィス4',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
            [
                'name' => 'オフィス5',
                'kana' => 'オフィス5',
                'created_at' => $datetime,
                'updated_at' => $datetime,
            ],
        ]);
    }
}
