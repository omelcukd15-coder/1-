(() => {
    'use strict';

    class PortfolioApp {
        constructor() {
            this.projects = [
                {
                    title: 'Premium Dashboard',
                    description: 'Современная аналитическая платформа с premium UI, высокой производительностью и smooth UX.'
                },
                {
                    title: 'AI Landing',
                    description: 'Маркетинговый сайт с premium motion design и высокой конверсией.'
                },
                {
                    title: 'E-Commerce Platform',
                    description: 'Быстрый интернет-магазин с focus на UX и оптимизацию.'
                }
            ];
            this.typingComplete = false;
            this.init();
        }

        init() {
            this.renderProjects();
            this.initReveal();
            this.initCounters();
            this.initProgressBars();
            this.initNavigation();
            this.initMagneticButtons();
            this.initCursorGlow();
            this.initTypingAnimation();
            this.initMobileMenu();
        }

        renderProjects() {
            const grid = document.getElementById('projectsGrid');
            if (!grid) return;
            grid.innerHTML = this.projects.map(project => `
                <article class="project-card reveal">
                    <h3>${this.escapeHtml(project.title)}</h3>
                    <p>${this.escapeHtml(project.description)}</p>
                </article>
            `).join('');
            this.initReveal();
        }

        escapeHtml(str) {
            return str.replace(/[&<>]/g, function(m) {
                if (m === '&') return '&amp;';
                if (m === '<') return '&lt;';
                if (m === '>') return '&gt;';
                return m;
            });
        }

        initReveal() {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, { threshold: 0.15 });
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        }

        initCounters() {
            const counters = document.querySelectorAll('[data-counter]');
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            counters.forEach(counter => observer.observe(counter));
        }

        animateCounter(el) {
            const target = parseInt(el.dataset.counter, 10);
            let current = 0;
            const increment = target / 55;
            const update = () => {
                current += increment;
                if (current < target) {
                    el.innerText = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    el.innerText = target;
                }
            };
            update();
        }

        initProgressBars() {
            const progressBars = document.querySelectorAll('.progress-fill');
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const width = entry.target.dataset.width;
                        entry.target.style.width = `${width}%`;
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            progressBars.forEach(bar => observer.observe(bar));
        }

        initNavigation() {
            const links = document.querySelectorAll('.nav-link');
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                        links.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                });
            });
        }

        initMagneticButtons() {
            const buttons = document.querySelectorAll('.magnetic');
            buttons.forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
                });
                btn.addEventListener('mouseleave', () => {
                    btn.style.transform = 'translate(0,0)';
                });
            });
        }

        initCursorGlow() {
            const glow = document.querySelector('.cursor-glow');
            if (!glow) return;
            document.addEventListener('mousemove', (e) => {
                glow.style.opacity = '1';
                glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            });
            document.addEventListener('mouseleave', () => {
                glow.style.opacity = '0';
            });
        }

        initTypingAnimation() {
            const codeContainer = document.getElementById('typing-code');
            if (!codeContainer) return;
            const fullCode = `const developer = {\n    name: <span class="green">'Denis'</span>,\n    stack: [\n        <span class="green">'HTML'</span>,\n        <span class="green">'CSS'</span>,\n        <span class="green">'JavaScript'</span>\n    ],\n    ui: <span class="cyan">'Premium'</span>,\n    performance: <span class="cyan">'Fast'</span>\n};`;
            let i = 0;
            codeContainer.innerHTML = '';
            const typeInterval = setInterval(() => {
                if (i < fullCode.length) {
                    codeContainer.innerHTML = fullCode.substring(0, i + 1);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 35);
        }

        initMobileMenu() {
            const menuBtn = document.getElementById('menuBtn');
            const navMenu = document.querySelector('.nav-menu');
            if (!menuBtn || !navMenu) return;
            menuBtn.addEventListener('click', () => {
                const isOpen = navMenu.style.display === 'flex';
                navMenu.style.display = isOpen ? 'none' : 'flex';
                if (!isOpen) {
                    navMenu.style.flexDirection = 'column';
                    navMenu.style.position = 'absolute';
                    navMenu.style.top = '84px';
                    navMenu.style.left = '0';
                    navMenu.style.width = '100%';
                    navMenu.style.backgroundColor = 'rgba(5,5,22,0.95)';
                    navMenu.style.backdropFilter = 'blur(20px)';
                    navMenu.style.padding = '32px';
                    navMenu.style.gap = '28px';
                    navMenu.style.alignItems = 'center';
                    navMenu.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
                } else {
                    navMenu.style = '';
                }
            });
            window.addEventListener('resize', () => {
                if (window.innerWidth > 991 && navMenu.style.display === 'flex') {
                    navMenu.style = '';
                }
            });
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        new PortfolioApp();
    });
})();
