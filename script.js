/* ============================================================
   script.js — Premium Portfolio JavaScript
   ============================================================ */

'use strict';

// Debug: confirm the script loads and capture global errors
console.log('script.js loaded');
window.addEventListener('error', e => console.error('Global error:', e.message, e.filename, e.lineno, e.colno, e.error));
window.addEventListener('unhandledrejection', e => console.error('Unhandled promise rejection:', e.reason));

/* ── Utility ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── Shared portfolio data (single source of truth for sections + chatbot) ── */
const PROFILE = {
    name: 'Praveen Kumar D',
    role: 'Python Full Stack Developer',
    location: 'Bangalore, India',
    email: 'pkumard398@gmail.com',
    phone: '+91 90259 45924',
    github: 'https://github.com/pkumar029',
    linkedin: 'https://www.linkedin.com/in/praveen-kumar-d-537ab42a3',
    resume: 'assets/praveen%20Resume_Updated.pdf',
};

const SKILLS = [
    { name: 'HTML5',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',      level: 'Expert',      category: 'frontend', pct: 96 },
    { name: 'CSS3',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',        level: 'Expert',      category: 'frontend', pct: 94 },
    { name: 'Bootstrap',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg', level: 'Advanced', category: 'frontend', pct: 88 },
    { name: 'Tailwind CSS',icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg', level: 'Advanced', category: 'frontend', pct: 86 },
    { name: 'Python',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',      level: 'Expert',      category: 'backend', pct: 92 },
    { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',      level: 'Intermediate', category: 'backend', pct: 80 },
    { name: 'SQL',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',      level: 'Advanced',    category: 'backend', pct: 88 },
    { name: 'MySQL',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',      level: 'Advanced',    category: 'backend', pct: 87 },
    { name: 'SQLite',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',    level: 'Advanced',     category: 'backend', pct: 82 },
    { name: 'AWS',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', level: 'Intermediate', category: 'tools', pct: 75 },
    { name: 'Git',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',         level: 'Expert',      category: 'tools',   pct: 92 },
    { name: 'GitHub',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',     level: 'Advanced',    category: 'tools',   pct: 90 },
    { name: 'Visual Studio',icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg', level: 'Advanced', category: 'tools', pct: 84 },
    { name: 'Linux',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', level: 'Intermediate', category: 'tools', pct: 78 },
];

const PROJECTS = [
    {
        title: 'E-Commerce Platform',
        category: 'web',
        categoryLabel: 'Web App',
        desc: 'Full-featured online store with real-time inventory, payment integration, and admin dashboard.',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        badge: 'Featured',
        emoji: '🛒',
        gradient: 'linear-gradient(135deg, #10b98122, #f59e0b22)',
        img: 'assets/projects/ecommerce.jpg',
    },
    {
        title: 'Student Enquiry Chatbot',
        category: 'web',
        categoryLabel: 'AI/Web App',
        desc: 'AI-powered student enquiry chatbot that answers academic queries, admission details, and college information in real time.',
        tags: ['AI', 'Chatbot', 'React', 'Lovable'],
        badge: 'AI',
        emoji: '🎓',
        gradient: 'linear-gradient(135deg, #f59e0b22, #10b98122)',
        liveUrl: 'https://student-chatbox.lovable.app/login',
        img: 'assets/projects/chatbot.jpg',
    },
    {
        title: 'Portfolio Dashboard',
        category: 'web',
        categoryLabel: 'Web App',
        desc: 'Personal portfolio website built from scratch with smooth animations, particle effects, dark theme, and a fully functional contact form.',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'EmailJS'],
        badge: 'Live',
        emoji: '🚀',
        gradient: 'linear-gradient(135deg, #f43f5e22, #10b98122)',
        liveUrl: 'https://praveen.tamix.in/',
        githubUrl: 'https://github.com/pkumar029/portfolio',
        img: 'assets/projects/portfolio.jpg',
    },
    {
        title: 'Fitness Tracker App',
        category: 'mobile',
        categoryLabel: 'Mobile App',
        desc: 'Cross-platform fitness app with workout tracking, nutrition logging, and progress analytics.',
        tags: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
        badge: 'Mobile',
        emoji: '💪',
        gradient: 'linear-gradient(135deg, #22c55e22, #f59e0b22)',
        img: 'assets/projects/fitness.jpg',
    },
    {
        title: 'WhatsApp Automation',
        category: 'web',
        categoryLabel: 'Automation',
        desc: 'Python-based WhatsApp automation tool to send scheduled messages, bulk notifications, and auto-replies using WhatsApp Web API.',
        tags: ['Python', 'Selenium', 'WhatsApp API', 'Automation'],
        badge: 'live',
        emoji: '💬',
        gradient: 'linear-gradient(135deg, #22c55e22, #f59e0b22)',
        liveUrl: 'https://wa.tamix.in/',
        githubUrl: 'https://github.com/pkumar029/-whatsapp-_automate-',
        img: 'assets/projects/whatsapp.jpg',
    },
];

/* ============================================================
   1. LOADING SCREEN
   ============================================================ */
(function initLoader() {
    const loader   = $('#loader');
    const bar      = $('#loaderBar');
    const label    = $('#loaderLabel');
    const messages = [
        'Loading assets…',
        'Building UI…',
        'Optimizing…',
        'Almost ready…',
        'Welcome! 🚀'
    ];
    let progress = 0;
    let msgIdx   = 0;

    // Spawn loader particles
    const pWrap = $('#loaderParticles');
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
            position:absolute;
            width:${Math.random()*4+1}px;
            height:${Math.random()*4+1}px;
            background:rgba(16,185,129,${Math.random()*0.5+0.1});
            border-radius:50%;
            left:${Math.random()*100}%;
            top:${Math.random()*100}%;
            animation: loaderParticleFly ${Math.random()*4+3}s ease-in-out infinite;
            animation-delay:${Math.random()*3}s;
        `;
        pWrap.appendChild(p);
    }

    // Add keyframes for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes loaderParticleFly {
            0%,100%{ transform: translateY(0) scale(1); opacity: 0.3; }
            50%{ transform: translateY(-${Math.random()*60+20}px) scale(1.5); opacity: 0.8; }
        }
    `;
    document.head.appendChild(style);

    const interval = setInterval(() => {
        progress += Math.random() * 18 + 5;
        if (progress > 100) progress = 100;
        bar.style.width = progress + '%';
        label.textContent = messages[Math.min(msgIdx++, messages.length - 1)];
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hide');
                setTimeout(() => { loader.style.display = 'none'; }, 800);
                startApp();
            }, 500);
        }
    }, 250);
})();

/* ============================================================
   2. MAIN APP INIT
   ============================================================ */
function startApp() {
    initCursor();
    initNavbar();
    initHero();
    initParticleCanvas();
    initSkills();
    initProjects();
    initBlog();
    initGithub();
    initTimeline();
    initTestimonials();
    initContact();
    initScrollReveal();
    initBackToTop();
    initChatbot();
    initCounters();
    initProgressBars();
}

/* ============================================================
   3. CUSTOM CURSOR
   ============================================================ */
function initCursor() {
    const cursor   = $('#cursor');
    const follower = $('#cursorFollower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX; mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top  = mouseY + 'px';
    });

    // Smooth follower
    function animFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top  = followerY + 'px';
        requestAnimationFrame(animFollower);
    }
    animFollower();

    // Hover effect — delegated so it also works on cards rendered after this runs
    const HOVER_SELECTOR = 'a, button, .skill-card, .project-card, .blog-card, .contact-card, .social-link';
    document.addEventListener('mouseover', e => {
        if (e.target.closest(HOVER_SELECTOR)) {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        }
    });
    document.addEventListener('mouseout', e => {
        if (e.target.closest(HOVER_SELECTOR)) {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        }
    });
}

/* ============================================================
   4. NAVBAR
   ============================================================ */
function initNavbar() {
    const navbar    = $('#navbar');
    const hamburger = $('#hamburger');
    const navLinks  = $('#navLinks');
    const links     = $$('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveLink();
    });

    // Hamburger
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('mobile-open');
        document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('mobile-open');
            document.body.style.overflow = '';
        });
    });

    // Active link
    function updateActiveLink() {
        const sections = $$('section[id]');
        let currentId = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 200) currentId = sec.id;
        });
        links.forEach(link => {
            link.classList.toggle('active', link.dataset.section === currentId);
        });
    }
}

/* ============================================================
   5. HERO TYPING ANIMATION
   ============================================================ */
function initHero() {
    const dynamicEl = $('#dynamicText');
    const roles = ['Python Full Stack Developer'];
    let roleIdx = 0, charIdx = 0, isDeleting = false;

    function type() {
        const current = roles[roleIdx];
        if (isDeleting) {
            charIdx--;
            dynamicEl.textContent = current.substring(0, charIdx);
        } else {
            charIdx++;
            dynamicEl.textContent = current.substring(0, charIdx);
        }

        let delay = isDeleting ? 60 : 110;
        if (!isDeleting && charIdx === current.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            delay = 400;
        }
        setTimeout(type, delay);
    }
    type();
}

/* ============================================================
   6. PARTICLE CANVAS
   ============================================================ */
function initParticleCanvas() {
    const canvas = $('#particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const PARTICLE_COUNT = 80;
    const particles = [];

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x  = Math.random() * canvas.width;
            this.y  = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.r  = Math.random() * 2 + 0.5;
            this.alpha = Math.random() * 0.5 + 0.1;
            const hue = Math.random() > 0.5 ? 160 : 38;
            this.color = `hsla(${hue}, 80%, 70%, ${this.alpha})`;
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function drawLines() {
        const LINK_DIST = 120;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < LINK_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(16,185,129,${(1 - dist / LINK_DIST) * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(animate);
    }
    animate();
}

/* ============================================================
   7. COUNTER ANIMATION
   ============================================================ */
function initCounters() {
    const counters = $$('[data-target]');
    let started = false;

    function animateCounters() {
        counters.forEach(el => {
            const target = +el.dataset.target;
            let current = 0;
            const step = target / 60;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) { current = target; clearInterval(timer); }
                el.textContent = Math.floor(current);
            }, 25);
        });
        started = true;
    }

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !started) animateCounters();
    }, { threshold: 0.4 });

    const heroSection = $('#home');
    if (heroSection) observer.observe(heroSection);
    else animateCounters(); // fallback
}

/* ============================================================
   8. SKILLS
   ============================================================ */
function initSkills() {
    const grid = $('#skillsGrid');
    const tabBtns = $$('.tab-btn');

    function renderSkills(filter) {
        const filtered = filter === 'all' ? SKILLS : SKILLS.filter(s => s.category === filter);
        grid.innerHTML = '';
        filtered.forEach((sk, i) => {
            const card = document.createElement('div');
            card.className = 'skill-card reveal';
            card.style.animationDelay = `${i * 0.06}s`;
            card.innerHTML = `
                <span class="skill-icon"><img src="${sk.icon}" alt="${sk.name}" loading="lazy" onerror="this.parentElement.textContent='💻'"></span>
                <div class="skill-name">${sk.name}</div>
                <div class="skill-level">${sk.level}</div>
            `;
            grid.appendChild(card);
            requestAnimationFrame(() => card.classList.add('visible'));
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSkills(btn.dataset.tab);
        });
    });
    renderSkills('all');

    const progressData = [
        { name: 'Python Development',     pct: 94, icon: '🐍', gradient: 'linear-gradient(90deg,#047857,#10b981,#6ee7b7)', glow: 'rgba(16,185,129,0.7)' },
        { name: 'Web Development',        pct: 88, icon: '🌐', gradient: 'linear-gradient(90deg,#6d28d9,#8b5cf6,#c4b5fd)', glow: 'rgba(139,92,246,0.7)'  },
        { name: 'REST API & Backend',     pct: 86, icon: '⚡', gradient: 'linear-gradient(90deg,#f59e0b,#fbbf24,#fde68a)', glow: 'rgba(251,191,36,0.7)'  },
        { name: 'Database (SQL/MySQL)',   pct: 85, icon: '🗄️', gradient: 'linear-gradient(90deg,#0d9488,#14b8a6,#5eead4)', glow: 'rgba(20,184,166,0.7)'  },
        { name: 'Git & Version Control',  pct: 90, icon: '🔧', gradient: 'linear-gradient(90deg,#f43f5e,#fb7185,#fda4af)', glow: 'rgba(244,63,94,0.7)'  },
    ];

    const TOTAL_DOTS = 10;

    const pbContainer = $('#progressBars');
    pbContainer.className = 'skill-dots-list';
    progressData.forEach((p, rowIdx) => {
        const filled = Math.round(p.pct / TOTAL_DOTS);
        const dots = Array.from({ length: TOTAL_DOTS }, (_, i) => {
            const isFilled = i < filled;
            return `<span class="skill-dot ${isFilled ? 'filled' : 'empty'}"
                         style="${isFilled ? `background:${p.gradient};box-shadow:0 0 8px ${p.glow}` : ''}"
                         data-delay="${rowIdx * 80 + i * 60}"></span>`;
        }).join('');

        pbContainer.innerHTML += `
            <div class="skill-dot-row">
                <div class="sdk-left">
                    <span class="sdk-icon">${p.icon}</span>
                    <span class="sdk-name">${p.name}</span>
                </div>
                <div class="sdk-dots">${dots}</div>
                <span class="sdk-pct" style="color:${p.glow}">${p.pct}%</span>
            </div>
        `;
    });
}

/* ============================================================
   9. PROGRESS BARS ANIMATION
   ============================================================ */
function initProgressBars() {
    let animated = false;

    function animateDots() {
        if (animated) return;
        animated = true;

        const dots = $$('.skill-dot.filled');
        dots.forEach(dot => {
            const delay = +dot.dataset.delay || 0;
            dot.style.opacity = '0';
            dot.style.transform = 'scale(0)';
            setTimeout(() => {
                dot.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                dot.style.opacity = '1';
                dot.style.transform = 'scale(1)';
            }, delay);
        });
    }

    const container = $('#progressBars');
    if (!container) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                animateDots();
                observer.disconnect();
            }
        }, { threshold: 0 });
        observer.observe(container);
    } else {
        animateDots();
    }
}

/* ============================================================
   10. PROJECTS
   ============================================================ */
function initProjects() {
    const grid = $('#projectsGrid');
    const filterBtns = $$('.filter-btn');

    function renderProjects(filter) {
        const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);
        grid.innerHTML = '';
        filtered.forEach((proj, i) => {
            const card = document.createElement('div');
            card.className = 'project-card reveal';
            card.innerHTML = `
                <div class="project-img-wrap">
                    <img class="project-img" src="${proj.img}" alt="${proj.title} screenshot" loading="lazy"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="project-img-placeholder" style="background: ${proj.gradient}; display:none;">
                        <span style="font-size:4rem">${proj.emoji}</span>
                    </div>
                    <div class="project-overlay">
                        ${proj.liveUrl
                            ? `<a href="${proj.liveUrl}" class="overlay-btn" target="_blank" rel="noreferrer noopener">Live Demo</a>`
                            : `<span class="overlay-btn disabled">Coming Soon</span>`}
                        ${proj.githubUrl
                            ? `<a href="${proj.githubUrl}" class="overlay-btn ghost" target="_blank" rel="noreferrer noopener">GitHub</a>`
                            : ''}
                    </div>
                    <span class="project-badge ${proj.badge === 'Coming Soon' ? 'coming-soon-badge' : ''}">${proj.badge}</span>
                </div>
                <div class="project-body">
                    <div class="project-category">${proj.categoryLabel}</div>
                    <h3 class="project-title">${proj.title}</h3>
                    <p class="project-desc">${proj.desc}</p>
                    <div class="project-tags">
                        ${proj.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                </div>
            `;
            grid.appendChild(card);
            setTimeout(() => card.classList.add('visible'), i * 100);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.filter);
        });
    });
    renderProjects('all');
}

/* ============================================================
   10a. BLOG
   ============================================================ */
function initBlog() {
    const grid = $('#blogGrid');
    if (!grid) return;

    const posts = [
        {
            tag: 'AI / Chatbots',
            date: 'Mar 2026',
            readTime: '5 min read',
            title: 'Building a Real-Time Student Enquiry Chatbot',
            excerpt: 'How I designed a chatbot that answers admissions and course questions instantly, and what I learned wiring an AI flow into a real login-gated product.',
            content: `
                <p>Students at most colleges still hunt through PDFs, notice boards, and half-updated FAQ pages to answer questions that should take five seconds: "When do admissions close?", "What are the fees for this course?", "Is there a hostel on campus?" That gap is what pushed me to build a student enquiry chatbot instead of another static info page.</p>
                <p>The frontend is React, and I used Lovable to iterate on the conversational flow quickly — sketching intents, testing responses, and reshaping the UI without rebuilding the whole app for every tweak. That speed mattered more than I expected: the first version of the bot answered questions correctly but felt robotic, and most of the real work was in rewriting responses to sound like a helpful senior student rather than a form.</p>
                <p>I gated the chatbot behind a login screen deliberately. It lets me tie conversations to a real user session instead of anonymous traffic, which matters if this ever needs to hand off unanswered questions to an actual admissions team member.</p>
                <p>The hardest part wasn't the AI — it was scoping what the bot should <em>not</em> try to answer. Early versions attempted to guess at things like exact seat availability, which changes daily and isn't safe to hallucinate. I ended up building a short "escalate to a human" fallback path for anything outside a fixed set of verified topics.</p>
                <p>Next on the list: logging which questions the bot fails to answer well, so that list becomes the actual roadmap for what to train next — instead of me guessing what students want to know.</p>
            `,
        },
        {
            tag: 'Python / Automation',
            date: 'Jan 2026',
            readTime: '6 min read',
            title: 'Automating WhatsApp Messaging with Python & Selenium',
            excerpt: 'Notes from building a scheduled-messaging tool on top of WhatsApp Web — session persistence, flaky selectors, and staying on the right side of rate limits.',
            content: `
                <p>A lot of small businesses I know were sending the same WhatsApp updates by hand every day — order confirmations, reminders, broadcast messages — one contact at a time. That repetition is exactly the kind of problem Python and Selenium are good at solving.</p>
                <p>The tool drives WhatsApp Web through a real browser session rather than an unofficial private API, because WhatsApp Web is the interface actually meant for humans to click through, and it keeps the automation closer to "a person using a browser" than "a bot hitting undocumented endpoints." I persist the browser profile so the QR-code login only has to happen once, not on every run.</p>
                <p>The genuinely hard part was reliability. Selenium selectors on WhatsApp Web change often enough that a script working perfectly one week can silently break the next, so I leaned heavily on explicit waits and defensive checks rather than fixed sleep timers. I also built in deliberate delays between sends — not just to look more human, but because hammering any messaging platform with instant, back-to-back sends is how you get a number flagged or banned. Respecting rate limits isn't optional here; it's the whole point of doing this responsibly.</p>
                <p>What shipped is a small scheduling layer on top: queue a message, a target list, and a send time, and the browser session handles the rest unattended. It's live at a small internal URL rather than public, since this kind of tool is meant for a business messaging its own opted-in contacts, not for bulk unsolicited outreach.</p>
            `,
        },
        {
            tag: 'Frontend / Web Dev',
            date: 'Sep 2026',
            readTime: '4 min read',
            title: 'Designing and Rebuilding This Portfolio From Scratch',
            excerpt: 'Why this site is vanilla HTML, CSS, and JavaScript with no framework — and what changed when I redesigned the whole visual system in one pass.',
            content: `
                <p>This portfolio has no framework under it — no React, no build step, just HTML, CSS, and JavaScript. That was a deliberate choice: every animation on this page, from the particle canvas in the hero to the scroll-reveal on each section, is something I wrote and can fully explain, instead of a component library's default behavior.</p>
                <p>The hardest part of a from-scratch site isn't the flashy pieces, it's the plumbing: an <code>IntersectionObserver</code> that reveals sections as you scroll, a <code>MutationObserver</code> that re-hooks that same reveal logic onto cards rendered dynamically after the page loads, and a contact form wired to EmailJS so messages actually reach my inbox without me needing to stand up a backend.</p>
                <p>This redesign in particular replaced the entire color system in one pass — new palette, new type scale, new card language — and that exercise surfaced a real bug: the custom cursor's hover effect was bound only to elements that existed at load time, so cards rendered later (skills, projects, this very blog section) never actually triggered it. Fixing that meant switching to event delegation instead of attaching listeners element-by-element.</p>
                <p>The GitHub activity section pulls live data from the GitHub REST API on every page load rather than showing a hardcoded list, so it stays accurate without me touching the code. That's the theme across this whole rebuild: fewer static claims, more things that are actually true because the page checked.</p>
            `,
        },
    ];

    grid.innerHTML = posts.map((post, i) => `
        <button class="blog-card reveal" data-post="${i}" type="button">
            <div class="blog-meta">
                <span class="blog-tag">${post.tag}</span>
                <span>·</span>
                <span>${post.date}</span>
                <span>·</span>
                <span>${post.readTime}</span>
            </div>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <span class="blog-readmore">
                Read article
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
        </button>
    `).join('');

    const modal     = $('#blogModal');
    const modalBody = $('#blogModalBody');
    const closeBtn  = $('#blogModalClose');
    const overlay   = $('#blogModalOverlay');

    function openPost(idx) {
        const post = posts[idx];
        if (!post) return;
        modalBody.innerHTML = `
            <div class="blog-meta">
                <span class="blog-tag">${post.tag}</span>
                <span>·</span>
                <span>${post.date}</span>
                <span>·</span>
                <span>${post.readTime}</span>
            </div>
            <h3>${post.title}</h3>
            ${post.content}
        `;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closePost() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    grid.addEventListener('click', e => {
        const card = e.target.closest('.blog-card');
        if (card) openPost(+card.dataset.post);
    });
    closeBtn.addEventListener('click', closePost);
    overlay.addEventListener('click', closePost);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closePost();
    });
}

/* ============================================================
   10b. GITHUB ACTIVITY
   ============================================================ */
function initGithub() {
    const grid = $('#githubGrid');
    if (!grid) return;

    const GITHUB_USER = 'pkumar029';
    const LANG_COLORS = {
        JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
        HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219', Shell: '#89e051',
        Jupyter: '#DA5B0B', Vue: '#41b883', Go: '#00ADD8', C: '#555555',
    };

    grid.innerHTML = Array.from({ length: 6 }).map(() => `
        <div class="github-card skeleton">
            <div class="gh-skel-line w-60"></div>
            <div class="gh-skel-line w-90"></div>
            <div class="gh-skel-line w-40"></div>
        </div>
    `).join('');

    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`)
        .then(res => {
            if (!res.ok) throw new Error('GitHub API request failed');
            return res.json();
        })
        .then(repos => {
            const top = repos
                .filter(r => !r.fork)
                .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at)))
                .slice(0, 6);

            if (!top.length) {
                grid.innerHTML = `<p class="github-error">No public repositories found.</p>`;
                return;
            }

            grid.innerHTML = top.map(repo => `
                <a class="github-card" href="${repo.html_url}" target="_blank" rel="noreferrer noopener">
                    <div class="gh-card-top">
                        <span class="gh-repo-icon">📦</span>
                        <span class="gh-repo-name">${repo.name}</span>
                    </div>
                    <p class="gh-repo-desc">${repo.description ? repo.description : 'No description provided.'}</p>
                    <div class="gh-card-meta">
                        ${repo.language ? `
                            <span class="gh-lang">
                                <span class="gh-lang-dot" style="background:${LANG_COLORS[repo.language] || '#8b949e'}"></span>
                                ${repo.language}
                            </span>` : ''}
                        <span class="gh-stars">★ ${repo.stargazers_count}</span>
                        <span class="gh-forks">⑂ ${repo.forks_count}</span>
                    </div>
                </a>
            `).join('');
        })
        .catch(() => {
            grid.innerHTML = `
                <p class="github-error">
                    Couldn't load GitHub activity right now.
                    <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noreferrer noopener">View profile on GitHub →</a>
                </p>`;
        });
}

/* ============================================================
   11. TIMELINE
   ============================================================ */
function initTimeline() {
    const experiences = [
        {
            date: '2024 – Present',
            role: 'Senior Full-Stack Developer',
            company: 'TechCorp Solutions',
            desc: 'Leading development of scalable web applications serving 100K+ users. Built microservices architecture and mentored a team of 5 developers.',
        },
        {
            date: '2022 – 2024',
            role: 'Frontend Developer',
            company: 'Creative Digital Agency',
            desc: 'Designed and developed responsive web apps for 20+ clients. Improved page performance by 60% through optimization techniques.',
        },
        {
            date: '2021 – 2022',
            role: 'Backend Developer',
            company: 'StartupHub Inc.',
            desc: 'Built RESTful APIs and database schemas. Integrated third-party services and payment gateways for e-commerce platforms.',
        },
        {
            date: '2020 – 2021',
            role: 'Junior Web Developer',
            company: 'Freelance',
            desc: 'Developed custom websites for small businesses. Gained experience in HTML, CSS, JavaScript, and WordPress.',
        },
    ];

    const timeline = $('#timeline');
    if (!timeline) return;
    experiences.forEach((exp, i) => {
        const item = document.createElement('div');
        item.className = 'timeline-item reveal';
        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-date">${exp.date}</div>
                <div class="timeline-role">${exp.role}</div>
                <div class="timeline-company">@ ${exp.company}</div>
                <p class="timeline-desc">${exp.desc}</p>
            </div>
        `;
        timeline.appendChild(item);
    });
}

/* ============================================================
   12. TESTIMONIALS SLIDER
   ============================================================ */
function initTestimonials() {
    const testimonials = [
        {
            text: 'Working with this developer was an absolute pleasure. The attention to detail, code quality, and ability to translate our vision into a stunning product was remarkable.',
            name: 'Rahul Sharma',
            title: 'CEO, TechStartup India',
            stars: '⭐⭐⭐⭐⭐',
            initials: 'RS',
        },
        {
            text: 'Exceptional work! Delivered the project ahead of schedule with outstanding quality. The UI animations and performance optimizations exceeded all our expectations.',
            name: 'Priya Patel',
            title: 'Product Manager, InnovateCo',
            stars: '⭐⭐⭐⭐⭐',
            initials: 'PP',
        },
        {
            text: 'Truly a 10x developer. From concept to deployment, everything was handled professionally. I highly recommend for any complex web development project.',
            name: 'Arjun Menon',
            title: 'CTO, DigitalEdge',
            stars: '⭐⭐⭐⭐⭐',
            initials: 'AM',
        },
    ];

    const slider = $('#testimonialsSlider');
    if (!slider) return;
    const dotsContainer = $('#sliderDots');
    let current = 0;

    testimonials.forEach((t, i) => {
        const card = document.createElement('div');
        card.className = `testimonial-card ${i === 0 ? 'active' : ''}`;
        card.innerHTML = `
            <div class="testimonial-quote">"</div>
            <p class="testimonial-text">${t.text}</p>
            <div class="testimonial-author">
                <div class="author-avatar">${t.initials}</div>
                <div>
                    <div class="stars">${t.stars}</div>
                    <div class="author-name">${t.name}</div>
                    <div class="author-title">${t.title}</div>
                </div>
            </div>
        `;
        slider.appendChild(card);

        const dot = document.createElement('button');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    function goTo(idx) {
        $$('.testimonial-card').forEach(c => c.classList.remove('active'));
        $$('.dot').forEach(d => d.classList.remove('active'));
        current = (idx + testimonials.length) % testimonials.length;
        $$('.testimonial-card')[current].classList.add('active');
        $$('.dot')[current].classList.add('active');
    }

    // Auto advance
    setInterval(() => goTo(current + 1), 5000);
}

/* ============================================================
   13. CONTACT FORM
   ============================================================ */
emailjs.init('BVaEGbd5UiLDFCb2j');

function initContact() {
    const form    = $('#contactForm');
    const btn     = $('#submitBtn');
    const success = $('#formSuccess');

    const btnHTML = `
        <span class="btn-text">Send Message</span>
        <span class="btn-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
            </svg>
        </span>
    `;

    form.addEventListener('submit', e => {
        e.preventDefault();

        const name    = $('#contactName').value.trim();
        const email   = $('#contactEmail').value.trim();
        const subject = $('#contactSubject').value.trim();
        const message = $('#contactMessage').value.trim();

        btn.textContent = 'Sending…';
        btn.disabled = true;

        emailjs.send('service_adgpz4f', 'template_3cno3al', {
            from_name:  name,
            from_email: email,
            subject:    subject,
            message:    message,
        })
        .then(() => {
            btn.innerHTML = btnHTML;
            btn.disabled = false;
            form.reset();
            success.innerHTML = `
                <div class="submission-summary">
                    <p class="summary-title">✅ Message sent successfully!</p>
                    <ul class="summary-list">
                        <li><span>Name:</span> ${name}</li>
                        <li><span>Email:</span> ${email}</li>
                        <li><span>Subject:</span> ${subject}</li>
                        <li><span>Message:</span> ${message}</li>
                    </ul>
                    <p class="summary-note">I'll get back to you soon.</p>
                </div>
            `;
            success.classList.add('show');
            setTimeout(() => success.classList.remove('show'), 8000);
        })
        .catch(err => {
            console.error('EmailJS error:', err);
            btn.innerHTML = btnHTML;
            btn.disabled = false;
            success.innerHTML = `<div class="submission-summary"><p class="summary-title">❌ Failed to send. Please try again.</p></div>`;
            success.classList.add('show');
            setTimeout(() => success.classList.remove('show'), 5000);
        });
    });
}

/* ============================================================
   14. SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    // Initial elements to observe
    const revealEls = $$('.section-header, .about-grid, .about-image-wrap, .about-content, .contact-card, .timeline-item, .highlight-item');
    revealEls.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Re-observe dynamically added .reveal elements
    const mutationObs = new MutationObserver(mutations => {
        mutations.forEach(m => {
            m.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    if (node.classList && node.classList.contains('reveal')) observer.observe(node);
                    node.querySelectorAll && node.querySelectorAll('.reveal').forEach(el => observer.observe(el));
                }
            });
        });
    });
    mutationObs.observe(document.body, { childList: true, subtree: true });
}

/* ============================================================
   15. BACK TO TOP
   ============================================================ */
function initBackToTop() {
    const btn = $('#backToTop');
    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 500);
    });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ============================================================
   15b. AI ASSISTANT CHATBOT (local keyword search over real
   portfolio data — no external API, so nothing can be faked
   or go down)
   ============================================================ */
function initChatbot() {
    const root = $('#chatbot');
    if (!root) return;
    const toggle = $('#chatbotToggle');
    const panel = $('#chatbotPanel');
    const closeBtn = $('#chatbotClose');
    const messagesEl = $('#chatbotMessages');
    const suggestionsEl = $('#chatbotSuggestions');
    const form = $('#chatbotForm');
    const input = $('#chatbotInput');

    const SUGGESTIONS = ['Skills', 'Projects', 'Resume', 'Contact'];

    const KB = [
        {
            keywords: ['skill', 'tech', 'stack', 'technolog', 'language', 'know', 'tool', 'framework'],
            answer: () => `I work mainly with <strong>${SKILLS.map(s => s.name).join(', ')}</strong>. Python and web development are the strongest areas — see exact proficiency in the <a href="#skills">Skills section</a>.`,
        },
        {
            keywords: ['project', 'built', 'build', 'app', 'portfolio', 'made', 'work on'],
            answer: () => `A few things I've built: ${PROJECTS.map(p => `<strong>${p.title}</strong>${p.liveUrl ? ` (<a href="${p.liveUrl}" target="_blank" rel="noreferrer noopener">live</a>)` : ''}`).join(', ')}. Full write-ups are in the <a href="#projects">Projects section</a>.`,
        },
        {
            keywords: ['chatbot', 'student', 'enquiry', 'admission'],
            answer: () => `The <strong>Student Enquiry Chatbot</strong> is an AI-powered assistant that answers admissions and course questions in real time — built with React and Lovable. <a href="https://student-chatbox.lovable.app/login" target="_blank" rel="noreferrer noopener">Try it live</a> or read the <a href="#blog">blog post</a> about how it was built.`,
        },
        {
            keywords: ['whatsapp', 'automation', 'selenium', 'bulk message'],
            answer: () => `The <strong>WhatsApp Automation</strong> tool is a Python + Selenium project that drives WhatsApp Web for scheduled messages and auto-replies. <a href="https://wa.tamix.in/" target="_blank" rel="noreferrer noopener">Live demo</a> · <a href="https://github.com/pkumar029/-whatsapp-_automate-" target="_blank" rel="noreferrer noopener">source on GitHub</a>.`,
        },
        {
            keywords: ['resume', 'cv', 'download'],
            answer: () => `You can download the resume from the <a href="${PROFILE.resume}" download target="_blank" rel="noreferrer noopener">About section</a>.`,
        },
        {
            keywords: ['contact', 'email', 'reach', 'hire', 'phone', 'call', 'number', 'get in touch'],
            answer: () => `Reach me at <a href="mailto:${PROFILE.email}">${PROFILE.email}</a> or call <a href="tel:${PROFILE.phone.replace(/\s/g, '')}">${PROFILE.phone}</a>. There's also a form in the <a href="#contact">Contact section</a>.`,
        },
        {
            keywords: ['location', 'where', 'based', 'live', 'city', 'country', 'from'],
            answer: () => `Based in ${PROFILE.location}.`,
        },
        {
            keywords: ['github', 'repo', 'repositor', 'source code'],
            answer: () => `GitHub: <a href="${PROFILE.github}" target="_blank" rel="noreferrer noopener">${PROFILE.github.replace('https://', '')}</a> — the <a href="#github">GitHub section</a> on this page also pulls in live repos.`,
        },
        {
            keywords: ['linkedin', 'social', 'connect'],
            answer: () => `Here's the <a href="${PROFILE.linkedin}" target="_blank" rel="noreferrer noopener">LinkedIn profile</a>.`,
        },
        {
            keywords: ['blog', 'article', 'write', 'post', 'writing'],
            answer: () => `Recent posts in the <a href="#blog">Blog section</a> cover the student chatbot, the WhatsApp automation tool, and rebuilding this portfolio from scratch.`,
        },
        {
            keywords: ['experience', 'background', 'who is', 'about you', 'yourself', 'bio'],
            answer: () => `I'm ${PROFILE.name}, a ${PROFILE.role} based in ${PROFILE.location}. I build end-to-end web applications — backend logic, databases, and the interface that ties it together. More in the <a href="#about">About section</a>.`,
        },
        {
            keywords: ['hi', 'hello', 'hey', 'yo', 'sup'],
            answer: () => `Hey! I can answer questions about ${PROFILE.name}'s skills, projects, resume, or how to get in touch. What would you like to know?`,
        },
        {
            keywords: ['thank', 'thanks', 'cool', 'nice', 'great'],
            answer: () => `You're welcome! Anything else you'd like to know?`,
        },
    ];

    const fallback = () =>
        `I couldn't find a direct answer to that. Try asking about <strong>skills</strong>, <strong>projects</strong>, <strong>resume</strong>, or <strong>contact</strong> — or email <a href="mailto:${PROFILE.email}">${PROFILE.email}</a> directly.`;

    function findAnswer(query) {
        const q = query.toLowerCase();
        let best = null, bestScore = 0;
        KB.forEach(entry => {
            const score = entry.keywords.reduce((n, kw) => n + (q.includes(kw) ? 1 : 0), 0);
            if (score > bestScore) { bestScore = score; best = entry; }
        });
        return best ? best.answer() : fallback();
    }

    function addMessage(html, sender) {
        const el = document.createElement('div');
        el.className = `chat-msg ${sender}`;
        el.innerHTML = html;
        messagesEl.appendChild(el);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function showTyping() {
        const el = document.createElement('div');
        el.className = 'chat-typing';
        el.id = 'chatTypingIndicator';
        el.innerHTML = '<span></span><span></span><span></span>';
        messagesEl.appendChild(el);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function hideTyping() {
        const el = $('#chatTypingIndicator');
        if (el) el.remove();
    }

    function respondTo(query) {
        showTyping();
        setTimeout(() => {
            hideTyping();
            addMessage(findAnswer(query), 'bot');
        }, 450 + Math.random() * 350);
    }

    function openChat() {
        root.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        panel.setAttribute('aria-hidden', 'false');
        if (!messagesEl.childElementCount) {
            addMessage(`Hi, I'm ${PROFILE.name.split(' ')[0]}'s portfolio assistant 👋 Ask me about skills, projects, or how to get in touch.`, 'bot');
        }
        setTimeout(() => input.focus(), 200);
    }

    function closeChat() {
        root.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');
    }

    toggle.addEventListener('click', () => {
        root.classList.contains('open') ? closeChat() : openChat();
    });
    closeBtn.addEventListener('click', closeChat);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && root.classList.contains('open')) closeChat();
    });

    SUGGESTIONS.forEach(label => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip';
        chip.textContent = label;
        chip.addEventListener('click', () => {
            addMessage(label, 'user');
            respondTo(label);
        });
        suggestionsEl.appendChild(chip);
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        const val = input.value.trim();
        if (!val) return;
        addMessage(val, 'user');
        input.value = '';
        respondTo(val);
    });
}

/* ============================================================
   16. SMOOTH SECTION TRANSITIONS (mouseover tilt on cards)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Tilt effect on project cards
    document.addEventListener('mousemove', e => {
        $$('.project-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
                const rotX = ((y - rect.height / 2) / rect.height) * -8;
                const rotY = ((x - rect.width  / 2) / rect.width)  *  8;
                card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            }
        });
    });

    document.addEventListener('mouseleave', () => {
        $$('.project-card').forEach(card => {
            card.style.transform = '';
        });
    });

    $$('.project-card').forEach(card => {
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});
