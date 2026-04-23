import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';

export default function Dashboard({ totalMahasiswa, totalAbsensiHariIni, mahasiswaHadir }) {
    const stats = [
        {
            label: 'Total Mahasiswa',
            value: totalMahasiswa,
            icon: '👥',
            color: 'bg-blue-500',
        },
        {
            label: 'Total Absensi Hari Ini',
            value: totalAbsensiHariIni,
            icon: '📋',
            color: 'bg-green-500',
        },
        {
            label: 'Mahasiswa Hadir',
            value: mahasiswaHadir,
            icon: '✅',
            color: 'bg-indigo-500',
        },
    ];

    return (
        <>
            <Head title="Dashboard Admin" />
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar role="admin" />

                <main className="flex-1 p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                        <p className="text-gray-500 mt-1">
                            Selamat datang! Berikut ringkasan hari ini.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4"
                            >
                                <div className={`${stat.color} text-white text-2xl w-14 h-14 rounded-xl flex items-center justify-center`}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Info */}
                    <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
                        <h3 className="font-semibold text-gray-700 mb-2">📅 Informasi</h3>
                        <p className="text-gray-500 text-sm">
                            Tanggal hari ini:{' '}
                            <span className="font-medium text-gray-700">
                                {new Date().toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}