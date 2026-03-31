const KEY_PESSOAS = 'app_pessoas_v1';
const KEY_TEMA = 'app_tema_v1'; 

export function salvarListaPessoas(lista) {
  localStorage.setItem(KEY_PESSOAS, JSON.stringify(lista));
}

export function carregarListaPessoas() {
  const raw = localStorage.getItem(KEY_PESSOAS);
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr;
  } catch (e) {
    console.error('Erro ao parsear lista de pessoas:', e);
    return [];
  }
}

export function limparTodasPessoas() {
  localStorage.removeItem(KEY_PESSOAS);
}

export function salvarTema(tema) {
  localStorage.setItem(KEY_TEMA, tema);

  const exDays = 30;
  const d = new Date();
  d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
  document.cookie = `app_tema=${tema};expires=${d.toUTCString()};path=/`;
}

export function carregarTema() {
  const fromLs = localStorage.getItem(KEY_TEMA);
  if (fromLs) return fromLs;
  const cookies = document.cookie.split(';').map(c => c.trim());
  for (const c of cookies) {
    if (c.startsWith('app_tema=')) return c.split('=')[1];
  }
  return 'light';
}

export function apagarCookieTema() {
  document.cookie = 'app_tema=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
