"use client";

import { FormEvent, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  CoachesSection,
  ContactSection,
  EventsSection,
  MembershipSection,
  PlanSection,
  ProgramsSection,
  ReviewsSection,
  StatsSection,
} from "./ContentSections";
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
import { SiteFooter, SiteHeader, WelcomeDialog, type ThemeMode } from "./SiteChrome";
import { GALLERY_END_GAP, GOALS, TRAINING, type GoalId } from "./site-data";
import TrainingSection from "./TrainingSection";

const THEME_CHANGED_EVENT = "revive-theme-change";

function getThemeSnapshot(): ThemeMode {
  return window.localStorage.getItem("revive-theme") === "day" ? "day" : "night";
}

function getServerThemeSnapshot(): ThemeMode {
  return "night";
}

function subscribeToTheme(onChange: () => void) {
  window.addEventListener(THEME_CHANGED_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(THEME_CHANGED_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export default function ReviveSite() {
  const [welcomeStage, setWelcomeStage] = useState<"entering" | "open" | "closing" | null>("entering");
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
  const [goalId, setGoalId] = useState<GoalId | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  const [activeTraining, setActiveTraining] = useState(0);
  const [status, setStatus] = useState("");
  const trainingRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const trainingProgressRef = useRef<HTMLElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const galleryProgressRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = welcomeStage !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [welcomeStage]);

  useEffect(() => {
    if (welcomeStage !== "entering") return;
    const frame = window.requestAnimationFrame(() => setWelcomeStage("open"));
    return () => window.cancelAnimationFrame(frame);
  }, [welcomeStage]);

  useEffect(() => {
    let frame = 0;

    const updateScrollEffects = () => {
      frame = 0;

      const training = trainingRef.current;
      const trainingProgress = trainingProgressRef.current;
      if (training && trainingProgress) {
        const span = Math.max(1, training.offsetHeight - window.innerHeight);
        const progress = Math.min(0.999, Math.max(0, -training.getBoundingClientRect().top / span));
        const progressScale = window.matchMedia("(max-width: 760px)").matches ? "X" : "Y";
        trainingProgress.style.transform = `scale${progressScale}(${progress})`;
        setActiveTraining(Math.min(TRAINING.length - 1, Math.floor(progress * TRAINING.length)));
      }

      const gallery = galleryRef.current;
      const track = galleryTrackRef.current;
      const galleryProgress = galleryProgressRef.current;
      if (gallery && track && galleryProgress) {
        const span = Math.max(1, gallery.offsetHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, -gallery.getBoundingClientRect().top / span));
        const maxOffset = Math.max(0, track.scrollWidth - window.innerWidth) + GALLERY_END_GAP;
        track.style.transform = `translate3d(${-progress * maxOffset}px, 0, 0)`;
        galleryProgress.style.transform = `scaleX(${progress})`;
      }
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollEffects);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const revealElements = document.querySelectorAll<HTMLElement>("[data-scroll-reveal]");
    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("scroll-reveals");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("scroll-reveals");
    };
  }, []);

  const goal = GOALS.find((item) => item.id === goalId) ?? null;
  const plan = goal ?? GOALS[2];
  const levelNote = level === 0 ? " Starts gentle, since you’re new." : level === 2 ? " Skips the basics, since you already train." : "";

  function openWelcome() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setWelcomeStage(reducedMotion ? "open" : "entering");
  }

  function toggleTheme() {
    const nextTheme: ThemeMode = theme === "night" ? "day" : "night";
    window.localStorage.setItem("revive-theme", nextTheme);
    window.dispatchEvent(new Event(THEME_CHANGED_EVENT));
  }

  function enter() {
    window.scrollTo({ top: 0, behavior: "instant" });
    setWelcomeStage(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? null : "closing",
    );
  }

  function scrollToTraining(index: number) {
    const training = trainingRef.current;
    if (!training) return;
    const span = Math.max(1, training.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: window.scrollY + training.getBoundingClientRect().top + ((index + 0.5) / TRAINING.length) * span,
      behavior: "smooth",
    });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus(`Thanks ${data.get("name")}. We’ll get in touch to help you pick a plan.`);
    event.currentTarget.reset();
  }

  return (
    <>
      <div className="bgfx" aria-hidden="true"><i /><i /></div>
      <div className="grain" aria-hidden="true" />
      {welcomeStage !== null && (
        <WelcomeDialog
          stage={welcomeStage}
          theme={theme}
          onToggleTheme={toggleTheme}
          goalId={goalId}
          level={level}
          onGoalSelect={setGoalId}
          onLevelSelect={setLevel}
          onEnter={enter}
          onExitComplete={() => setWelcomeStage(null)}
        />
      )}

      <SiteHeader
        goalName={goal?.name ?? "Any"}
        theme={theme}
        onToggleTheme={toggleTheme}
        onChangeGoal={openWelcome}
      />

      <main>
        <HeroSection goal={goal} />
        <StatsSection />
        <TrainingSection
          activeTraining={activeTraining}
          trainingRef={trainingRef}
          trainingProgressRef={trainingProgressRef}
          onSelectTraining={scrollToTraining}
        />
        <GallerySection
          galleryRef={galleryRef}
          galleryTrackRef={galleryTrackRef}
          galleryProgressRef={galleryProgressRef}
        />
        <PlanSection plan={plan} levelNote={levelNote} />
        <ProgramsSection goalId={goalId} />
        <EventsSection />
        <ReviewsSection />
        <MembershipSection suggestedTier={goal?.tier ?? null} />
        <CoachesSection />
        <ContactSection status={status} onSubmit={submit} />
      </main>

      <SiteFooter />
    </>
  );
}
