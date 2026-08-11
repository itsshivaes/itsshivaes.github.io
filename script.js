 (function() {
            'use strict';

            // ===== PRELOADER =====
            window.addEventListener('load', function() {
                const preloader = document.getElementById('preloader');
                if (preloader) {
                    preloader.classList.add('hidden');
                    setTimeout(function() { preloader.style.display = 'none'; }, 600);
                }
            });

            // ===== THEME =====
            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = document.getElementById('themeIcon');
            const html = document.documentElement;
            const stored = localStorage.getItem('theme');

            function setTheme(dark) {
                if (dark) {
                    html.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    themeIcon.innerHTML =
                        '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
                } else {
                    html.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                    themeIcon.innerHTML =
                        '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
                }
            }

            if (stored === 'dark') {
                setTheme(true);
            } else if (stored === 'light') {
                setTheme(false);
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setTheme(true);
            }

            themeToggle.addEventListener('click', function() {
                const isDark = html.getAttribute('data-theme') === 'dark';
                setTheme(!isDark);
            });

            // ===== MOBILE NAV =====
            const hamburger = document.getElementById('hamburgerBtn');
            const mobileNav = document.getElementById('mobileNav');

            hamburger.addEventListener('click', function() {
                const open = mobileNav.classList.toggle('open');
                hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
            });

            // Close mobile nav on link click
            mobileNav.querySelectorAll('a').forEach(function(link) {
                link.addEventListener('click', function() {
                    mobileNav.classList.remove('open');
                    hamburger.setAttribute('aria-expanded', 'false');
                });
            });

            // ===== ACTIVE NAV LINK =====
            const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
            const sections = document.querySelectorAll('section[id]');

            function updateActive() {
                let current = '';
                const scrollPos = window.scrollY + 100;
                sections.forEach(function(section) {
                    const top = section.offsetTop;
                    const height = section.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        current = section.getAttribute('id');
                    }
                });
                navLinks.forEach(function(link) {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
                });
            }

            window.addEventListener('scroll', updateActive, { passive: true });
            window.addEventListener('load', updateActive);

            // ===== INTERSECTION OBSERVER (reveal sections) =====
            const revealSections = document.querySelectorAll('section:not(.hero)');
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

            revealSections.forEach(function(section) {
                observer.observe(section);
            });

            // ===== SKILL BARS =====
            const skillBars = document.querySelectorAll('.bar-fill');
            const skillObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const fill = entry.target;
                        const width = fill.getAttribute('data-width');
                        if (width) {
                            fill.style.width = width + '%';
                        }
                        skillObserver.unobserve(fill);
                    }
                });
            }, { threshold: 0.5 });

            skillBars.forEach(function(bar) {
                skillObserver.observe(bar);
            });

            // ===== GITHUB REPOS =====
            const repoList = document.getElementById('repoList');

            async function fetchRepos() {
                try {
                    const res = await fetch('https://api.github.com/users/itsshivaes/repos?sort=updated&per_page=6');
                    if (!res.ok) throw new Error('GitHub API error');
                    const repos = await res.json();

                    repoList.innerHTML = repos.map(function(repo) {
                        const langColor = repo.language ? getLangColor(repo.language) : '#6e6e73';
                        const desc = repo.description || 'No description provided.';
                        return '<li>' +
                            '<div class="repo-info">' +
                            '<a href="' + repo.html_url + '" target="_blank" rel="noopener" class="repo-name">' +
                            '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>' +
                            repo.name +
                            '</a>' +
                            '<span class="repo-desc">' + desc + '</span>' +
                            '</div>' +
                            '<div class="repo-meta">' +
                            '<span><span class="lang-color" style="background:' + langColor + '"></span>' + (repo
                                .language || 'N/A') + '</span>' +
                            '<span>⭐ ' + repo.stargazers_count + '</span>' +
                            '</div>' +
                            '</li>';
                    }).join('');
                } catch (err) {
                    repoList.innerHTML =
                        '<li style="padding:16px;color:var(--text-secondary);">Could not load repositories. Please try again later.</li>';
                    console.warn('GitHub fetch error:', err);
                }
            }

            function getLangColor(lang) {
                const colors = {
                    'JavaScript': '#f1e05a',
                    'Python': '#3572A5',
                    'HTML': '#e34c26',
                    'CSS': '#563d7c',
                    'TypeScript': '#2b7489',
                    'Shell': '#89e051',
                    'Java': '#b07219',
                    'Ruby': '#701516',
                    'PHP': '#4F5D95',
                    'Swift': '#ffac45',
                    'Go': '#00ADD8',
                    'Rust': '#dea584',
                    'Vue': '#41b883',
                    'C++': '#f34b7d',
                    'C#': '#178600',
                };
                return colors[lang] || '#6e6e73';
            }

            fetchRepos();

            // ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate
    if (!name || !email || !message) {
        formStatus.textContent = 'Please fill in all fields.';
        formStatus.style.color = 'var(--text-secondary)';
        return;
    }

    // --- CHANGE: Build mailto link ---
    // Replace with your own email address
    const recipient = 'your-email@example.com';   // <-- CHANGE THIS
    const subject = encodeURIComponent('Contact from Portfolio');
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    // Open the user's email client with pre-filled data
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Provide feedback
    formStatus.textContent = 'Opening your email client…';
    formStatus.style.color = 'var(--text-secondary)';

    // Optionally reset the form after a moment
    setTimeout(() => {
        contactForm.reset();
        // Keep the status message visible for a while
    }, 2000);
});

        })();
