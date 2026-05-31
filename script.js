// ====== TYPEWRITER ANIMATION ======
const phrases = [
  '> automating workflows with Airflow and Docker...',
  '> building database systems that hold under pressure...',
  '> deploying AI-powered features to production...',
  '> architecting cloud-native data infrastructure...',
  '> turning raw data into intelligent products...'
];

const typeEl = document.querySelector('.typed-line');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typeEl) return;
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIndex--);
  } else {
    typeEl.textContent = current.substring(0, charIndex++);
  }

  let delay = isDeleting ? 25 : 55;

  if (!isDeleting && charIndex === current.length + 1) {
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    charIndex = 0;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

// ====== CONSTELLATION (clusters with connecting lines) ======
// Each cluster: array of nodes (x, y, label), array of line pairs (indices)
const clusters = [
  { // top-left: Database stack
    nodes: [[80,90,'SQL Server'],[210,130,'T-SQL'],[140,220,'PostgreSQL'],[290,210,'Indexing']],
    lines: [[0,1],[1,2],[1,3]]
  },
  { // top-right: Cloud stack
    nodes: [[1260,100,'Azure'],[1410,140,'Snowflake'],[1340,230,'AWS S3'],[1470,250,'BigQuery']],
    lines: [[0,1],[0,2],[1,3]]
  },
  { // middle-left: Pipeline stack
    nodes: [[60,420,'Python'],[200,460,'Airflow'],[100,540,'Docker'],[230,560,'ETL']],
    lines: [[0,1],[0,2],[1,3]]
  },
  { // middle-right: AI stack
    nodes: [[1420,420,'OpenAI'],[1290,470,'LangChain'],[1380,560,'Embeddings'],[1490,520,'BERT']],
    lines: [[0,1],[1,2],[0,3]]
  },
  { // bottom-left: Backend
    nodes: [[100,700,'FastAPI'],[250,720,'Node.js'],[170,810,'REST']],
    lines: [[0,1],[0,2]]
  },
  { // bottom-right: Frontend
    nodes: [[1320,700,'React'],[1450,720,'JavaScript'],[1390,800,'Git']],
    lines: [[0,1],[1,2]]
  },
  { // top-center floaters
    nodes: [[460,160,'dbt'],[1080,180,'Spark'],[1150,720,'Kafka'],[460,810,'Redis']],
    lines: []
  }
];

const heroEl = document.querySelector('.hero');
if (heroEl) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('class', 'constellation');
  svg.setAttribute('viewBox', '0 0 1600 900');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');

  clusters.forEach((cluster, idx) => {
    const g = document.createElementNS(svgNS, 'g');
    g.setAttribute('class', `cluster cluster-${idx + 1}`);

    // Draw lines first so they sit behind dots/text
    cluster.lines.forEach(([a, b]) => {
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', cluster.nodes[a][0]);
      line.setAttribute('y1', cluster.nodes[a][1]);
      line.setAttribute('x2', cluster.nodes[b][0]);
      line.setAttribute('y2', cluster.nodes[b][1]);
      line.setAttribute('class', 'node-line');
      g.appendChild(line);
    });

    cluster.nodes.forEach(([x, y, label]) => {
      const dot = document.createElementNS(svgNS, 'circle');
      dot.setAttribute('cx', x);
      dot.setAttribute('cy', y);
      dot.setAttribute('r', 2);
      dot.setAttribute('class', 'node-dot');
      g.appendChild(dot);

      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', x + 8);
      text.setAttribute('y', y + 4);
      text.setAttribute('class', 'node-text');
      text.textContent = label;
      g.appendChild(text);
    });

    svg.appendChild(g);
  });

  // Insert SVG into hero (replace old floating-bg if it exists)
  const oldBg = document.getElementById('floating-bg');
  if (oldBg) oldBg.replaceWith(svg);
  else heroEl.insertBefore(svg, heroEl.firstChild);
}

// ====== SCROLL PROGRESS BAR ======
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  const bar = document.querySelector('.scroll-progress');
  if (bar) bar.style.width = scrolled + '%';
});

// ====== ACTIVE SCROLL DOT ======
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

dots.forEach(d => {
  d.addEventListener('click', () => {
    const target = document.getElementById(d.dataset.section);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ====== FADE-IN ON SCROLL ======
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(s => {
  s.classList.add('fade-in');
  observer.observe(s);
});
