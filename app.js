const searchForm = document.querySelector('#search-form');
const queryInput = document.querySelector('#query');
const suggestions = document.querySelector('#suggestions');
const resultQuery = document.querySelector('#result-query');
const results = document.querySelector('#results');
const toast = document.querySelector('#toast');

const suggestionPool = [
  'What is changing in open source AI?',
  'Which AI models can run locally?',
  'How do open model licenses compare?',
  'The future of private AI',
  'Recent discoveries in deep ocean science',
  'How passkeys improve account security'
];

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function runSearch(value) {
  const query = value.trim();
  if (!query) return;
  queryInput.value = query;
  resultQuery.textContent = query;
  suggestions.classList.remove('open');
  document.querySelector('#source-count').textContent = 'Scanning 24 sources';
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => {
    document.querySelector('#source-count').textContent = '24 sources analyzed';
    showToast('Search synthesis refreshed');
  }, 700);
}

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  runSearch(queryInput.value);
});

queryInput.addEventListener('input', () => {
  const needle = queryInput.value.toLowerCase().trim();
  if (!needle) {
    suggestions.classList.remove('open');
    return;
  }
  const matches = suggestionPool.filter(item => item.toLowerCase().includes(needle)).slice(0, 4);
  suggestions.innerHTML = matches.map(item => `<button type="button" role="option">${item}</button>`).join('');
  suggestions.classList.toggle('open', matches.length > 0);
});

suggestions.addEventListener('click', event => {
  if (event.target.matches('button')) runSearch(event.target.textContent);
});

document.addEventListener('click', event => {
  if (!searchForm.contains(event.target)) suggestions.classList.remove('open');
});

document.querySelectorAll('[data-query]').forEach(button => {
  button.addEventListener('click', () => runSearch(button.dataset.query));
});

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-selected', item === button ? 'true' : 'false');
    });
    document.querySelectorAll('.result-card').forEach(card => {
      card.classList.toggle('hidden', button.dataset.filter !== 'all' && card.dataset.type !== button.dataset.filter);
    });
  });
});

document.querySelector('#theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('vassago-theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

if (localStorage.getItem('vassago-theme') === 'light') document.body.classList.add('light');

document.querySelector('#copy-answer').addEventListener('click', async () => {
  const text = document.querySelector('#answer-content').innerText;
  try {
    await navigator.clipboard.writeText(text);
    showToast('Answer copied');
  } catch {
    showToast('Copy is unavailable in this browser');
  }
});

document.querySelectorAll('.follow-ups button').forEach(button => {
  button.addEventListener('click', () => runSearch(button.textContent.replace('→', '').trim()));
});

document.querySelectorAll('.answer-footer button').forEach(button => {
  button.addEventListener('click', () => showToast('Thanks — feedback recorded locally'));
});

document.querySelector('#more-results').addEventListener('click', event => {
  event.currentTarget.textContent = 'All available prototype sources shown';
  event.currentTarget.disabled = true;
});

document.querySelector('#refresh-topics').addEventListener('click', () => {
  const grid = document.querySelector('#topic-grid');
  grid.animate([{ opacity: .45, transform: 'translateY(4px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 450 });
  showToast('Topics refreshed');
});

document.querySelector('.access-button').addEventListener('click', () => showToast('Access requests open soon'));

document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    queryInput.focus();
    queryInput.select();
  }
  if (event.key === 'Escape') suggestions.classList.remove('open');
});
