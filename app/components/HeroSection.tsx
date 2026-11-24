import type { Goal } from "./site-data";

export default function HeroSection({ goal }: { goal: Goal | null }) {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-copy">
          <h1>{goal?.heading ?? "Train like it matters."}</h1>
          <p>{goal?.sub ?? "Open floor, real coaching, no gimmicks."}</p>
          <div className="hero-row">
            <a className="btn" href="#join">See membership plans</a>
            <a className="btn ghost" href="#ways">Explore programs</a>
          </div>
        </div>
        <div className="hero-chat" aria-label="Chat with a Revive coach">
          <div className="hero-chat-header">
            <span className="hero-chat-avatar" aria-hidden="true">R</span>
            <span className="hero-chat-title"><b>Revive Coach</b><small>Revive Fitness Club</small></span>
            <span className="hero-chat-actions" aria-hidden="true">⋮</span>
          </div>
          <div className="hero-chat-thread">
            <div className="hero-chat-message outgoing">
              <p className="hero-chat-bubble">I’m new to training. Where should I start?<time>11:04 AM</time></p>
            </div>
            <div className="hero-chat-message incoming">
              <p className="hero-chat-bubble">We’ll meet you where you are, find a good starting point, and build from there.<time>11:05 AM</time></p>
            </div>
          </div>
          <div className="hero-chat-compose" aria-hidden="true">
            <span>Type a message</span>
            <span className="hero-chat-send">↗</span>
          </div>
        </div>
      </div>
    </section>
  );
}
