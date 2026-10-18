import type { Localized } from '../types/portfolio';

interface Education {
    id: string;
    institution: string;
    logo: string;
    monogram: string;
    startYear: number;
    endYear: number | null;
    program?: Localized;
    status?: Localized;
}

export const education: Education[] = [
    {
        id: 'ui',
        institution: 'Universitas Indonesia',
        logo: 'images/organizations/universitasindonesia.png',
        monogram: 'UI',
        startYear: 2026,
        endYear: null,
        program: { id: 'S1 Matematika · FMIPA', en: 'Undergraduate Mathematics · FMIPA' },
        status: { id: 'Mahasiswa aktif', en: 'Active student' },
    },
    {
        id: 'sman2',
        institution: 'SMA Negeri 2 Surabaya',
        logo: 'images/organizations/sma2.png',
        monogram: 'SMA',
        startYear: 2023,
        endYear: 2026,
    },
];