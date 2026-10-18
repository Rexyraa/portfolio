import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

for (const locale of ['id', 'en']) test(`${locale}: categorized experience and confirmed tools`, () => {
    const html = readFileSync(new URL(`../../dist/${locale}/index.html`, import.meta.url), 'utf8');
    const groups = {};
    for (const category of ['work', 'organization', 'volunteer']) {
        const start = html.indexOf(`id="${category}"`);
        assert(start > 0);
        const next = html.indexOf('data-experience-group', start + 100);
        groups[category] = html.slice(start, next < 0 ? html.indexOf('id="projects"') : next);
    }
    assert(groups.work.includes('Xyraamarket') && groups.work.includes('Independent'));
    assert(groups.organization.includes('Olativity Student Company') && !groups.organization.includes('Celeste 2K25'));
    assert(groups.volunteer.includes('Catatan Akhir Sekolah') && groups.volunteer.includes('Celeste 2K25'));
    assert.equal((html.match(/id="experience-stage-crew"/g) || []).length, 1);
    assert(!html.includes('id="experience-celeste"'));
    assert.equal((html.match(/id="experience-student-company"/g) || []).length, 1);
    for (const [id, count] of [['tutor', 2], ['xyraamarket', 4], ['student-company', 3], ['stage-crew', 3], ['scriptwriting', 3]]) {
        const details = html.match(new RegExp(`<details[^>]*data-state-id="${id}"[\\s\\S]*?</details>`))?.[0];
        assert(details, id);
        assert.equal((details.match(/<li[\s>]/g) || []).length, count, id);
    }
    assert.equal((html.match(/data-tool="/g) || []).length, 7);
    for (const name of ['Microsoft Excel', 'Python', 'Google Sheets', 'n8n', 'Canva', 'Microsoft PowerPoint', 'Microsoft Word']) assert(html.includes(name));
    assert(html.includes('SMA Negeri 2 Surabaya') && html.includes('2023–2026'));
    assert(!html.includes('class="interest-line"'));
    assert(!html.includes('src=""'));
    assert(html.includes(locale === 'id' ? 'omzet kotor' : 'gross revenue'));
});