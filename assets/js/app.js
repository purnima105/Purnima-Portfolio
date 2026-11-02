/**
 * Purnima Gupta — Premium Personal Portfolio, Blog & Platform
 * Architecture: Clean Vanilla JavaScript (ES6+), WCAG 2.2 AA compliant.
 * Data-driven rendering from siteConfig, projectsData, blogsData, videosData, experienceData.
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. Initialization and DOM Content Loaded
  // ---------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderBlogs();
    renderVideos();
    renderExperience();
    renderContactInfo();
    initContactForm();
    initFloatingWidgets();
    initScrollReveal();
    initDynamicYear();
  });

  // ---------------------------------------------------------------------------
  // 2. Navigation & Mobile Drawer
  // ---------------------------------------------------------------------------
  function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav-link');

    // Sticky nav shadow on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('shadow-subtle', 'border-b', 'border-border');
      } else {
        navbar.classList.remove('shadow-subtle');
      }
    }, { passive: true });

    // Open mobile menu
    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileDrawer.classList.remove('translate-x-full');
        mobileDrawer.setAttribute('aria-hidden', 'false');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        // Focus first link in drawer
        const firstLink = mobileDrawer.querySelector('a');
        if (firstLink) firstLink.focus();
      });
    }

    // Close mobile menu helper
    const closeMobileMenu = () => {
      if (mobileDrawer) {
        mobileDrawer.classList.add('translate-x-full');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        if (mobileMenuBtn) {
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileMenuBtn.focus();
        }
        document.body.style.overflow = '';
      }
    };

    if (mobileMenuCloseBtn) {
      mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
    }

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer && !mobileDrawer.classList.contains('translate-x-full')) {
        closeMobileMenu();
      }
    });

    // IntersectionObserver for active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          desktopNavLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('text-violet-600', 'font-semibold');
              link.classList.remove('text-slate-600');
            } else {
              link.classList.remove('text-violet-600', 'font-semibold');
              link.classList.add('text-slate-600');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  // ---------------------------------------------------------------------------
  // 3. Hero Section Rendering
  // ---------------------------------------------------------------------------
  function renderHero() {
    if (typeof siteConfig === 'undefined') return;
    const p = siteConfig.personal;

    const heroStatus = document.getElementById('hero-status');
    const heroName = document.getElementById('hero-name');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-description');
    const heroAvatar = document.getElementById('hero-avatar');
    const heroCvBtn = document.getElementById('hero-cv-btn');
    const heroSocials = document.getElementById('hero-social-links');

    if (heroStatus) heroStatus.textContent = p.statusIndicator;
    if (heroName) heroName.textContent = p.fullName;
    if (heroTitle) heroTitle.textContent = p.role;
    if (heroDesc) heroDesc.textContent = p.shortBio;
    if (heroAvatar) {
      heroAvatar.src = p.avatar;
      heroAvatar.alt = `Portrait of ${p.fullName}`;
    }
    if (heroCvBtn) {
      heroCvBtn.href = p.cvPath;
      heroCvBtn.setAttribute('download', p.cvFileName);
    }

    if (heroSocials) {
      const s = siteConfig.social;
      heroSocials.innerHTML = `
        <a href="${s.github}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full border border-border flex items-center justify-center text-slate-600 hover:text-violet-600 hover:border-violet-300 transition-colors" aria-label="GitHub Profile">
          <i class="fa-brands fa-github text-lg" aria-hidden="true"></i>
        </a>
        <a href="${s.linkedin}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full border border-border flex items-center justify-center text-slate-600 hover:text-violet-600 hover:border-violet-300 transition-colors" aria-label="LinkedIn Profile">
          <i class="fa-brands fa-linkedin text-lg" aria-hidden="true"></i>
        </a>
        <a href="${s.instagram}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full border border-border flex items-center justify-center text-slate-600 hover:text-violet-600 hover:border-violet-300 transition-colors" aria-label="Instagram Profile">
          <i class="fa-brands fa-instagram text-lg" aria-hidden="true"></i>
        </a>
        <a href="${s.tiktok}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full border border-border flex items-center justify-center text-slate-600 hover:text-violet-600 hover:border-violet-300 transition-colors" aria-label="TikTok Profile">
          <i class="fa-brands fa-tiktok text-lg" aria-hidden="true"></i>
        </a>
        <a href="mailto:${p.email}" class="w-10 h-10 rounded-full border border-border flex items-center justify-center text-slate-600 hover:text-violet-600 hover:border-violet-300 transition-colors" aria-label="Send direct email to Purnima">
          <i class="fa-solid fa-envelope text-lg" aria-hidden="true"></i>
        </a>
      `;
    }
  }

  // ---------------------------------------------------------------------------
  // 4. About Section Rendering
  // ---------------------------------------------------------------------------
  function renderAbout() {
    if (typeof siteConfig === 'undefined') return;
    const p = siteConfig.personal;

    const aboutDetailed = document.getElementById('about-detailed-text');
    const aboutEmail = document.getElementById('about-email');
    const aboutLocation = document.getElementById('about-location');
    const aboutAvailability = document.getElementById('about-availability');

    if (aboutDetailed) aboutDetailed.textContent = p.detailedBio;
    if (aboutEmail) {
      aboutEmail.href = `mailto:${p.email}`;
      aboutEmail.textContent = p.email;
    }
    if (aboutLocation) aboutLocation.textContent = p.location;
    if (aboutAvailability) aboutAvailability.textContent = p.availability;
  }

  // ---------------------------------------------------------------------------
  // 5. Expertise / Skills Section Rendering
  // ---------------------------------------------------------------------------
  function renderSkills() {
    if (typeof siteConfig === 'undefined' || !siteConfig.skills) return;
    const container = document.getElementById('skills-container');
    if (!container) return;

    container.innerHTML = siteConfig.skills.map((category, idx) => `
      <div class="bg-white border border-border rounded-xl p-6 hover:border-violet-300 transition-all duration-300 shadow-sm" data-reveal data-reveal-delay="${idx * 100}">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
            <i class="fa-solid ${getCategoryIcon(category.category)} text-lg" aria-hidden="true"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold text-heading">${escapeHtml(category.category)}</h3>
            <p class="text-xs text-muted">${escapeHtml(category.description)}</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 pt-2">
          ${category.items.map(item => `
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 hover:border-violet-200 hover:bg-violet-50 transition-colors">
              <span class="w-1.5 h-1.5 rounded-full bg-violet-600"></span>
              ${escapeHtml(item.name)}
            </span>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function getCategoryIcon(catName) {
    if (catName.includes('Frontend')) return 'fa-code';
    if (catName.includes('UI/UX')) return 'fa-bezier-curve';
    if (catName.includes('Backend') || catName.includes('Database')) return 'fa-database';
    return 'fa-wrench';
  }

  // ---------------------------------------------------------------------------
  // 6. Featured Projects Section Rendering
  // ---------------------------------------------------------------------------
  let currentProjectFilter = 'all';
  let projectFilterInitialized = false;

  function initProjectFilters() {
    if (projectFilterInitialized) return;
    const filterContainer = document.getElementById('project-filter-container') || document.querySelector('.project-filter-btn')?.parentElement;
    if (!filterContainer) return;

    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.project-filter-btn');
      if (!btn) return;

      const filterBtns = filterContainer.querySelectorAll('.project-filter-btn');
      filterBtns.forEach(b => {
        b.classList.remove('bg-violet-600', 'text-white');
        b.classList.add('bg-white', 'text-slate-600', 'border', 'border-border');
      });
      btn.classList.add('bg-violet-600', 'text-white');
      btn.classList.remove('bg-white', 'text-slate-600', 'border-border');

      currentProjectFilter = (btn.dataset.filter || 'all').trim();
      renderProjects(false);
    });

    projectFilterInitialized = true;
  }

  function renderProjects(isInitial = true) {
    if (typeof projectsData === 'undefined') return;
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    initProjectFilters();

    const normalizedFilter = currentProjectFilter.toLowerCase().replace(/[-\s_]/g, '');

    const filtered = projectsData.filter(proj => {
      if (normalizedFilter === 'all' || !normalizedFilter) return true;
      const cat = (proj.category || '').toLowerCase().replace(/[-\s_]/g, '');
      return cat.includes(normalizedFilter);
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center bg-white border border-border rounded-2xl">
          <div class="w-12 h-12 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center mx-auto mb-3">
            <i class="fa-solid fa-folder-open text-lg"></i>
          </div>
          <h3 class="text-base font-bold text-heading">No projects in this category</h3>
          <p class="text-sm text-muted mt-1">Select "All Projects" to view all verified repositories.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map((proj, idx) => `
      <article class="bg-white border border-border rounded-2xl overflow-hidden hover:border-violet-300 transition-all duration-300 flex flex-col group shadow-sm hover:shadow-card-hover ${isInitial ? '' : 'is-revealed'}" data-reveal data-reveal-delay="${idx * 100}">
        <div class="relative overflow-hidden aspect-video bg-slate-100 border-b border-border">
          <img 
            src="${proj.image}" 
            alt="Preview of ${escapeHtml(proj.title)}" 
            loading="lazy"
            class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute top-3 right-3">
            <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-violet-700 border border-violet-200 backdrop-blur-sm">
              ${escapeHtml(proj.category)}
            </span>
          </div>
        </div>

        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-xl font-bold text-heading mb-2 group-hover:text-violet-600 transition-colors">
              ${escapeHtml(proj.title)}
            </h3>
            <p class="text-sm text-body line-clamp-3 mb-4 leading-relaxed">
              ${escapeHtml(proj.description)}
            </p>
          </div>

          <div>
            <div class="flex flex-wrap gap-1.5 mb-6">
              ${proj.technologies.map(tech => `
                <span class="px-2.5 py-1 text-xs font-medium rounded-md bg-violet-50 text-violet-700">
                  ${escapeHtml(tech)}
                </span>
              `).join('')}
            </div>

            <div class="flex items-center gap-3 pt-4 border-t border-border">
              <a 
                href="${proj.githubUrl}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-lg border border-border text-slate-700 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                aria-label="View source code on GitHub"
              >
                <i class="fa-brands fa-github text-sm" aria-hidden="true"></i>
                Source Code
              </a>
              ${proj.liveUrl ? `
                <a 
                  href="${proj.liveUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                  aria-label="View live production deployment"
                >
                  <i class="fa-solid fa-arrow-up-right-from-square text-xs" aria-hidden="true"></i>
                  Live Preview
                </a>
              ` : `
                <span class="inline-flex items-center gap-1.5 text-xs text-muted ml-auto font-medium">
                  <i class="fa-solid fa-code-commit text-slate-400" aria-hidden="true"></i>
                  Verified Repository
                </span>
              `}
            </div>
          </div>
        </div>
      </article>
    `).join('');

    if (!isInitial) {
      const articles = grid.querySelectorAll('article');
      articles.forEach((art, i) => {
        setTimeout(() => {
          art.classList.add('is-revealed');
        }, i * 40);
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 7. Technical Blog Section Rendering
  // ---------------------------------------------------------------------------
  let currentBlogCategory = 'all';
  let blogSearchQuery = '';

  function renderBlogs(isInitial = true) {
    if (typeof blogsData === 'undefined') return;
    const grid = document.getElementById('blogs-grid');
    const searchInput = document.getElementById('blog-search-input');
    const filterContainer = document.getElementById('blog-filter-container');
    if (!grid) return;

    // Filter logic
    const filtered = blogsData.filter(post => {
      const matchesCategory = currentBlogCategory === 'all' || post.category.toLowerCase() === currentBlogCategory.toLowerCase();
      const matchesSearch = !blogSearchQuery || 
        post.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(blogSearchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center bg-white border border-border rounded-2xl">
          <div class="w-12 h-12 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center mx-auto mb-3">
            <i class="fa-solid fa-magnifying-glass text-lg"></i>
          </div>
          <h3 class="text-base font-bold text-heading">No articles found</h3>
          <p class="text-sm text-muted mt-1">Try searching with a different term or clear the filter.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map((post, idx) => `
      <article class="bg-white border border-border rounded-2xl overflow-hidden hover:border-violet-300 transition-all duration-300 flex flex-col group shadow-sm hover:shadow-card-hover ${isInitial ? '' : 'is-revealed'}" data-reveal data-reveal-delay="${idx * 100}">
        <a href="article.html?slug=${post.slug}" class="block relative aspect-video bg-slate-100 overflow-hidden border-b border-border">
          <img 
            src="${post.thumbnail}" 
            alt="Thumbnail for ${escapeHtml(post.title)}" 
            loading="lazy" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-violet-700 border border-violet-200 backdrop-blur-sm">
            ${escapeHtml(post.category)}
          </span>
          ${post.relatedVideoId ? `
            <span class="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center text-xs shadow-sm" title="Includes video demonstration">
              <i class="fa-solid fa-play text-[10px]"></i>
            </span>
          ` : ''}
        </a>

        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 text-xs text-muted mb-2.5">
              <span><i class="fa-regular fa-calendar mr-1"></i>${escapeHtml(post.date)}</span>
              <span>•</span>
              <span><i class="fa-regular fa-clock mr-1"></i>${escapeHtml(post.readTime)}</span>
            </div>

            <h3 class="text-lg font-bold text-heading mb-2 leading-snug group-hover:text-violet-600 transition-colors">
              <a href="article.html?slug=${post.slug}">
                ${escapeHtml(post.title)}
              </a>
            </h3>

            <p class="text-sm text-body line-clamp-3 mb-4 leading-relaxed">
              ${escapeHtml(post.excerpt)}
            </p>
          </div>

          <div class="pt-4 border-t border-border flex items-center justify-between">
            <span class="text-xs font-medium text-slate-500">By ${escapeHtml(post.author)}</span>
            <a href="article.html?slug=${post.slug}" class="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-800 transition-colors">
              Read Article
              <i class="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>
      </article>
    `).join('');

    if (!isInitial) {
      const articles = grid.querySelectorAll('article');
      articles.forEach((art, i) => {
        setTimeout(() => {
          art.classList.add('is-revealed');
        }, i * 40);
      });
    }

    // Setup search listener once
    if (searchInput && !searchInput.dataset.initialized) {
      searchInput.dataset.initialized = 'true';
      searchInput.addEventListener('input', (e) => {
        blogSearchQuery = e.target.value.trim();
        renderBlogs(false);
      });
    }

    // Category chips listener
    if (filterContainer && !filterContainer.dataset.initialized) {
      filterContainer.dataset.initialized = 'true';
      filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-category]');
        if (!btn) return;
        filterContainer.querySelectorAll('button').forEach(b => {
          b.classList.remove('bg-violet-600', 'text-white');
          b.classList.add('bg-white', 'text-slate-600', 'border', 'border-border');
        });
        btn.classList.add('bg-violet-600', 'text-white');
        btn.classList.remove('bg-white', 'text-slate-600', 'border-border');
        currentBlogCategory = btn.dataset.category || 'all';
        renderBlogs(false);
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 8. YouTube Video Showcase & Accessible Modal Player
  // ---------------------------------------------------------------------------
  function renderVideos() {
    if (typeof videosData === 'undefined') return;
    const grid = document.getElementById('videos-grid');
    if (!grid) return;

    grid.innerHTML = videosData.map((vid, idx) => `
      <div class="bg-white border border-border rounded-2xl overflow-hidden hover:border-violet-300 transition-all duration-300 group shadow-sm flex flex-col justify-between" data-reveal data-reveal-delay="${idx * 100}">
        <div class="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer video-card-trigger" data-video-id="${vid.youtubeId}" data-video-title="${escapeHtml(vid.title)}">
          <img 
            src="https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg" 
            alt="Video thumbnail: ${escapeHtml(vid.title)}"
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
          <div class="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 flex items-center justify-center transition-colors">
            <button type="button" class="w-14 h-14 rounded-full bg-violet-600/90 text-white flex items-center justify-center text-lg shadow-lg group-hover:scale-110 group-hover:bg-violet-600 transition-all" aria-label="Play video: ${escapeHtml(vid.title)}">
              <i class="fa-solid fa-play ml-1"></i>
            </button>
          </div>
          <span class="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-900/80 text-white backdrop-blur-sm">
            ${escapeHtml(vid.duration)}
          </span>
          <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-violet-700 backdrop-blur-sm">
            ${escapeHtml(vid.category)}
          </span>
        </div>

        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-base font-bold text-heading mb-2 line-clamp-2 leading-snug">
              ${escapeHtml(vid.title)}
            </h3>
            <p class="text-xs text-body line-clamp-2 leading-relaxed mb-4">
              ${escapeHtml(vid.description)}
            </p>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-border">
            <button type="button" class="video-card-trigger text-xs font-semibold text-violet-600 hover:text-violet-800 transition-colors inline-flex items-center gap-1.5" data-video-id="${vid.youtubeId}" data-video-title="${escapeHtml(vid.title)}">
              <i class="fa-solid fa-circle-play"></i> Watch Modal
            </button>
            <a href="https://www.youtube.com/watch?v=${vid.youtubeId}" target="_blank" rel="noopener noreferrer" class="text-xs text-muted hover:text-slate-900 inline-flex items-center gap-1 transition-colors">
              <i class="fa-brands fa-youtube text-red-600"></i> Open on YouTube
            </a>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click events for modal playback
    const triggers = grid.querySelectorAll('.video-card-trigger');
    triggers.forEach(t => {
      t.addEventListener('click', () => {
        const vidId = t.dataset.videoId;
        const vidTitle = t.dataset.videoTitle;
        openVideoModal(vidId, vidTitle);
      });
    });
  }

  function openVideoModal(videoId, title) {
    const modal = document.getElementById('video-modal');
    const iframeContainer = document.getElementById('video-iframe-container');
    const modalTitle = document.getElementById('video-modal-title');
    if (!modal || !iframeContainer) return;

    if (modalTitle) modalTitle.textContent = title;

    // Use privacy-enhanced youtube-nocookie.com embed with autoplay on demand
    iframeContainer.innerHTML = `
      <iframe 
        src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
        title="${escapeHtml(title)}" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        class="w-full h-full rounded-b-xl border-0"
      ></iframe>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    const closeBtn = document.getElementById('video-modal-close-btn');
    if (closeBtn) closeBtn.focus();

    const closeModal = () => {
      modal.classList.add('hidden');
      iframeContainer.innerHTML = ''; // Stop video playback
      document.body.style.overflow = '';
    };

    closeBtn.onclick = closeModal;

    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };

    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  // ---------------------------------------------------------------------------
  // 9. Professional Journey / Experience Section Rendering
  // ---------------------------------------------------------------------------
  function renderExperience() {
    if (typeof experienceData === 'undefined') return;
    const container = document.getElementById('experience-timeline');
    if (!container) return;

    container.innerHTML = experienceData.map((item, idx) => `
      <div class="relative pl-8 md:pl-10 pb-10 last:pb-0 group" data-reveal data-reveal-delay="${idx * 100}">
        <!-- Timeline vertical line -->
        <div class="absolute left-2.5 top-3 bottom-0 w-0.5 bg-slate-200 group-last:hidden"></div>
        
        <!-- Timeline node icon -->
        <div class="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-violet-50 border-2 border-violet-600 flex items-center justify-center text-[10px] text-violet-600">
          <i class="fa-solid ${item.type === 'education' ? 'fa-graduation-cap' : 'fa-briefcase'}"></i>
        </div>

        <div class="bg-white border border-border rounded-xl p-6 hover:border-violet-300 transition-all duration-300 shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
            <h3 class="text-base font-bold text-heading">${escapeHtml(item.title)}</h3>
            <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 w-fit">
              ${escapeHtml(item.period)}
            </span>
          </div>
          <div class="text-xs font-medium text-slate-500 mb-3 flex items-center gap-2">
            <span>${escapeHtml(item.institution)}</span>
            <span>•</span>
            <span><i class="fa-solid fa-location-dot mr-1"></i>${escapeHtml(item.location)}</span>
          </div>
          <p class="text-sm text-body leading-relaxed mb-4">
            ${escapeHtml(item.description)}
          </p>
          <ul class="space-y-1.5 text-xs text-slate-600">
            ${item.highlights.map(h => `
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-violet-600 mt-0.5 text-[11px]"></i>
                <span>${escapeHtml(h)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }

  // ---------------------------------------------------------------------------
  // 10. Contact Info & Social Links Rendering
  // ---------------------------------------------------------------------------
  function renderContactInfo() {
    if (typeof siteConfig === 'undefined') return;
    const p = siteConfig.personal;
    const s = siteConfig.social;

    const contactEmailEl = document.getElementById('contact-direct-email');
    const contactLocationEl = document.getElementById('contact-direct-location');
    const contactSocialsEl = document.getElementById('contact-socials');

    if (contactEmailEl) {
      contactEmailEl.href = `mailto:${p.email}`;
      contactEmailEl.textContent = p.email;
    }
    if (contactLocationEl) contactLocationEl.textContent = p.location;

    if (contactSocialsEl) {
      contactSocialsEl.innerHTML = `
        <a href="${s.github}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-slate-600 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50 transition-colors" aria-label="GitHub">
          <i class="fa-brands fa-github text-lg"></i>
        </a>
        <a href="${s.linkedin}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-slate-600 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50 transition-colors" aria-label="LinkedIn">
          <i class="fa-brands fa-linkedin text-lg"></i>
        </a>
        <a href="${s.instagram}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-slate-600 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50 transition-colors" aria-label="Instagram">
          <i class="fa-brands fa-instagram text-lg"></i>
        </a>
        <a href="${s.tiktok}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-slate-600 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50 transition-colors" aria-label="TikTok">
          <i class="fa-brands fa-tiktok text-lg"></i>
        </a>
      `;
    }
  }

  // ---------------------------------------------------------------------------
  // 11. Contact Form Client-Side Validation & Serverless API Submission
  // ---------------------------------------------------------------------------
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const alertBox = document.getElementById('contact-form-alert');
    const submitBtn = document.getElementById('contact-submit-btn');
    if (!form || !submitBtn) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Clear previous error states
      hideAlert();
      const fields = ['full_name', 'email', 'subject', 'message', 'privacy_consent'];
      fields.forEach(f => {
        const input = form.elements[f];
        if (input) input.classList.remove('border-red-500');
      });

      const fullName = (form.elements['full_name']?.value || '').trim();
      const email = (form.elements['email']?.value || '').trim();
      const subject = (form.elements['subject']?.value || '').trim();
      const inquiryType = form.elements['inquiry_type']?.value || 'General Inquiry';
      const message = (form.elements['message']?.value || '').trim();
      const privacyConsent = form.elements['privacy_consent']?.checked;
      const honeypot = form.elements['website_trap']?.value;

      // Validation
      if (fullName.length < 2) {
        showError('Please enter your full name (at least 2 characters).', 'full_name');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showError('Please provide a valid email address.', 'email');
        return;
      }
      if (subject.length < 3) {
        showError('Please enter a subject (at least 3 characters).', 'subject');
        return;
      }
      if (message.length < 10) {
        showError('Please enter a message of at least 10 characters.', 'message');
        return;
      }
      if (!privacyConsent) {
        showError('You must agree to the privacy consent to proceed.', 'privacy_consent');
        return;
      }

      // Enter loading state
      setLoadingState(true);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            full_name: fullName,
            email: email,
            subject: subject,
            inquiry_type: inquiryType,
            message: message,
            privacy_consent: privacyConsent,
            website_trap: honeypot
          })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          showSuccess(data.message || 'Thank you! Your message has been sent successfully.');
          form.reset();
        } else {
          showError(data.error || 'Unable to submit your message right now. Please email gpurnima966@gmail.com directly.');
        }
      } catch (err) {
        console.error('Contact Form Fetch Error:', err);
        showError('Connection error occurred while reaching the server. Please email gpurnima966@gmail.com directly.');
      } finally {
        setLoadingState(false);
      }
    });

    function setLoadingState(isLoading) {
      if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <i class="fa-solid fa-circle-notch fa-spin mr-2"></i>
          Sending Message...
        `;
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
      } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Send Message</span>
          <i class="fa-solid fa-paper-plane text-xs"></i>
        `;
        submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      }
    }

    function showError(msg, fieldName) {
      if (fieldName && form.elements[fieldName]) {
        form.elements[fieldName].classList.add('border-red-500');
        form.elements[fieldName].focus();
      }
      if (alertBox) {
        alertBox.className = 'p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs font-medium flex items-start gap-3';
        alertBox.innerHTML = `
          <i class="fa-solid fa-circle-exclamation text-base mt-0.5 text-red-500 flex-shrink-0"></i>
          <div>${escapeHtml(msg)}</div>
        `;
        alertBox.classList.remove('hidden');
      }
    }

    function showSuccess(msg) {
      if (alertBox) {
        alertBox.className = 'p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-medium flex items-start gap-3';
        alertBox.innerHTML = `
          <i class="fa-solid fa-circle-check text-base mt-0.5 text-emerald-600 flex-shrink-0"></i>
          <div>${escapeHtml(msg)}</div>
        `;
        alertBox.classList.remove('hidden');
      }
    }

    function hideAlert() {
      if (alertBox) alertBox.classList.add('hidden');
    }
  }

  // ---------------------------------------------------------------------------
  // 12. Floating Widgets: Scroll-To-Top and WhatsApp
  // ---------------------------------------------------------------------------
  function initFloatingWidgets() {
    // Scroll-to-top button
    const scrollTopBtn = document.getElementById('scroll-to-top-btn');
    if (scrollTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
          scrollTopBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
          scrollTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
          scrollTopBtn.classList.remove('opacity-100', 'translate-y-0');
        }
      }, { passive: true });

      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // WhatsApp floating button
    // Requirement 19: Only display after a valid phone number has been configured!
    const whatsappBtn = document.getElementById('whatsapp-floating-btn');
    if (whatsappBtn && typeof siteConfig !== 'undefined') {
      const rawNum = (siteConfig.social.whatsappNumber || '').trim();
      const cleanNum = rawNum.replace(/[^0-9]/g, '');
      if (cleanNum && cleanNum.length >= 7) {
        whatsappBtn.classList.remove('hidden');
        whatsappBtn.href = `https://wa.me/${cleanNum}?text=${encodeURIComponent('Hello Purnima, I came across your portfolio and would love to connect!')}`;
      } else {
        whatsappBtn.classList.add('hidden');
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 13. Professional Scroll Reveal Animations
  // ---------------------------------------------------------------------------
  function initScrollReveal() {
    // Check user preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll('[data-reveal]');

    if (prefersReducedMotion) {
      elements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(() => {
            entry.target.classList.add('is-revealed');
          }, delay);
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
  }

  // ---------------------------------------------------------------------------
  // 14. Dynamic Copyright Year
  // ---------------------------------------------------------------------------
  function initDynamicYear() {
    const yearEl = document.getElementById('copyright-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // Helper sanitization
  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();
