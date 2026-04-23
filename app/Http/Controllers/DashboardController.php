<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function admin()
    {
        $totalMahasiswa   = Mahasiswa::count();
        $totalAbsensiHariIni = Absensi::whereDate('tanggal', today())->count();
        $mahasiswaHadir   = Absensi::whereDate('tanggal', today())
                                ->whereNotNull('jam_masuk')
                                ->count();

        return inertia('Admin/Dashboard', [
            'totalMahasiswa'      => $totalMahasiswa,
            'totalAbsensiHariIni' => $totalAbsensiHariIni,
            'mahasiswaHadir'      => $mahasiswaHadir,
        ]);
    }

    public function mahasiswa()
    {
        $user      = auth()->user();
        $mahasiswa = $user->mahasiswa;
        $absensiHariIni = $mahasiswa->absensiHariIni;

        return inertia('Mahasiswa/Dashboard', [
            'mahasiswa'      => $mahasiswa,
            'absensiHariIni' => $absensiHariIni,
        ]);
    }
}