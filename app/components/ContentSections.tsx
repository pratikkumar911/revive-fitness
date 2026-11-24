import type { CSSProperties, FormEvent } from "react";
import { EVENTS, GOALS, PROGRAMS, REVIEWS, TIERS, type Goal, type GoalId } from "./site-data";

export function StatsSection() {
  return (
    <section className="statsec">
      <div className="wrap" data-scroll-reveal>
        <h2>A place for every pace</h2>
        <div className="stat-grid">
          <div><b>All</b><span>FITNESS LEVELS</span></div>
          <div><b>3+</b><span>COACHES</span></div>
          <div><b>6</b><span>WAYS TO TRAIN</span></div>
          <div><b>4</b><span>MEMBERSHIP OPTIONS</span></div>
        </div>
      </div>
    </section>
  );
}

export function PlanSection({ plan, levelNote }: { plan: Goal; levelNote: string }) {
  return (
    <section id="plan">
      <div className="wrap plan" data-scroll-reveal>
        <div><h2>{plan.planTitle}</h2><p className="lede">{plan.planSub}{levelNote}</p><a className="btn" href="#trial">Start this plan</a></div>
        <ol>{plan.plan.map((week) => <li key={week[0]}><b>{week[0]}</b><span>{week[1]}</span></li>)}</ol>
      </div>
    </section>
  );
}

export function ProgramsSection({ goalId }: { goalId: GoalId | null }) {
  return (
    <section className="ways" id="ways">
      <div className="wrap" data-scroll-reveal>
        <h2>Ways to train with us</h2><p className="lede">The options that fit your goal are marked.</p>
        <div className="sched">
          <table>
            <thead><tr><th>Option</th><th>What you get</th><th>Best for</th></tr></thead>
            <tbody>
              {PROGRAMS.map((program) => {
                const match = goalId === program[2];
                const label = match ? "Your goal" : GOALS.find((item) => item.id === program[2])?.name;
                return <tr key={program[0]} className={match ? "match" : ""}><td data-label="Option">{program[0]}</td><td data-label="What you get">{program[1]}</td><td data-label="Best for"><span className="tag">{label}</span></td></tr>;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function EventsSection() {
  return (
    <section className="events" id="events">
      <div className="wrap">
        <h2>What we’ve hosted</h2><p className="lede">Race days, challenges and open days.</p>
        <div className="events-stack">
          {EVENTS.map(([date, title, text, numbers, className], index) => (
            <article className={`ev ${className}`} style={{ "--i": index } as CSSProperties} key={title}>
              <div className="et"><span>{date}</span><div><h3>{title}</h3><p>{text}</p></div><span className="en">{numbers}</span></div>
              <div className="em">Event photo</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type Review = (typeof REVIEWS)[number];

function ReviewCards({ items, row }: { items: readonly Review[]; row: string }) {
  return [...items, ...items].map(([name, age, text], index) => (
    <article className="review-card" key={`${row}-${index}`}>
      <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
      <p>{text}</p>
      <div className="review-author">
        <span className={`review-avatar a${index % 3}`} aria-hidden="true">{name[0]}</span>
        <span><b>{name}</b><small>{age}</small></span>
      </div>
    </article>
  ));
}

export function ReviewsSection() {
  return (
    <section className="reviews" id="reviews">
      <div className="wrap" data-scroll-reveal>
        <h2>What members say</h2><p className="lede">Sample reviews. Replace them with real Google reviews.</p>
      </div>
      <div className="review-marquee" aria-label="Member reviews">
        <div className="review-row"><ReviewCards items={REVIEWS} row="first" /></div>
        <div className="review-row reverse"><ReviewCards items={[...REVIEWS].reverse()} row="second" /></div>
      </div>
    </section>
  );
}

export function MembershipSection({ suggestedTier }: { suggestedTier: number | null }) {
  return (
    <section className="join" id="join">
      <div className="wrap" data-scroll-reveal>
        <h2>Membership</h2><p className="lede">Pick a plan length. Longer commitments have a lower monthly price.</p>
        <div className="tiers">
          {TIERS.map((tier, index) => (
            <div className={`tier ${suggestedTier === index ? "rec" : ""}`} key={tier.name}>
              {suggestedTier === index && <span className="pick">Suggested for you</span>}
              <h3>{tier.name}</h3>
              <div className="price">₹{tier.price.toLocaleString("en-IN")} <small>/ {tier.months} {tier.months === 1 ? "month" : "months"}</small></div>
              <div className="tot">₹{(tier.price / tier.months).toLocaleString("en-IN", { maximumFractionDigits: 2 })}/month when billed upfront</div>
              <div className="fee">+ ₹1,000 registration fee, paid once</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CoachesSection() {
  return (
    <section className="coaches" id="coaches">
      <div className="wrap" data-scroll-reveal>
        <h2>Meet the coaches</h2><p className="lede">Photos go here.</p>
        <div className="coach-grid">
          {["Strength & powerlifting","Fat loss & conditioning","Mobility & rehab","Beginners & group classes"].map((speciality) => (
            <div className="coach" key={speciality}><div className="ph">photo</div><b>Coach name</b><span>{speciality}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ status, onSubmit }: { status: string; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <section className="cta" id="trial">
      <div className="wrap" data-scroll-reveal>
        <h2>Your first rep starts here.</h2><p>Pick a plan, check out the floor, or just ask us anything.</p>
        <div className="crow"><a className="btn" href="#join">See membership plans</a><a className="btn ghost" href="#ways">Explore programs</a></div>
        <form onSubmit={onSubmit}>
          <input name="name" placeholder="Your name" aria-label="Your name" required />
          <input name="phone" placeholder="Phone or email" aria-label="Phone or email" required />
          <button className="btn" type="submit">Contact me</button>
        </form>
        <div className="status" role="status">{status}</div>
      </div>
    </section>
  );
}
