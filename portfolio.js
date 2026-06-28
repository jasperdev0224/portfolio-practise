const skills = [
  { name: 'HTML', level: 75, label: 'Intermediate' },
  { name: 'CSS', level: 60, label: 'Intermediate' },
  { name: 'JavaScript', level: 45, label: 'Learning' },
  { name: 'DOM Manipulation', level: 50, label: 'Learning' },
  { name: 'LocalStorage', level: 55, label: 'Learning' },
  { name: 'Git & GitHub', level: 40, label: 'Beginner' },
];

const projects = [
  {
    icon: '💰',
    title: 'Expense Tracker',
    desc: 'Vanilla JS app with LocalStorage persistence, transaction management, and a Chart.js doughnut for spending by category.',
    tags: ['JavaScript', 'LocalStorage', 'Chart.js'],
    link: 'https://github.com/jasperdev0224/expense-tracker',
  },
  {
    icon: '🛒',
    title: 'SwiftShop',
    desc: 'Mini e-commerce app with real-time search, category filtering, cart with quantity control, full CRUD, checkout, and URL query params.',
    tags: ['JavaScript', 'DOM', 'LocalStorage', 'CSS'],
    link: 'https://github.com/jasperdev0224',
  },
  {
    icon: '📝',
    title: 'Portfolio Site',
    desc: 'This site — built from scratch, upgraded with JavaScript interactivity, animations, and form handling.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/jasperdev0224/portfolio-practise',
  },


{
  icon: '💬',
  title: 'Quote Generator',
  desc: 'A modern random quote generator with a clean UI, built with vanilla JavaScript. Includes a Twitter share button to post your favourite quotes.',
  tags: ['JavaScript', 'CSS', 'DOM'],
  link: 'https://github.com/jasperdev0224/quote-generator-',
}


];

const timeline = [
  { date: 'Start', title: 'Picked up HTML & CSS', desc: 'Built my first portfolio page. Learned semantic elements, layout, and basic styling.' },
  { date: 'Shortly after', title: 'Learned JavaScript basics', desc: 'Variables, functions, DOM manipulation, event listeners. Started making pages interactive.' },
  { date: 'Recent', title: 'Built SwiftShop', desc: 'Full mini e-commerce app — real-time search, filtering, cart, checkout, LocalStorage.' },
  { date: 'Now', title: 'Building Expense Tracker', desc: 'Implementing LocalStorage persistence, Chart.js doughnut charts, and visual type toggles.' },
  { date: 'Next', title: 'React.js', desc: 'Moving into React — components, state, props, hooks. Next major milestone.' },
];

// Render skills
const skillsGrid = document.getElementById('skills-grid');
skills.forEach(s => {
  skillsGrid.innerHTML += `
    <div class="skill-card fade-in">
      <div class="skill-name">
        <span>${s.name}</span>
        <span class="skill-level-text">${s.label}</span>
      </div>
      <div class="skill-bar-bg">
        <div class="skill-bar-fill" data-width="${s.level}"></div>
      </div>
    </div>`;
});

// Render projects
const projectsGrid = document.getElementById('projects-grid');
projects.forEach(p => {
  const tagsHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
  projectsGrid.innerHTML += `
    <div class="project-card fade-in">
      <div class="project-icon">${p.icon}</div>
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-tags">${tagsHTML}</div>
      <a href="${p.link}" target="_blank" rel="noopener" class="project-link">View on GitHub →</a>
    </div>`;
});

// Render timeline
const timelineEl = document.getElementById('timeline');
timeline.forEach(t => {
  timelineEl.innerHTML += `
    <div class="timeline-item fade-in">
      <div class="timeline-date">${t.date}</div>
      <div class="timeline-title">${t.title}</div>
      <div class="timeline-desc">${t.desc}</div>
    </div>`;
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('skill-card')) {
        const bar = entry.target.querySelector('.skill-bar-fill');
        if (bar) bar.style.width = bar.dataset.width + '%';
      }
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Animated counters
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(document.getElementById('projects-count'), 4);
      const startDate = new Date('2025-02-27');
      const days = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));
      animateCounter(document.getElementById('days-count'), days);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

statsObserver.observe(document.getElementById('about'));

// Form validation
function submitForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in your name, email, and message.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  document.getElementById('contact-form').style.display = 'none';
  document.getElementById('form-success').style.display = 'block';
}

// Rotating status
const statuses = [
  'Currently: Building with JavaScript',
  'Next up: Learning React.js',
  'Building in public on X',
  'Open to opportunities',
];
let statusIndex = 0;
const statusEl = document.getElementById('current-focus');

setInterval(() => {
  statusIndex = (statusIndex + 1) % statuses.length;
  statusEl.style.opacity = 0;
  setTimeout(() => {
    statusEl.textContent = statuses[statusIndex];
    statusEl.style.transition = 'opacity 0.5s';
    statusEl.style.opacity = 1;
  }, 300);
}, 3000);