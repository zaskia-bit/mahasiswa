==========================================================
# STRUKTUR PENYUSUNAN
mahasiswa-absensi/
│
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── DashboardController.php
│   │   │   ├── MahasiswaController.php
│   │   │   ├── AbsensiController.php
│   │   │   └── LaporanController.php
│   │   │
│   │   ├── Middleware/
│   │   │   └── RoleMiddleware.php
│   │
│   ├── Models/
│   │   ├── User.php
│   │   ├── Mahasiswa.php
│   │   └── Absensi.php
│
├── database/
│   ├── migrations/
│   │   ├── create_users_table.php
│   │   ├── create_mahasiswa_table.php
│   │   └── create_absensi_table.php
│   │
│   ├── seeders/
│   │   ├── DatabaseSeeder.php
│   │   ├── UserSeeder.php
│   │   └── MahasiswaSeeder.php
│
├── resources/
│   ├── views/
│   │   ├── layout.blade.php
│   │   ├── login.blade.php
│   │   ├── home.blade.php
│   │   │
│   │   ├── admin/
│   │   │   ├── dashboard.blade.php
│   │   │   ├── mahasiswa.blade.php
│   │   │   └── laporan.blade.php
│   │   │
│   │   ├── mahasiswa/
│   │   │   ├── dashboard.blade.php
│   │   │   └── absensi.blade.php
│   │
│   ├── js/
│   │   ├── app.jsx
│   │   └── components/
│   │       ├── DashboardAdmin.jsx
│   │       ├── DashboardMahasiswa.jsx
│   │       ├── Mahasiswa.jsx
│   │       ├── Absensi.jsx
│   │       ├── Laporan.jsx
│   │       └── Login.jsx
│
├── routes/
│   └── web.php
│
├── public/
│
├── vite.config.js
├── package.json
├── .env
└── artisan
==============================================================

>>STEP BY STEP<<
 STEP 1 — Buat Project & Install Dependencies
 STEP 2 — Konfigurasi .env & Database
 STEP 3 — Migration (users, mahasiswas, absensis)
 STEP 4 — Model (User, Mahasiswa, Absensi) + Relasi
 STEP 5 — Seeder (Admin + Mahasiswa default)
 STEP 6 — Middleware RoleMiddleware
 STEP 7 — Routes (web.php)
 STEP 8 — Controllers (Auth, Dashboard, Mahasiswa, Absensi, Laporan)
 STEP 9 — Blade Layout (layout.blade.php, login.blade.php, dll)
 STEP 10 — React Components (semua .jsx)
 STEP 11 — Vite Config & app.jsx
 STEP 12 — Final Testing & Jalankan

 >>STEP 1 — Membuat Project Laravel di Laragon
1. Buka Terminal Laragon
    # cd C:/laragon/www
2. Buat Project Laravel 
    # composer create-project laravel/laravel attendance-system
3. Install React + Vite (Laravel Breeze dengan React)
    # composer require laravel/breeze --dev
    >> KEMUDIAN JALANKAN: php artisan breeze:install react
4. Install Node Dependencies
    # npm install

 >>STEP 2 KONFGURASI .ENV&DATABASE
1. Konfigurasi .env
================================================================
APP_NAME="Mahasiswa Absensi"
APP_ENV=local
APP_KEY=base64:3O4REoZxD93wfiP/ECrootXS/FMUOjbRgjyiL8NKm78=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mahasiswa_absensi
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync

SESSION_LIFETIME=120

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local

MAIL_MAILER=log

VITE_APP_NAME="${APP_NAME}"
==============================================================

2. Buat Database di Laragon
    # CREATE DATABASE mahasiswa_absensi;
3. Tes Koneksi
    # php artisan migrate:status
4. Clear Config Cache
    # php artisan config:clear
    # php artisan cache:clear

5. Generate App Key
    # php artisan key:generate

 >> STEP 3 — Migration (users, mahasiswas, absensis) 
 >> STEP 4 — Model (User, Mahasiswa, Absensi) + Relasi
1. buat file di terminal
    # php artisan make:model create_user --migration
    # php artisan make:model create_mahasiswas_table --migration
    # php artisan make:mode create_absensis_table --migration
2. Jalankan Migration
    # php artisan migrate

 >> STEP 5 — Seeder (Admin + Mahasiswa Default)
1. Buka file dan edit
   # database/seeders/DatabaseSeeder.php
2. Buat file UserSedeer
   # php artisan make:seeder UserSeeder
3. Buat file MahasiswaSeeder
   # php artisan make:seeder MahasiswaSeeder
    >>JALANKAN SEEDER<<
      # php artisan db:seed
4. Tambah Kolom Role ke Tabel Users
   # php artisan migrate:rollback
5. Jalankan Migrate ulang
   # php artisan migrate
6. Jalankan Seeder lagi
   # php artisan db:seed
7. Freesh Migration
   # php artisan migrate:fresh

>>  STEP 6 — Middleware RoleMiddleware
1. Buat File RoleMiddleware
   # php artisan make:middleware RoleMiddleware

>> STEP 7 — Routes (web.php)
        >> EDIT Routes (web.php) <<
>> Verifikasi Routes
   # php artisan route:list

>> STEP 8 — Controllers
1. Buat AuthController
   # php artisan make:controller AuthController
2. Buat DashboardController
   # php artisan make:controller DashboardController
3. Buat MahasiswaController
   # php artisan make:controller MahasiswaController
4. Buat AbsensiController
   # php artisan make:controller AbsensiController
5. Buat LaporanController
   # php artisan make:controlle
   
>> STEP 9 - Blade Layout
1. Buat File app.blade.php
2. Buat File laporan-print.blade.php

>> STEP 10 — React Components
1. Buat Struktur Folder
=============================
resources/js/
├── app.jsx
├── Components/
│   └── Sidebar.jsx
└── Pages/
    ├── Login.jsx
    ├── Admin/
    │   ├── Dashboard.jsx
    │   ├── Mahasiswa.jsx
    │   ├── Absensi.jsx
    │   └── Laporan.jsx
    └── Mahasiswa/
        └── Dashboard.jsx
=============================

>> STEP 11 — Vite Config & app.jsx
1. Edit vite.config.js
   >>GANTI SEMUA FILE NYA<<
================================================================================
   import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});
==================================================================================

2. Edit app.jsx
   >> GANTI SEMUA FILE NYA<<
================================================================================
import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createInertiaApp({
    title: (title) => `${title} — Mahasiswa Absensi`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4f46e5',
    },
});
===============================================================================
>> STEP 12 — Final Testing & Jalankan
1. JALANKAN DI TERMINAL (1)
   # php artisan serve
2. JALANKAN DI TERMINAL (2)
   # npm run dev
    >> KEMUDIAN TES LOGIN <<

>> JANGAN LUPA HAPUS FILE INI<<
   buka resources/js/Components
   >> HAPUS BAGIAN IN <<
   ❌ Components/ApplicationLogo.jsx
   ❌ Components/Checkbox.jsx
   ❌ Components/Dropdown.jsx
   ❌ Components/InputError.jsx 
   ❌ Components/InputLabel.jsx
   ❌ Components/Modal.jsx
   ❌ Components/NavLink.jsx
   ❌ Components/PrimaryButton.jsx
   ❌ Components/ResponsiveNavLink.jsx
   ❌ Components/TextInput.jsx
   ❌ Layouts/ (seluruh folder)
   ❌ Pages/Auth/ (seluruh folder)
   ❌ Pages/Dashboard.jsx (bawaan breeze)
   ❌ Pages/Profile/ (seluruh folder)
   ❌ Pages/Welcome.jsx

>> Edit juga untuk LaporanController.php ganti isinya <<
=======================================================================================
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
======================================================================================================

>> Jalankan ini
   # php artisan migrate:fresh --seed
   # php artisan storage:link
   # php artisan route:list | findstr login

>> JALANKAN SERVERNYA KE 2 TERMINAL <<
   # php artisan serve
   # npm run dev