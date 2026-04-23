import { Link, usePage } from '@inertiajs/react';

export default function Sidebar({ role }) {
    const { url } = usePage();

    const adminMenus = [
        { href: '/admin/dashboard', label: '📊 Dashboard' },
        { href: '/admin/mahasiswa', label: '👥 Mahasiswa' },
        { href: '/admin/absensi',   label: '📋 Absensi' },
        { href: '/admin/laporan',   label: '📄 Laporan' },
    ];

    const mahasiswaMenus = [
        { href: '/mahasiswa/dashboard', label: '🏠 Dashboard' },
    ];

    const menus = role === 'admin' ? adminMenus : mahasiswaMenus;

    return (
        <aside className="w-64 min-h-screen bg-indigo-800 text-white flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-indigo-700">
                <h1 className="text-xl font-bold">🎓 Absensi</h1>
                <p className="text-indigo-300 text-sm mt-1">
                    {role === 'admin' ? 'Admin Panel' : 'Mahasiswa Panel'}
                </p>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4">
                <ul className="space-y-1">
                    {menus.map((menu) => (
                        <li key={menu.href}>
                            <Link
                                href={menu.href}
                                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                    url.startsWith(menu.href)
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                                }`}
                            >
                                {menu.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-indigo-700">
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-indigo-200 hover:bg-indigo-700 hover:text-white transition-colors"
                >
                    🚪 Logout
                </Link>
            </div>
        </aside>
    );
}