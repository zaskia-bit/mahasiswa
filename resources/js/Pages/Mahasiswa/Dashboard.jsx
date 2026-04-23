import { Head, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';

export default function Dashboard({ mahasiswa, absensiHariIni }) {
    const { post: postMasuk, processing: processingMasuk, errors: errorsMasuk } = useForm();
    const { post: postPulang, processing: processingPulang, errors: errorsPulang } = useForm();

    const handleMasuk = (e) => {
        e.preventDefault();
        postMasuk('/mahasiswa/absensi/masuk');
    };

    const handlePulang = (e) => {
        e.preventDefault();
        postPulang('/mahasiswa/absensi/pulang');
    };

    return (
        <>
            <Head title="Dashboard Mahasiswa" />
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar role="mahasiswa" />

                <main className="flex-1 p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Halo, {mahasiswa?.nama ?? 'Mahasiswa'} 👋
                        </h2>
                        <p className="text-gray-500 mt-1">
                            {new Date().toLocaleDateString('id-ID', {
                                weekday: 'long', year: 'numeric',
                                month: 'long', day: 'numeric',
                            })}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Data Diri */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="font-semibold text-gray-700 mb-4">👤 Data Diri</h3>
                            <div className="space-y-3 text-sm">
                                {[
                                    { label: 'Nama', value: mahasiswa?.nama },
                                    { label: 'NIM', value: mahasiswa?.nim },
                                    { label: 'Jurusan', value: mahasiswa?.jurusan },
                                    { label: 'Semester', value: mahasiswa?.semester },
                                    { label: 'No HP', value: mahasiswa?.no_hp ?? '-' },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex justify-between">
                                        <span className="text-gray-500">{label}</span>
                                        <span className="font-medium text-gray-800">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Status Absensi */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="font-semibold text-gray-700 mb-4">📋 Status Absensi Hari Ini</h3>

                            {absensiHariIni ? (
                                <div className="space-y-3 text-sm mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Status</span>
                                        <span className={`font-medium px-2 py-0.5 rounded-full text-xs ${
                                            absensiHariIni.status === 'hadir'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-orange-100 text-orange-700'
                                        }`}>
                                            {absensiHariIni.status.charAt(0).toUpperCase() + absensiHariIni.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Jam Masuk</span>
                                        <span className="font-medium text-gray-800">{absensiHariIni.jam_masuk ?? '-'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Jam Pulang</span>
                                        <span className="font-medium text-gray-800">{absensiHariIni.jam_pulang ?? '-'}</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm mb-4">Belum ada absensi hari ini.</p>
                            )}

                            {/* Tombol Absen */}
                            <div className="space-y-3">
                                {/* Absen Masuk */}
                                <form onSubmit={handleMasuk}>
                                    <button
                                        type="submit"
                                        disabled={processingMasuk || !!absensiHariIni?.jam_masuk}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {absensiHariIni?.jam_masuk ? '✅ Sudah Absen Masuk' : '🟢 Absen Masuk'}
                                    </button>
                                    {errorsMasuk.masuk && (
                                        <p className="text-red-500 text-xs mt-1">{errorsMasuk.masuk}</p>
                                    )}
                                </form>

                                {/* Absen Pulang */}
                                <form onSubmit={handlePulang}>
                                    <button
                                        type="submit"
                                        disabled={processingPulang || !absensiHariIni?.jam_masuk || !!absensiHariIni?.jam_pulang}
                                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {absensiHariIni?.jam_pulang ? '✅ Sudah Absen Pulang' : '🔴 Absen Pulang'}
                                    </button>
                                    {errorsPulang.pulang && (
                                        <p className="text-red-500 text-xs mt-1">{errorsPulang.pulang}</p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}