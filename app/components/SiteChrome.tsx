import Logo from "./Logo";
import { GOALS, LEVELS, type GoalId } from "./site-data";

export type ThemeMode = "day" | "night";

type ThemeToggleProps = {
  theme: ThemeMode;
  onToggle: () => void;
};

function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const nextTheme = theme === "night" ? "day" : "night";

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={theme === "day"}
      onClick={onToggle}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        {theme === "night" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </>
        ) : (
          <path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z" />
        )}
      </svg>
      <span>{nextTheme === "day" ? "Day mode" : "Night mode"}</span>
    </button>
  );
}

type WelcomeDialogProps = {
  stage: "entering" | "open" | "closing";
  theme: ThemeMode;
  onToggleTheme: () => void;
  goalId: GoalId | null;
  level: number | null;
  onGoalSelect: (id: GoalId) => void;
  onLevelSelect: (level: number) => void;
  onEnter: () => void;
  onExitComplete: () => void;
};

export function WelcomeDialog({
  stage,
  theme,
  onToggleTheme,
  goalId,
  level,
  onGoalSelect,
  onLevelSelect,
  onEnter,
  onExitComplete,
}: WelcomeDialogProps) {
  return (
    <div
      className={`welcome${stage === "entering" ? " entering" : ""}${stage === "closing" ? " out" : ""}`}
      role="dialog"
      aria-label="Welcome"
      aria-hidden={stage !== "open"}
      inert={stage !== "open"}
      onTransitionEnd={(event) => {
        if (stage === "closing" && event.target === event.currentTarget && event.propertyName === "transform") {
          onExitComplete();
        }
      }}
    >
      <div className="welcome-in">
        <div className="welcome-top">
          <Logo />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
        <h1>What are you here to do?</h1>
        <p className="q">Pick one. We’ll build the site around it.</p>
        <div className="goals">
          {GOALS.map((item) => (
            <button key={item.id} type="button" className={`goal ${goalId === item.id ? "on" : ""}`} aria-pressed={goalId === item.id} onClick={() => onGoalSelect(item.id)}>
              {item.name}<small>{item.detail}</small>
            </button>
          ))}
        </div>
        <p className="q">Where are you starting from?</p>
        <div className="levels">
          {LEVELS.map((item, index) => (
            <button key={item} type="button" className={`lvl ${level === index ? "on" : ""}`} aria-pressed={level === index} onClick={() => onLevelSelect(index)}>{item}</button>
          ))}
        </div>
        <div className="welcome-actions">
          <button className="btn" type="button" disabled={!goalId} onClick={onEnter}>Show me my gym</button>
          <button className="skip" type="button" onClick={onEnter}>Just browse</button>
        </div>
      </div>
    </div>
  );
}

type SiteHeaderProps = {
  goalName: string;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onChangeGoal: () => void;
};

export function SiteHeader({ goalName, theme, onToggleTheme, onChangeGoal }: SiteHeaderProps) {
  return (
    <header className="nav">
      <Logo />
      <nav aria-label="Main navigation">
        <a href="#train">What we train</a><a href="#gallery">Gallery</a><a href="#ways">Programs</a><a href="#events">Events</a><a href="#reviews">Reviews</a><a href="#join">Membership</a>
      </nav>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      <button className="chip" type="button" aria-label="Change your goal" onClick={onChangeGoal}>Goal: {goalName} · change</button>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="fbar">
        <div className="flinks"><a href="#">Terms</a><a href="#">Privacy</a></div>
        <div className="footer-right">
          <a className="social-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <div className="copy">© 2026 Revive Fitness Club. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
