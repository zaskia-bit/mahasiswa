<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    protected $fillable = [
        'user_id',
        'nim',
        'nama',
        'jurusan',
        'semester',
        'no_hp',
    ];

    // Relasi ke User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke Absensi
    public function absensis()
    {
        return $this->hasMany(Absensi::class);
    }

    // Absensi hari ini
    public function absensiHariIni()
    {
        return $this->hasOne(Absensi::class)
            ->whereDate('tanggal', today());
    }
}