// src/components/ui/Countdown.tsx
import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: "Dager", value: timeLeft.days },
    { label: "Timer", value: timeLeft.hours },
    { label: "Minutter", value: timeLeft.minutes },
    { label: "Sekunder", value: timeLeft.seconds },
  ];

  return (
    <div className="inline-flex items-center gap-4 sm:gap-6 bg-navy-900/60 backdrop-blur-md border border-gold-400/20 rounded-2xl px-6 py-4 sm:px-8 sm:py-6">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="text-3xl sm:text-5xl font-display font-bold text-gold-400 tabular-nums">
            {unit.value.toString().padStart(2, "0")}
          </div>
          <div className="text-xs sm:text-sm text-gray-400 mt-1 uppercase tracking-wider">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
