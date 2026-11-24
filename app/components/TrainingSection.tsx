import type { RefObject } from "react";
import { TRAINING } from "./site-data";

type TrainingSectionProps = {
  activeTraining: number;
  trainingRef: RefObject<HTMLElement | null>;
  trainingProgressRef: RefObject<HTMLElement | null>;
  onSelectTraining: (index: number) => void;
};

export default function TrainingSection({
  activeTraining,
  trainingRef,
  trainingProgressRef,
  onSelectTraining,
}: TrainingSectionProps) {
  return (
    <section className="training" id="train" aria-label="What we train" ref={trainingRef}>
      <div className="training-sticky">
        <div className="training-list">
          <div className="training-rail" aria-hidden="true"><i ref={trainingProgressRef} /></div>
          <div>
            <h2>What we train</h2>
            {TRAINING.map((item, index) => (
              <button key={item.name} type="button" className={`fname ${activeTraining === index ? "on" : ""}`} aria-pressed={activeTraining === index} onClick={() => onSelectTraining(index)}>
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div className="training-panels">
          {TRAINING.map((item, index) => (
            <div key={item.name} className={`fpanel ${item.panel} ${activeTraining === index ? "on" : ""}`} aria-hidden={activeTraining !== index}>
              <h3>{item.title}</h3><p>{item.text}</p><ul>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </div>
          ))}
        </div>
        <span className="training-hint">Keep scrolling</span>
      </div>
    </section>
  );
}
