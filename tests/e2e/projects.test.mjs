import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const read = file => readFileSync(new URL(`../../${file}`, import.meta.url), 'utf8');
test('published projects retain one bilingual list and internal overview routes', () => {
    const projects = JSON.parse(read('src/data/projects.json')).filter(project => project.published);
    for (const lang of ['id', 'en']) {
        const home = read(`dist/${lang}/index.html`);
        assert.equal((home.match(/id="projects"/g) || []).length, 1);
        assert.equal((home.match(/data-carousel="projects"/g) || []).length, 1);
        assert.equal((home.match(/data-project-select=/g) || []).length, projects.length);
        for (const project of projects) {
            assert(home.includes(`/work/${project.slug}/`));
            assert(home.includes(project.status[lang]));
        }
        const overview = read(`dist/${lang}/work/mudahnulis/index.html`);
        assert(!overview.includes('Live demo') && !overview.includes('>GitHub<'));
        const mudahnulis = projects.find(project => project.slug === 'mudahnulis');
        assert.equal((overview.match(/<figure[^>]*data-gallery-slide/g) || []).length, mudahnulis.gallery.length);
        assert(overview.includes('class="project-hero"'));
        for (const section of mudahnulis.sections) assert(overview.includes(section.title[lang]));
        const idx = projects.find(project => project.slug === 'idx-stock-screener');
        assert(idx.cover.endsWith('/idx-screener-dashboard.png'));
        assert.deepEqual(idx.gallery.map(image => image.path.split('/').pop()), ['idx-preview1.png', 'idx-preview2.png', 'idx-preview3.png']);
        assert.equal(idx.sections.find(section => section.id === 'overview').items.length, 3);
        const detail = read(`dist/${lang}/work/${idx.slug}/index.html`);
        for (const section of idx.sections) {
            assert(detail.includes(section.title[lang]));
            for (const item of section.items || []) assert(detail.includes(item.body[lang].replaceAll('&', '&amp;')));
        }
        assert(detail.includes('class="project-steps"'));
        assert(detail.includes('class="feature-icon"'));
        assert.equal((detail.match(/<figure[^>]*data-gallery-slide/g) || []).length, idx.gallery.length);
        for (const url of [idx.githubUrl, idx.demoUrl]) {
            assert(detail.includes(`href="${url}" target="_blank" rel="noopener noreferrer"`));
        }
    }
});

test('gallery selection handles zero, one, and multiple images without autoplay', () => {
    const source = read('src/components/portfolio/ProjectGallery.astro');
    const script = ts.transpileModule(source.split('<script>')[1].split('</script>')[0], { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
    for (const count of [0, 1, 3]) {
        const slides = Array.from({ length: count }, () => ({ hidden: false }));
        const buttons = slides.map((_, index) => ({ dataset: { gallerySelect: String(index) }, setAttribute(name, value) { this[name] = value; }, addEventListener(name, fn) { this[name] = fn; } }));
        const control = () => ({ addEventListener(name, fn) { this[name] = fn; } });
        const previous = control(), next = control(), position = {}, navigation = { hidden: true };
        const gallery = {
            addEventListener(name, fn) { this[name] = fn; },
            querySelectorAll: selector => selector === '[data-gallery-slide]' ? slides : buttons,
            querySelector: selector => ({ '.gallery-navigation': count > 1 ? navigation : null, '[data-gallery-prev]': previous, '[data-gallery-next]': next, '[data-gallery-position]': position })[selector],
        };
        runInNewContext(script, { document: { querySelectorAll: () => [gallery] } });
        if (count < 2) { assert(slides.every(slide => !slide.hidden)); continue; }
        assert.equal(navigation.hidden, false);
        assert.equal(position.textContent, '1 / 3');
        next.click(); assert.equal(slides[1].hidden, false);
        buttons[2].click(); assert.equal(position.textContent, '3 / 3');
        next.click(); assert.equal(position.textContent, '1 / 3');
        previous.click(); assert.equal(position.textContent, '3 / 3');
        gallery.touchstart({ touches: [{ clientX: 200, clientY: 10 }] });
        gallery.touchend({ changedTouches: [{ clientX: 90, clientY: 12 }], target: { closest: () => null } });
        assert.equal(position.textContent, '1 / 3');
    }
    assert(source.includes('method="dialog"'));
    assert(source.includes('href={imageAsset(image.path)}'));
});