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
            background:rgba(124,58,237,${Math.random()*0.5+0.1});
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
    initTimeline();
    initTestimonials();
    initContact();
    initScrollReveal();
    initBackToTop();
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

    // Hover effect
    const hoverEls = $$('a, button, .skill-card, .project-card, .contact-card, .social-link');
    hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
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
            const hue = Math.random() > 0.5 ? 270 : 190;
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
                    ctx.strokeStyle = `rgba(124,58,237,${(1 - dist / LINK_DIST) * 0.15})`;
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
    const skills = [
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

    const grid = $('#skillsGrid');
    const tabBtns = $$('.tab-btn');

    function renderSkills(filter) {
        const filtered = filter === 'all' ? skills : skills.filter(s => s.category === filter);
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
        { name: 'Python Development',     pct: 94, icon: '🐍', gradient: 'linear-gradient(90deg,#7c3aed,#a855f7,#c084fc)', glow: 'rgba(168,85,247,0.7)' },
        { name: 'Web Development',        pct: 88, icon: '🌐', gradient: 'linear-gradient(90deg,#0ea5e9,#06b6d4,#67e8f9)', glow: 'rgba(6,182,212,0.7)'  },
        { name: 'REST API & Backend',     pct: 86, icon: '⚡', gradient: 'linear-gradient(90deg,#f59e0b,#fbbf24,#fde68a)', glow: 'rgba(251,191,36,0.7)'  },
        { name: 'Database (SQL/MySQL)',   pct: 85, icon: '🗄️', gradient: 'linear-gradient(90deg,#10b981,#34d399,#6ee7b7)', glow: 'rgba(52,211,153,0.7)'  },
        { name: 'Git & Version Control',  pct: 90, icon: '🔧', gradient: 'linear-gradient(90deg,#ef4444,#f97316,#fb923c)', glow: 'rgba(249,115,22,0.7)'  },
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
    const projects = [
        {
            title: 'E-Commerce Platform',
            category: 'web',
            categoryLabel: 'Web App',
            desc: 'Full-featured online store with real-time inventory, payment integration, and admin dashboard.',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            badge: 'Featured',
            emoji: '🛒',
            gradient: 'linear-gradient(135deg, #7c3aed22, #06b6d422)',
        },
        {
            title: 'Student Enquiry Chatbot',
            category: 'web',
            categoryLabel: 'AI/Web App',
            desc: 'AI-powered student enquiry chatbot that answers academic queries, admission details, and college information in real time.',
            tags: ['AI', 'Chatbot', 'React', 'Lovable'],
            badge: 'AI',
            emoji: '🎓',
            gradient: 'linear-gradient(135deg, #06b6d422, #7c3aed22)',
            liveUrl: 'https://student-chatbox.lovable.app/login',
        },
        {
            title: 'Portfolio Dashboard',
            category: 'web',
            categoryLabel: 'Web App',
            desc: 'Personal portfolio website built from scratch with smooth animations, particle effects, dark theme, and a fully functional contact form.',
            tags: ['HTML5', 'CSS3', 'JavaScript', 'EmailJS'],
            badge: 'Live',
            emoji: '🚀',
            gradient: 'linear-gradient(135deg, #f59e0b22, #7c3aed22)',
            liveUrl: 'https://praveen.tamix.in/',
            githubUrl: 'https://github.com/pkumar029/portfolio',
        },
        {
            title: 'Fitness Tracker App',
            category: 'mobile',
            categoryLabel: 'Mobile App',
            desc: 'Cross-platform fitness app with workout tracking, nutrition logging, and progress analytics.',
            tags: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
            badge: 'Mobile',
            emoji: '💪',
            gradient: 'linear-gradient(135deg, #22c55e22, #06b6d422)',
        },
        {
            title: 'WhatsApp Automation',
            category: 'web',
            categoryLabel: 'Automation',
            desc: 'Python-based WhatsApp automation tool to send scheduled messages, bulk notifications, and auto-replies using WhatsApp Web API.',
            tags: ['Python', 'Selenium', 'WhatsApp API', 'Automation'],
            badge: 'Coming Soon',
            emoji: '💬',
            gradient: 'linear-gradient(135deg, #22c55e22, #06b6d422)',
        },
    ];

    const grid = $('#projectsGrid');
    const filterBtns = $$('.filter-btn');

    function renderProjects(filter) {
        const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
        grid.innerHTML = '';
        filtered.forEach((proj, i) => {
            const card = document.createElement('div');
            card.className = 'project-card reveal';
            card.innerHTML = `
                <div class="project-img-wrap">
                    <div class="project-img-placeholder" style="background: ${proj.gradient}">
                        <span style="font-size:4rem">${proj.emoji}</span>
                    </div>
                    <div class="project-overlay">
                        <a href="${proj.liveUrl || '#'}" class="overlay-btn" ${proj.liveUrl ? 'target="_blank" rel="noreferrer noopener"' : ''}>Live Demo</a>
                        <a href="${proj.githubUrl || '#'}" class="overlay-btn ghost" ${proj.githubUrl ? 'target="_blank" rel="noreferrer noopener"' : ''}>GitHub</a>
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
