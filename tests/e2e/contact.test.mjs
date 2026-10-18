import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

for (const locale of ['id', 'en']) test(`${locale}: approved contact cards and bilingual CV`, () => {
    const html = readFileSync(new URL(`../../dist/${locale}/index.html`, import.meta.url), 'utf8');
    for (const channel of ['whatsapp', 'instagram', 'linkedin']) assert(html.includes(`data-channel="${channel}"`));
    assert(!html.includes('data-channel="github"'));
    assert(html.includes('mailto:athalla.reinaldi@gmail.com'));
    assert(html.includes('https://www.instagram.com/atala.re/'));
    assert(html.includes('https://www.linkedin.com/in/athalla-reinaldi'));
    assert.equal((html.match(/href="[^"]*documents\/cv\/CV Athalla Reinaldi.pdf"/g) || []).length, 2);
    assert(html.includes('ID–EN'));
    const pdf = readFileSync(new URL('../../public/documents/cv/CV Athalla Reinaldi.pdf', import.meta.url));
    assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
});