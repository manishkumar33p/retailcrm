const PREFIX = 'retailpro_';
export const readStore = (key, fallback) => {
  try { const value = localStorage.getItem(PREFIX + key); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
};
export const writeStore = (key, value) => localStorage.setItem(PREFIX + key, JSON.stringify(value));
export const clearDemoSession = () => localStorage.removeItem(PREFIX + 'session');
