import { path } from './paths';
const assets = import.meta.glob<string>('/src/assets/**/*.{svg,webp,avif,png,jpg,jpeg}', { eager: true, query: '?url', import: 'default' });
// Missing optional images use the component's monogram, never a broken image URL.
export const sourceAsset = (file: string) => assets[`/src/assets/${file.replace(/^\//, '')}`];
export const imageAsset = (file: string) => file.startsWith('src/assets/') ? sourceAsset(file.slice('src/assets/'.length)) : file ? path(file) : undefined;