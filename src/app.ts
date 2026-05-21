import "../styles.css";
import { initTheme } from "./theme";

const initDownloadButton = (): void => {
  const btn = document.querySelector<HTMLButtonElement>(".download-btn");
  if (!btn) return;
  btn.addEventListener("click", () => window.print());
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
});
