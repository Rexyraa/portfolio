const root = document.documentElement;
const themeButton = document.querySelector<HTMLButtonElement>('#theme-toggle');
const scheme = matchMedia('(prefers-color-scheme: dark)');
let explicit = root.dataset.theme === 'dark' || root.dataset.theme === 'light';
const currentTheme = () => root.dataset.theme || (scheme.matches ? 'dark' : 'light');
const labelTheme = () => {
    if (!themeButton) return;
    themeButton.setAttribute('aria-label', (currentTheme() === 'dark' ? themeButton.dataset.light : themeButton.dataset.dark)!);
    themeButton.setAttribute('aria-pressed', String(currentTheme() === 'dark'));
};
if (themeButton) {
    themeButton.hidden = false;
    labelTheme();
    themeButton.addEventListener('click', () => {
        root.dataset.theme = currentTheme() === 'dark' ? 'light' : 'dark';
        explicit = true;
        try { localStorage.setItem('portfolio.theme', root.dataset.theme); } catch { /* Storage is optional. */ }
        labelTheme();
    });
}
scheme.addEventListener('change', () => { if (!explicit) labelTheme(); });

const menus = document.querySelectorAll<HTMLDetailsElement>('[data-menu]');
const closeMenu = (menu: HTMLDetailsElement, focus = false) => {
    menu.open = false;
    if (focus) menu.querySelector<HTMLElement>('summary')?.focus();
};
menus.forEach(menu => {
    menu.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(menu, true); });
    menu.addEventListener('click', event => { if ((event.target as Element).closest('a')) closeMenu(menu); });
    menu.addEventListener('toggle', () => { if (menu.open) menus.forEach(other => { if (other !== menu) closeMenu(other); }); });
});
document.addEventListener('click', event => menus.forEach(menu => { if (menu.open && !menu.contains(event.target as Node)) closeMenu(menu, true); }));
document.querySelectorAll<HTMLDetailsElement>('[data-state-id]').forEach(details => {
    const summary = details.querySelector('summary')!;
    const update = () => summary.setAttribute('aria-expanded', String(details.open));
    update();
    details.addEventListener('toggle', update);
});

document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(group => {
    const track = group.querySelector<HTMLElement>('.project-track');
    if (!track) return;
    const controls = group.querySelector<HTMLElement>('.carousel-controls')!;
    const previous = group.querySelector<HTMLButtonElement>('[data-prev]')!;
    const next = group.querySelector<HTMLButtonElement>('[data-next]')!;
    const update = () => {
        controls.hidden = track.scrollWidth <= track.clientWidth + 2;
        previous.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
        group.dataset.index = String(Math.round(track.scrollLeft / ((track.firstElementChild?.getBoundingClientRect().width || 1) + 22)));
        group.querySelectorAll<HTMLElement>('[data-project-select]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.projectSelect === group.dataset.index)));
        group.querySelector('[data-carousel-status]')!.textContent = `${Number(group.dataset.index) + 1} / ${track.children.length}`;
    };
    const move = (direction: number) => track.scrollBy({ left: direction * (track.firstElementChild!.getBoundingClientRect().width + 22), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    group.querySelectorAll<HTMLButtonElement>('[data-project-select]').forEach(button => button.addEventListener('click', () => {
        track.scrollTo({ left: Number(button.dataset.projectSelect) * (track.firstElementChild!.getBoundingClientRect().width + 22), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }));
    track.addEventListener('scroll', update, { passive: true });
    new ResizeObserver(update).observe(track);
    update();
});

document.querySelectorAll<HTMLAnchorElement>('[data-locale]').forEach(link => {
    link.addEventListener('click', () => {
        link.hash = location.hash;
        try {
            localStorage.setItem('portfolio.locale', link.dataset.locale!);
            sessionStorage.setItem('portfolio.state', JSON.stringify({
                pathname: new URL(link.href).pathname,
                scroll: scrollY,
                experience: Array.from(document.querySelectorAll<HTMLElement>('.experience-card')).find(card => card.getBoundingClientRect().bottom > 100 && card.getBoundingClientRect().top < innerHeight)?.id,
                open: Array.from(document.querySelectorAll<HTMLDetailsElement>('[data-state-id][open]'), d => d.dataset.stateId),
                carousels: Array.from(document.querySelectorAll<HTMLElement>('[data-carousel]'), c => [c.dataset.carousel, c.dataset.index]),
            }));
        } catch { /* Navigation still works with blocked storage. */ }
    });
});
try {
    const saved = JSON.parse(sessionStorage.getItem('portfolio.state') || 'null');
    sessionStorage.removeItem('portfolio.state');
    if (saved?.pathname === location.pathname) {
        document.querySelectorAll<HTMLDetailsElement>('[data-state-id]').forEach(d => { d.open = saved.open.includes(d.dataset.stateId); });
        requestAnimationFrame(() => {
            saved.carousels.forEach(([id, index]: [string, number]) => {
                const group = Array.from(document.querySelectorAll<HTMLElement>('[data-carousel]')).find(c => c.dataset.carousel === id);
                const track = group?.querySelector<HTMLElement>('.project-track');
                if (track?.firstElementChild) track.scrollLeft = Number(index) * (track.firstElementChild.getBoundingClientRect().width + 22);
            });
            const experience = typeof saved.experience === 'string' ? document.getElementById(saved.experience) : null;
            if (experience) experience.scrollIntoView({ behavior: 'instant', block: 'start' });
            else if (!location.hash) scrollTo({ top: Number(saved.scroll), behavior: 'instant' });
        });
    }
} catch { /* Ignore missing or malformed session state. */ }

document.querySelectorAll<HTMLDialogElement>('.image-dialog').forEach(dialog => {
    dialog.addEventListener('keydown', event => {
        if (event.key === 'Escape') { event.preventDefault(); dialog.close(); }
    });
});
document.querySelectorAll<HTMLAnchorElement>('[data-dialog]').forEach(link => {
    link.addEventListener('click', event => {
        const dialog = document.getElementById(link.dataset.dialog!) as HTMLDialogElement | null;
        if (!dialog?.showModal) return;
        event.preventDefault();
        dialog.showModal();
        dialog.addEventListener('close', () => link.focus(), { once: true });
    });
});
const copy = document.querySelector<HTMLButtonElement>('#copy-email');
if (copy) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
        let message = copy.dataset.success!;
        try { await navigator.clipboard.writeText(copy.dataset.email!); } catch { message = copy.dataset.error!; }
        document.getElementById('copy-status')!.textContent = message;
    });
}
const year = document.querySelector('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());
const navLinks = document.querySelectorAll<HTMLAnchorElement>('[data-nav]');
const visible = new Set<string>();
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) visible.add(entry.target.id); else visible.delete(entry.target.id); });
    const active = Array.from(document.querySelectorAll('main section[id]')).find(s => visible.has(s.id))?.id;
    navLinks.forEach(link => { if (link.dataset.nav === active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
}, { rootMargin: '-90px 0px -40% 0px' });
document.querySelectorAll('main section[id]').forEach(s => observer.observe(s));

const experienceLinks = document.querySelectorAll<HTMLAnchorElement>('[data-experience-nav]');
const updateExperienceCategory = () => {
    const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-experience-group]'));
    const active = groups.findLast(group => group.getBoundingClientRect().top <= 220) || groups[0];
    experienceLinks.forEach(link => {
        if (link.dataset.experienceNav === active?.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    });
};
const experienceObserver = new IntersectionObserver(updateExperienceCategory, { rootMargin: '-200px 0px -30% 0px', threshold: [0, .25, .5, .75, 1] });
document.querySelectorAll('[data-experience-group]').forEach(group => experienceObserver.observe(group));
experienceLinks.forEach(link => link.addEventListener('click', () => {
    experienceLinks.forEach(other => {
        if (other === link) other.setAttribute('aria-current', 'location');
        else other.removeAttribute('aria-current');
    });
}));
addEventListener('hashchange', updateExperienceCategory);
updateExperienceCategory();