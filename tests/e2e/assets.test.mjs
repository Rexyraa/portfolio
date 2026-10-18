import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('rendered source images have real data matching their extension', () => {
    const html = readFileSync(new URL('../../dist/en/index.html', import.meta.url), 'utf8');
    const images = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map(match => match[1]);
    assert(images.length >= 12, 'Expected portrait, seven tools, and four organization logos');
    for (const src of images) {
        if (src.startsWith('data:image/svg+xml,')) {
            assert.match(decodeURIComponent(src.slice('data:image/svg+xml,'.length)), /<svg[\s>]/);
            continue;
        }
        const inline = src.match(/^data:image\/(png|jpeg|svg\+xml);base64,(.+)$/);
        const file = inline ? `inline.${inline[1] === 'jpeg' ? 'jpg' : inline[1] === 'svg+xml' ? 'svg' : inline[1]}` : decodeURIComponent(src.includes('/_astro/') ? src.slice(src.indexOf('/_astro/') + 1) : src.replace(process.env.BASE_PATH || '/', ''));
        const data = inline ? Buffer.from(inline[2], 'base64') : readFileSync(new URL(`../../dist/${file}`, import.meta.url));
        assert(data.length > 0, `Empty image: ${src}`);
        if (file.endsWith('.png')) assert.equal(data.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', src);
        else if (/\.jpe?g$/.test(file)) assert.equal(data.subarray(0, 3).toString('hex'), 'ffd8ff', src);
        else if (file.endsWith('.svg')) assert.match(data.toString('utf8'), /<svg[\s>]/, src);
    }
});