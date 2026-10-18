// ponytail: static output smoke checks; add browser automation when verified project assets are ready.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const output = file => readFileSync(new URL(`../../dist/${file}`, import.meta.url), 'utf8');
for (const locale of ['id', 'en']) test(`${locale}: static content, sections, and safe empty states`, () => {
    const html = output(`${locale}/index.html`);
    assert(html.includes(`lang="${locale}"`));
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
    for (const id of ['home', 'about', 'skills', 'experience', 'organization', 'projects', 'education', 'contact']) assert(html.includes(`id="${id}"`));
    assert(!html.includes('href="#"'));
    assert(!html.includes('id="certifications"'));
    assert(html.includes('noindex, nofollow'));
});
test('root renders homepage without redirect and 404 exists', () => { assert(!output('index.html').includes('http-equiv="refresh"')); assert(output('index.html').includes('id="home"')); assert(output('404.html').includes('404')); });