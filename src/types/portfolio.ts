export type Locale = 'id' | 'en';
export type Localized = Record<Locale, string>;
export interface Project {
    slug: string;
    category: 'college' | 'personal';
    published: boolean;
    title: Localized;
    summary: Localized;
    role?: Localized;
    date?: string;
    status: Localized;
    team?: Localized;
    cover?: string;
    detailMode?: 'case-study' | 'preview' | 'overview';
    sections?: { id: string; title: Localized; body: Localized; ordered?: boolean; items?: { title: Localized; body: Localized; icon?: string }[] }[];
    kind?: Localized;
    stack?: string[];
    gallery?: { path: string; alt: Localized; caption?: Localized; order: number; cover?: boolean }[];
    githubUrl?: string;
    demoUrl?: string;
    tags: string[];
    artifacts: { label: Localized; url: string }[];
}
export interface Certification {
    id: string;
    published: boolean;
    title: Localized;
    issuer: string;
    issuedAt: string;
    previewAsset: string;
    originalAsset: string;
}