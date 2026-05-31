// Floating tech names in hero background
const techNames = [
  'Python', 'SQL Server', 'T-SQL', 'PostgreSQL', 'Azure', 'Docker',
  'FastAPI', 'OpenAI', 'LangChain', 'Pandas', 'Redis', 'dbt',
  'Airflow', 'Snowflake', 'BigQuery', 'AWS S3', 'Kubernetes',
  'Node.js', 'React', 'Embeddings', 'Vector DB', 'ETL', 'Spark',
  'BERT', 'HuggingFace', 'Prometheus', 'Grafana', 'Elasticsearch'
];

const bg = document.getElementById('floating-bg');
if (bg) {
  techNames.forEach(name => {
    const el = document.createElement('span');
    el.textContent = name;
    el.style.left = Math.random() * 95 + '%';
    el.style.top = Math.random() * 95 + '%';
    el.style.animationDelay = Math.random() * 5 + 's';
    bg.appendChild(el);
  });
}

// Scroll progress bar
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  document.querySelector('.scroll-progress').style.width = scrolled + '%';
});

// Active scroll dot
const sections = document.querySelectorAll('section, .hero');
const dots = document.querySelectorAll('.dot');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop - 200;
    if (window.scrollY >= top) current = s.id;
  });
  dots.forEach(d => {
    d.classList.toggle('active', d.dataset.section === current);
  });
});

// Click dot to scroll
dots.forEach(d => {
  d.addEventListener('click', () => {
    const target = document.getElementById(d.dataset.section);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
