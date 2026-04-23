<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Absensi</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; font-size: 13px; padding: 20px; }
        h2 { text-align: center; margin-bottom: 5px; }
        p.subtitle { text-align: center; margin-bottom: 20px; color: #555; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #333; padding: 8px 10px; text-align: left; }
        th { background-color: #f0f0f0; }
        tr:nth-child(even) { background-color: #fafafa; }
        .badge-hadir { color: green; font-weight: bold; }
        .badge-telat { color: orange; font-weight: bold; }
        @media print {
            button { display: none; }
        }
    </style>
</head>
<body>

    <h2>Laporan Absensi Mahasiswa</h2>
    <p class="subtitle">
        Periode: {{ \Carbon\Carbon::create()->month($bulan)->translatedFormat('F') }} {{ $tahun }}
    </p>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama Mahasiswa</th>
                <th>NIM</th>
                <th>Tanggal</th>
                <th>Jam Masuk</th>
                <th>Jam Pulang</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @forelse($absensis as $index => $absensi)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $absensi->mahasiswa->nama }}</td>
                <td>{{ $absensi->mahasiswa->nim }}</td>
                <td>{{ \Carbon\Carbon::parse($absensi->tanggal)->format('d/m/Y') }}</td>
                <td>{{ $absensi->jam_masuk ?? '-' }}</td>
                <td>{{ $absensi->jam_pulang ?? '-' }}</td>
                <td>
                    <span class="badge-{{ $absensi->status }}">
                        {{ ucfirst($absensi->status) }}
                    </span>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="7" style="text-align:center;">Tidak ada data absensi.</td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <br>
    <button onclick="window.print()" 
        style="padding:8px 20px; background:#4f46e5; color:white; border:none; border-radius:5px; cursor:pointer;">
        🖨️ Print
    </button>

</body>
</html>