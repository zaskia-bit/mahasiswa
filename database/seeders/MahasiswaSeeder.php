<?php

namespace Database\Seeders;

use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Database\Seeder;

class MahasiswaSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'budi@gmail.com')->first();

        Mahasiswa::create([
            'user_id'  => $user->id,
            'nim'      => '2021001001',
            'nama'     => 'Budi Santoso',
            'jurusan'  => 'Teknik Informatika',
            'semester' => '6',
            'no_hp'    => '081234567890',
        ]);
    }
}