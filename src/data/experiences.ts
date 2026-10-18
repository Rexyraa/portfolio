import type { Localized } from '../types/portfolio';

export const experienceCategories = ['work', 'organization', 'volunteer'] as const;
interface Experience {
    id: string;
    category: typeof experienceCategories[number];
    organization: string;
    monogram: string;
    logo: string;
    context?: string;
    startDate: string | null;
    endDate: string | null;
    isCurrent: boolean;
    role: Localized;
    responsibilities: Record<'id' | 'en', string[]>;
}

export const experiences: Experience[] = [
    {
        id: 'tutor', category: 'work', organization: 'Independent', monogram: 'MT', logo: 'images/organizations/tutorprivate-logo.png',
        startDate: null, endDate: null, isCurrent: true,
        role: { id: 'Tutor Privat Matematika', en: 'Private Mathematics Tutor' },
        responsibilities: {
            id: ['Memberikan pembelajaran privat matematika SMA secara tatap muka, termasuk untuk murid kelas 10.', 'Menyiapkan bahan ajar dan latihan soal untuk mendukung pembelajaran.'],
            en: ['Provide in-person private mathematics tutoring for high school students, including Grade 10 students.', 'Prepare teaching materials and practice questions to support learning.'],
        },
    },
    {
        id: 'xyraamarket', category: 'work', organization: 'Xyraamarket', monogram: 'XY', logo: 'images/organizations/xyraamarket-logo.jpg',
        startDate: '2023', endDate: '2025', isCurrent: false,
        role: { id: 'Pendiri & Pemilik Bisnis', en: 'Founder & Business Owner' },
        responsibilities: {
            id: ['Mengelola bisnis produk digital mandiri yang melayani 1.500+ pelanggan dan menghasilkan omzet kotor sekitar Rp15 juta selama 2023–2025.', 'Menangani penetapan harga, penganggaran, perhitungan laba, arus kas, dan alokasi modal.', 'Bernegosiasi dengan pemasok dan mengelola hubungan pelanggan.', 'Mengembangkan platform agar dapat mendukung penjual lain.'],
            en: ['Managed an independent digital goods business serving 1,500+ customers and generating approximately Rp15 million in gross revenue during 2023–2025.', 'Handled pricing, budgeting, profit calculation, cash flow, and capital allocation.', 'Negotiated with suppliers and managed customer relations.', 'Expanded the platform to support other sellers.'],
        },
    },
    {
        id: 'student-company', category: 'organization', organization: 'Olativity Student Company', monogram: 'OL', logo: 'images/organizations/olativity-logo.jpg',
        context: 'Prestasi Junior Indonesia', startDate: '2023', endDate: '2024', isCurrent: false,
        role: { id: 'Manajer Produksi', en: 'Production Manager' },
        responsibilities: {
            id: ['Mengelola produksi kit edukasi hidroponik untuk mendukung budidaya pangan berkelanjutan di kawasan perkotaan dengan lahan terbatas.', 'Berkoordinasi dengan tim produksi beranggotakan lima orang mengenai persiapan bahan baku, kesiapan produksi, dan pengendalian kualitas di bawah VP of Production.', 'Mendukung peluncuran produk dengan mengatasi kekurangan bahan pada saat terakhir dan mencari bahan yang diperlukan.'],
            en: ['Managed production for a hydroponic educational kit designed to promote sustainable food cultivation in urban areas with limited land.', 'Coordinated with a five-member production team on raw-material preparation, production readiness, and quality control under the VP of Production.', 'Supported the product launch by resolving last-minute material shortages and sourcing required materials.'],
        },
    },
    {
        id: 'stage-crew', category: 'volunteer', organization: 'Celeste 2K25', monogram: 'CE', logo: 'images/organizations/celeste2k25-logo.jpg',
        startDate: '2024-02', endDate: null, isCurrent: false,
        role: { id: 'Kepala Kru Panggung', en: 'Head of Stage Crew' },
        responsibilities: {
            id: ['Memimpin 15 anggota kru panggung dalam produksi teater musikal yang melibatkan 60 orang.', 'Merancang dan membuat properti panggung serta mengoordinasikan pengadaan, distribusi, dan pengelolaan aset produksi.', 'Berkolaborasi dengan tim lintas fungsi agar kebutuhan belakang panggung selesai sesuai jadwal.'],
            en: ['Led a 15-member stage crew within a 60-person musical theater production.', 'Designed and fabricated stage props while coordinating the procurement, distribution, and management of production assets.', 'Collaborated with cross-functional teams to ensure backstage requirements were completed on schedule.'],
        },
    },
    {
        id: 'scriptwriting', category: 'volunteer', organization: 'Catatan Akhir Sekolah', monogram: 'CAS', logo: 'images/organizations/cas-logo.png',
        startDate: '2026-01', endDate: null, isCurrent: false,
        role: { id: 'Penulis Naskah', en: 'Script Writer' },
        responsibilities: {
            id: ['Menyusun storyline untuk Catatan Akhir Sekolah.', 'Membuat breakdown adegan sebagai panduan alur cerita.', 'Berkoordinasi dengan tim produksi mengenai kebutuhan naskah.'],
            en: ['Developed the storyline for Catatan Akhir Sekolah.', 'Created scene breakdowns to guide the narrative.', 'Coordinated with the production team on script requirements.'],
        },
    },
];

export function sortedExperiences(category: Experience['category']) {
    return experiences.filter(item => item.category === category).sort((a, b) =>
        Number(b.isCurrent) - Number(a.isCurrent) || (b.startDate || '').localeCompare(a.startDate || ''));
}