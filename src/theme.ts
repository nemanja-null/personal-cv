/**
 * Theme switching: light / dark, persisted in localStorage.
 *
 * The initial theme is applied by an inline blocking script in index.html
 * (anti-FOUC) BEFORE this module runs. This module is responsible for:
 *   1. Wiring the toggle button to flip the theme on click.
 *   2. Reflecting the live system preference IF the user hasn't made an
 *      explicit choice yet.
 *   3. Keeping the button's aria-pressed state in sync.
 */

const STORAGE_KEY = "theme";

type Theme = "light" | "dark";

const getStored = (): Theme | null => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
};

const setStored = (theme: Theme): void => {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* private mode / disabled storage — ignore */
  }
};

const getCurrent = (): Theme => {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" ? "light" : "dark";
};

const apply = (theme: Theme): void => {
  document.documentElement.setAttribute("data-theme", theme);
};

const syncButton = (btn: HTMLButtonElement, theme: Theme): void => {
  btn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
  btn.title =
    theme === "light"
      ? "Switch to dark theme"
      : "Switch to light theme";
};

export const initTheme = (): void => {
  const btn = document.querySelector<HTMLButtonElement>(".theme-toggle");
  if (!btn) return;

  syncButton(btn, getCurrent());

  btn.addEventListener("click", () => {
    const next: Theme = getCurrent() === "dark" ? "light" : "dark";
    apply(next);
    setStored(next);
    syncButton(btn, next);
  });

  const mql = window.matchMedia("(prefers-color-scheme: light)");
  const onSystemChange = (e: MediaQueryListEvent): void => {
    if (getStored() !== null) return;
    const next: Theme = e.matches ? "light" : "dark";
    apply(next);
    syncButton(btn, next);
  };
  mql.addEventListener("change", onSystemChange);
};
