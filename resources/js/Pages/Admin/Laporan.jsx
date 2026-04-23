import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Sidebar from '@/Components/Sidebar';

export default function Laporan({ absensis, bulan, tahun }) {
    const [selectedBulan, setSelectedBulan] = useState(bulan);
    const [selectedTahun, setSelectedTahun] = useState(tahun);

    const handleFilter = (e) => {
        e.preventDefault();
        router.get('/admin/laporan', {
            bulan: selectedBulan,
            tahun: selectedTahun,
        }, { preserveState: true });
    };

    const handlePrint = () => {
        window.open(`/admin/laporan/print?bulan=${selectedBulan}&tahun=${selectedTahun}`, '_blank');
    };

    const namaBulan = [
        '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ];

    return (
        <>
            <Head title="Laporan Absensi" />
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar role="admin" />

                <main className="flex-1 p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Laporan Absensi</h2>
                        <p className="text-gray-500 mt-1">Laporan harian dan bulanan</p>
                    </div>

                    {/* Filter */}
                    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
                        <form onSubmit={handleFilter} className="flex flex-wrap gap-4 items-end">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Bulan</label>
                                <select
                                    value={selectedBulan}
                                    onChange={(e) => setSelectedBulan(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    {namaBulan.slice(1).map((b, i) => (
                                        <option key={i + 1} value={i + 1}>{b}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Tahun</label>
                                <input
                                    type="number"
                                    value={selectedTahun}
                                    onChange={(e) => setSelectedTahun(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-24"
                                    min="2020"
                                    max="2030"
                                />
                            </div>
                            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                Tampilkan
                            </button>
                            <button type="button" onClick={handlePrint} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                🖨️ Print
                            </button>
                        </form>
                    </div>

                    {/* Info Periode */}
                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6">
                        <p className="text-indigo-700 font-medium text-sm">
                            📅 Menampilkan laporan: {namaBulan[bulan]} {tahun} — Total {absensis.length} data
                        </p>
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
                                            Tidak ada data laporan untuk periode ini.
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