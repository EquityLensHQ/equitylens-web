import { useEffect, useState } from "react";
import "./EquityLensScore.css";

export default function EquityLensScore({ score = 72 }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const stepTime = 10;
    const steps = duration / stepTime;
    const increment = score / steps;

    const interval = setInterval(() => {
      start += increment;

      if (start >= score) {
        start = score;
        clearInterval(interval);
      }

      setDisplayScore(Math.round(start));
    }, stepTime);

    return () => clearInterval(interval);
  }, [score]);

  const radius = 60;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (displayScore / 100) * circumference;

  return (
    <div className="score-card">
      <div className="score-title">EquityLens Score</div>

      <div className="score-body">
        <svg className="score-ring" viewBox="0 0 140 140">
            <circle
                cx="70"
                cy="70"
                r={radius}
                className="ring-bg"
                strokeWidth={stroke}
            />
            <circle
                cx="70"
                cy="70"
                r={radius}
                className="ring-progress"
                strokeWidth={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
            />
        </svg>


        <div className="score-center">
          <div className="score-number">{displayScore}</div>
          <div className="score-label">Score</div>
        </div>
      </div>
    </div>
  );
}