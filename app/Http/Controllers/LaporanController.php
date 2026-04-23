<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    public function index(Request $request)
    {
        $bulan = (int) ($request->bulan ?? now()->month);
        $tahun = (int) ($request->tahun ?? now()->year);

        $absensis = Absensi::with('mahasiswa')
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->latest()
            ->get();

        $mahasiswas = Mahasiswa::all();

        return inertia('Admin/Laporan', [
            'absensis'   => $absensis,
            'mahasiswas' => $mahasiswas,
            'bulan'      => $bulan,
            'tahun'      => $tahun,
        ]);
    }

    public function print(Request $request)
    {
        $bulan = (int) ($request->bulan ?? now()->month);
        $tahun = (int) ($request->tahun ?? now()->year);

        $absensis = Absensi::with('mahasiswa')
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->latest()
            ->get();

        return view('admin.laporan-print', [
            'absensis' => $absensis,
            'bulan'    => $bulan,
            'tahun'    => $tahun,
        ]);
    }
}