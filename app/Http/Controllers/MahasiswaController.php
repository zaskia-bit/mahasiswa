<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class MahasiswaController extends Controller
{
    public function index()
    {
        $mahasiswas = Mahasiswa::with('user')->latest()->get();

        return inertia('Admin/Mahasiswa', [
            'mahasiswas' => $mahasiswas,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'nim'      => 'required|unique:mahasiswas,nim',
            'jurusan'  => 'required|string|max:255',
            'semester' => 'required|string|max:10',
            'no_hp'    => 'nullable|string|max:15',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 'mahasiswa',
        ]);

        Mahasiswa::create([
            'user_id'  => $user->id,
            'nim'      => $request->nim,
            'nama'     => $request->name,
            'jurusan'  => $request->jurusan,
            'semester' => $request->semester,
            'no_hp'    => $request->no_hp,
        ]);

        return back()->with('success', 'Mahasiswa berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $mahasiswa = Mahasiswa::findOrFail($id);

        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email,' . $mahasiswa->user_id,
            'nim'      => 'required|unique:mahasiswas,nim,' . $id,
            'jurusan'  => 'required|string|max:255',
            'semester' => 'required|string|max:10',
            'no_hp'    => 'nullable|string|max:15',
        ]);

        $mahasiswa->user->update([
            'name'  => $request->name,
            'email' => $request->email,
        ]);

        $mahasiswa->update([
            'nim'      => $request->nim,
            'nama'     => $request->name,
            'jurusan'  => $request->jurusan,
            'semester' => $request->semester,
            'no_hp'    => $request->no_hp,
        ]);

        return back()->with('success', 'Data mahasiswa berhasil diupdate.');
    }

    public function destroy($id)
    {
        $mahasiswa = Mahasiswa::findOrFail($id);
        $mahasiswa->user->delete();
        return back()->with('success', 'Mahasiswa berhasil dihapus.');
    }
}