import { path } from './paths';
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
const assets = import.meta.glob<string>('/src/assets/**/*.{svg,webp,avif,png,jpg,jpeg}', { eager: true, query: '?url', import: 'default' });
const images = import.meta.glob<ImageMetadata>('/src/assets/**/*.{webp,avif,png,jpg,jpeg}', { eager: true, import: 'default' });
const previews = Object.fromEntries(await Promise.all(Object.entries(images).map(async ([file, src]) => [file, (await getImage({ src, width: Math.min(src.width, 1200), format: 'webp', quality: 75 })).src])));
// Missing optional images use the component's monogram, never a broken image URL.
export const sourceAsset = (file: string) => previews[`/src/assets/${file.replace(/^\//, '')}`] || assets[`/src/assets/${file.replace(/^\//, '')}`];
export const originalImageAsset = (file: string) => file.startsWith('src/assets/') ? assets[`/${file}`] : file ? path(file) : undefined;
export const imageAsset = (file: string) => file.startsWith('src/assets/') ? sourceAsset(file.slice('src/assets/'.length)) : file ? path(file) : undefined;