import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';

export default function Mahasiswa({ mahasiswas }) {
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '', email: '', password: '',
        nim: '', jurusan: '', semester: '', no_hp: '',
    });

    const openAdd = () => {
        reset();
        setEditData(null);
        setShowModal(true);
    };

    const openEdit = (mahasiswa) => {
        setEditData(mahasiswa);
        setData({
            name: mahasiswa.nama,
            email: mahasiswa.user.email,
            password: '',
            nim: mahasiswa.nim,
            jurusan: mahasiswa.jurusan,
            semester: mahasiswa.semester,
            no_hp: mahasiswa.no_hp ?? '',
        });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editData) {
            put(`/admin/mahasiswa/${editData.id}`, {
                onSuccess: () => { reset(); setShowModal(false); },
            });
        } else {
            post('/admin/mahasiswa', {
                onSuccess: () => { reset(); setShowModal(false); },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus mahasiswa ini?')) {
            destroy(`/admin/mahasiswa/${id}`);
        }
    };

    return (
        <>
            <Head title="Data Mahasiswa" />
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar role="admin" />

                <main className="flex-1 p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Data Mahasiswa</h2>
                            <p className="text-gray-500 mt-1">Kelola data mahasiswa</p>
                        </div>
                        <button
                            onClick={openAdd}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                        >
                            + Tambah Mahasiswa
                        </button>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-6 py-4 font-medium text-gray-600">No</th>
                                    <th className="text-left px-6 py-4 font-medium text-gray-600">NIM</th>
                                    <th className="text-left px-6 py-4 font-medium text-gray-600">Nama</th>
                                    <th className="text-left px-6 py-4 font-medium text-gray-600">Jurusan</th>
                                    <th className="text-left px-6 py-4 font-medium text-gray-600">Semester</th>
                                    <th className="text-left px-6 py-4 font-medium text-gray-600">No HP</th>
                                    <th className="text-left px-6 py-4 font-medium text-gray-600">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {mahasiswas.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-8 text-gray-400">
                                            Belum ada data mahasiswa.
                                        </td>
                                    </tr>
                                ) : (
                                    mahasiswas.map((m, i) => (
                                        <tr key={m.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-gray-600">{i + 1}</td>
                                            <td className="px-6 py-4 font-medium text-gray-800">{m.nim}</td>
                                            <td className="px-6 py-4 text-gray-800">{m.nama}</td>
                                            <td className="px-6 py-4 text-gray-600">{m.jurusan}</td>
                                            <td className="px-6 py-4 text-gray-600">{m.semester}</td>
                                            <td className="px-6 py-4 text-gray-600">{m.no_hp ?? '-'}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => openEdit(m)}
                                                        className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(m.id)}
                                                        className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            {editData ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            {[
                                { label: 'Nama Lengkap', key: 'name', type: 'text' },
                                { label: 'Email', key: 'email', type: 'email' },
                                { label: 'Password', key: 'password', type: 'password' },
                                { label: 'NIM', key: 'nim', type: 'text' },
                                { label: 'Jurusan', key: 'jurusan', type: 'text' },
                                { label: 'Semester', key: 'semester', type: 'text' },
                                { label: 'No HP', key: 'no_hp', type: 'text' },
                            ].map(({ label, key, type }) => (
                                <div key={key}>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                                    <input
                                        type={type}
                                        value={data[key]}
                                        onChange={(e) => setData(key, e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder={editData && key === 'password' ? 'Kosongkan jika tidak diubah' : ''}
                                    />
                                    {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                                </div>
                            ))}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}