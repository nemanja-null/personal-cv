import "../styles.css";
import { initTheme } from "./theme";

const initDownloadButton = (): void => {
  const btn = document.querySelector<HTMLButtonElement>(".download-btn");
  if (!btn) return;
  btn.addEventListener("click", () => window.print());
};

const initScrollReveal = (): void => {
  const elements = document.querySelectorAll<HTMLElement>(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
    observer.observe(el);
  });
};

const ready = (fn: () => void): void => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn, { once: true });
  } else {
    fn();
  }
};

ready(() => {
  initTheme();
  initDownloadButton();
  initScrollReveal();
});
