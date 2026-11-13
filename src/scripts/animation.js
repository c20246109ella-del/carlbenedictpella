import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Flip, ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const introTimeline = gsap.timeline({ paused: true });

if (!prefersReducedMotion) {
  introTimeline
    .fromTo(
      "[data-nav-brand]",
      { autoAlpha: 0, y: -16 },
      { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" },
    )
    .fromTo(
      "[data-nav-link]",
      { autoAlpha: 0, y: -12 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.08,
        ease: "power3.out",
      },
      "-=0.2",
    )
    .fromTo(
      "[data-nav-cta]",
      { autoAlpha: 0, y: -12 },
      { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" },
      "-=0.2",
    )
    .fromTo(
      "#hero [data-intro]",
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.05",
    )
    .fromTo(
      "[data-replay-intro]",
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" },
      "-=0.15",
    )
    .play(0);

  document.querySelectorAll("[data-reveal]").forEach((element) => {
    gsap.fromTo(
      element,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      },
    );
  });
}

document.querySelector("[data-replay-intro]")?.addEventListener("click", () => {
  introTimeline.restart();
});

const progressBar = document.querySelector("[data-scroll-progress]");

if (progressBar) {
  ScrollTrigger.create({
    trigger: document.documentElement,
    start: "top top",
    end: "bottom bottom",
    onUpdate: ({ progress }) => {
      gsap.set(progressBar, { scaleX: progress });
      progressBar.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
    },
  });
}

const projectGrid = document.querySelector("[data-project-grid]");
const flipButton = document.querySelector("[data-flip-projects]");

if (projectGrid && flipButton) {
  const cards = Array.from(projectGrid.querySelectorAll("[data-project-card]"));

  flipButton.addEventListener("click", () => {
    if (cards.length < 2) return;

    const state = Flip.getState(cards);
    cards.reverse().forEach((card) => projectGrid.append(card));

    const isReversed = flipButton.getAttribute("aria-pressed") !== "true";
    flipButton.setAttribute("aria-pressed", String(isReversed));
    flipButton.textContent = isReversed ? "Reset order" : "Flip projects";

    Flip.from(state, {
      duration: prefersReducedMotion ? 0 : 0.8,
      ease: "power1.inOut",
      stagger: 0.04,
    });
  });
}