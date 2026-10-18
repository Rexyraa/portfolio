import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read = file => JSON.parse(readFileSync(new URL(`../${file}`, import.meta.url), 'utf8'));
const site = read('src/config/site.json');
const keys = (object, prefix = '') => Object.entries(object).flatMap(([key, value]) => typeof value === 'object' ? keys(value, `${prefix}${key}.`) : [`${prefix}${key}`]).sort();
const id = read('src/i18n/id.json');
const en = read('src/i18n/en.json');
assert.deepEqual(keys(id), keys(en), 'ID/EN UI keys must match');
const localized = (value, label) => ['id', 'en'].forEach(locale => assert.equal(typeof value?.[locale] === 'string' && !!value[locale].trim(), true, `${label}.${locale} is required`));
const asset = file => {
    assert.equal(typeof file, 'string');
    assert(!file.includes('..') && !file.includes('\\') && !file.includes('://'), `Invalid asset path: ${file}`);
    const location = file.startsWith('src/assets/') ? file : `public/${file.replace(/^\//, '')}`;
    assert(existsSync(new URL(`../${location}`, import.meta.url)), `Missing asset: ${file}`);
};
const safeUrl = url => { const parsed = new URL(url); assert.equal(parsed.protocol, 'https:', `HTTPS required: ${url}`); assert(!parsed.username && !parsed.password); };
const date = value => assert(/^\d{4}-\d{2}-\d{2}$/.test(value) && new Date(value).toISOString().slice(0, 10) === value, `Invalid date: ${value}`);
const slugs = new Set();
for (const project of read('src/data/projects.json').filter(p => p.published)) {
    assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug), 'Invalid project slug');
    assert(!slugs.has(project.slug), `Duplicate slug: ${project.slug}`); slugs.add(project.slug);
    assert(['college', 'personal'].includes(project.category));
    assert(['preview', 'overview', 'case-study'].includes(project.detailMode || 'case-study'));
    for (const field of ['title', 'summary', 'status']) localized(project[field], field);
    for (const field of ['role', 'team', 'kind']) if (project[field]) localized(project[field], field);
    if (project.date) date(project.date);
    if (project.cover) asset(project.cover);
    if (!['preview', 'overview'].includes(project.detailMode)) {
        localized(project.role, 'role'); localized(project.team, 'team');
        date(project.date); asset(project.cover);
    }
    for (const field of ['githubUrl', 'demoUrl']) if (project[field]) safeUrl(project[field]);
    const orders = new Set();
    const sectionIds = new Set();
    for (const section of project.sections || []) {
        assert(/^[a-z][a-z0-9-]*$/.test(section.id) && !sectionIds.has(section.id), 'Invalid or duplicate project section');
        sectionIds.add(section.id); localized(section.title, 'section.title'); localized(section.body, 'section.body');
        if (section.ordered !== undefined) assert.equal(typeof section.ordered, 'boolean');
        if (section.items) {
            assert(Array.isArray(section.items));
            for (const item of section.items) {
                localized(item.title, 'item.title'); localized(item.body, 'item.body');
                if (item.icon !== undefined) assert.equal(typeof item.icon, 'string');
            }
        }
    }
    for (const image of project.gallery || []) {
        assert(image.path.startsWith('src/assets/images/projects/'), 'Gallery images must be bundled project assets');
        asset(image.path); localized(image.alt, 'gallery.alt');
        if (image.caption) localized(image.caption, 'gallery.caption');
        assert(Number.isInteger(image.order) && !orders.has(image.order), 'Gallery order must be a unique integer');
        orders.add(image.order);
        if (image.cover !== undefined) assert.equal(typeof image.cover, 'boolean');
    }
    assert((project.gallery || []).filter(image => image.cover).length <= 1, 'Only one gallery cover allowed');
    assert(Array.isArray(project.tags) && project.tags.length <= 4);
    for (const locale of ['preview', 'overview'].includes(project.detailMode) ? [] : ['id', 'en']) {
        const file = new URL(`../src/content/projects/${locale}/${project.slug}.md`, import.meta.url);
        assert(existsSync(file), `Missing ${locale} case study: ${project.slug}`);
        assert(readFileSync(file, 'utf8').trim(), 'Case study must not be empty');
    }
    for (const artifact of project.artifacts) { localized(artifact.label, 'artifact.label'); artifact.url.startsWith('https:') ? safeUrl(artifact.url) : asset(artifact.url); }
}
for (const c of read('src/data/certifications.json').filter(c => c.published)) {
    localized(c.title, 'certificate.title'); assert(/^[a-z][a-z0-9-]*$/.test(c.id)); assert(c.issuer); date(c.issuedAt); asset(c.previewAsset); asset(c.originalAsset);
}
for (const file of Object.values(site.cvAssets).filter(Boolean)) { asset(file); assert(file.endsWith('.pdf')); }
if (site.portrait) asset(site.portrait);
Object.values(site.socialUrls).forEach(safeUrl);
if (site.publicEmail) assert(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.publicEmail), 'Invalid email');
if (site.publicWhatsApp) assert(/^[1-9]\d{7,14}$/.test(site.publicWhatsApp), 'Use international WhatsApp digits only');
if (site.readyForPublication) {
    assert(site.publicEmail && site.portrait && site.cvAssets.id && site.cvAssets.en, 'Publication requires email, portrait, and both CVs');
    assert(slugs.size, 'Publication requires at least one verified case study');
    assert(process.env.SITE_URL, 'Publication requires SITE_URL');
    safeUrl(process.env.SITE_URL);
}
console.log('Content validation passed.');