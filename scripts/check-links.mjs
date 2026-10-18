import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(item => item.isDirectory() ? walk(join(directory, item.name)) : [join(directory, item.name)]);
for (const file of walk(dist).filter(file => file.endsWith('.html'))) {
    const html = readFileSync(file, 'utf8');
    for (const [, raw] of html.matchAll(/(?:href|src|data)="([^"]+)"/g)) {
        if (/^(?:https?:|mailto:|data:)/.test(raw)) continue;
        const url = new URL(raw, `https://test.invalid${base}/${relative(dist, file).replaceAll('\\', '/')}`);
        assert(url.pathname.startsWith(`${base}/`), `Link escapes base path: ${raw}`);
        let target = resolve(dist, decodeURIComponent(url.pathname.slice(base.length + 1)));
        assert(existsSync(target), `Broken link in ${file}: ${raw}`);
        if (statSync(target).isDirectory()) target = join(target, 'index.html');
        assert(existsSync(target), `Missing page: ${raw}`);
        if (url.hash && target.endsWith('.html')) {
            const id = decodeURIComponent(url.hash.slice(1));
            assert(readFileSync(target, 'utf8').includes(`id="${id}"`), `Missing anchor: ${raw}`);
        }
    }
}
console.log('Built routes, assets, and anchors passed.');