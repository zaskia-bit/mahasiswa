import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Sidebar from '@/Components/Sidebar';

export default function Absensi({ absensis, mahasiswas, filters }) {
    const [tanggal, setTanggal] = useState(filters.tanggal ?? '');
    const [mahasiswaId, setMahasiswaId] = useState(filters.mahasiswa_id ?? '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get('/admin/absensi', {
            tanggal,
            mahasiswa_id: mahasiswaId,
        }, { preserveState: true });
    };

    const handleReset = () => {
        setTanggal('');
        setMahasiswaId('');
        router.get('/admin/absensi');
    };

    return (
        <>
            <Head title="Data Absensi" />
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar role="admin" />

                <main className="flex-1 p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Data Absensi</h2>
                        <p className="text-gray-500 mt-1">Lihat semua data absensi mahasiswa</p>
                    </div>

                    {/* Filter */}
                    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
                        <form onSubmit={handleFilter} className="flex flex-wrap gap-4 items-end">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Tanggal</label>
                                <input
                                    type="date"
                                    value={tanggal}
                                    onChange={(e) => setTanggal(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Mahasiswa</label>
                                <select
                                    value={mahasiswaId}
                                    onChange={(e) => setMahasiswaId(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Semua Mahasiswa</option>
                                    {mahasiswas.map((m) => (
                                        <option key={m.id} value={m.id}>{m.nama}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                Filter
                            </button>
                            <button type="button" onClick={handleReset} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                Reset
                            </button>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    {['No', 'Nama', 'NIM', 'Tanggal', 'Jam Masuk', 'Jam Pulang', 'Status'].map((h) => (
                                        <th key={h} className="text-left px-6 py-4 font-medium text-gray-600">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {absensis.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-8 text-gray-400">
                                            Tidak ada data absensi.
                                        </td>
                                    </tr>
                                ) : (
                                    absensis.map((a, i) => (
                                        <tr key={a.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-gray-600">{i + 1}</td>
                                            <td className="px-6 py-4 text-gray-800">{a.mahasiswa.nama}</td>
                                            <td className="px-6 py-4 text-gray-600">{a.mahasiswa.nim}</td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {new Date(a.tanggal).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{a.jam_masuk ?? '-'}</td>
                                            <td className="px-6 py-4 text-gray-600">{a.jam_pulang ?? '-'}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    a.status === 'hadir'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-orange-100 text-orange-700'
                                                }`}>
                                                    {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </>
    );
}