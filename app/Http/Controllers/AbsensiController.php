<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;

class AbsensiController extends Controller
{
    // Admin — lihat semua absensi
    public function index(Request $request)
    {
        $query = Absensi::with('mahasiswa');

        if ($request->tanggal) {
            $query->whereDate('tanggal', $request->tanggal);
        }

        if ($request->mahasiswa_id) {
            $query->where('mahasiswa_id', $request->mahasiswa_id);
        }

        $absensis   = $query->latest()->get();
        $mahasiswas = Mahasiswa::all();

        return inertia('Admin/Absensi', [
            'absensis'   => $absensis,
            'mahasiswas' => $mahasiswas,
            'filters'    => $request->only(['tanggal', 'mahasiswa_id']),
        ]);
    }

    // Mahasiswa — absen masuk
    public function masuk(Request $request)
    {
        $mahasiswa = auth()->user()->mahasiswa;

        // Cek sudah absen masuk hari ini
        $sudahMasuk = Absensi::where('mahasiswa_id', $mahasiswa->id)
            ->whereDate('tanggal', today())
            ->exists();

        if ($sudahMasuk) {
            return back()->withErrors(['masuk' => 'Anda sudah melakukan absen masuk hari ini.']);
        }

        $jamMasuk = now()->format('H:i:s');
        $status   = $jamMasuk > '08:00:00' ? 'telat' : 'hadir';

        Absensi::create([
            'mahasiswa_id' => $mahasiswa->id,
            'tanggal'      => today(),
            'jam_masuk'    => $jamMasuk,
            'status'       => $status,
        ]);

        return back()->with('success', 'Absen masuk berhasil.');
    }

    // Mahasiswa — absen pulang
    public function pulang(Request $request)
    {
        $mahasiswa = auth()->user()->mahasiswa;

        $absensi = Absensi::where('mahasiswa_id', $mahasiswa->id)
            ->whereDate('tanggal', today())
            ->first();

        if (!$absensi) {
            return back()->withErrors(['pulang' => 'Anda belum melakukan absen masuk.']);
        }

        if ($absensi->jam_pulang) {
            return back()->withErrors(['pulang' => 'Anda sudah melakukan absen pulang hari ini.']);
        }

        $absensi->update([
            'jam_pulang' => now()->format('H:i:s'),
        ]);

        return back()->with('success', 'Absen pulang berhasil.');
    }
}