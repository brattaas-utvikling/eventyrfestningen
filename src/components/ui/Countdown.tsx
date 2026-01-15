// src/components/ui/Countdown.tsx (ENKEL VERSJON - OPTIMALISERT)
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
    <div 
      className="inline-flex items-center 
                 gap-3 sm:gap-4 md:gap-4 lg:gap-5 xl:gap-6
                 bg-navy-900/60 backdrop-blur-md 
                 border border-gold-400/20 
                 rounded-xl sm:rounded-2xl
                 px-4 py-3
                 sm:px-6 sm:py-4
                 md:px-5 md:py-4
                 lg:px-6 lg:py-5
                 xl:px-8 xl:py-6
                 shadow-[0_0_30px_rgba(251,191,36,0.15)]
                 hover:shadow-[0_0_40px_rgba(251,191,36,0.2)]
                 transition-shadow duration-300"
    >
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          {/* Number - Større på mobil, balansert på desktop */}
          <div 
            className="font-display font-bold text-gold-400 tabular-nums leading-none
                       text-3xl
                       sm:text-4xl
                       md:text-3xl
                       lg:text-4xl
                       xl:text-5xl"
          >
            {unit.value.toString().padStart(2, "0")}
          </div>
          
          {/* Label */}
          <div 
            className="text-gray-400 uppercase tracking-wider leading-none
                       mt-1 sm:mt-1.5
                       text-[10px] sm:text-xs md:text-[11px] lg:text-sm"
          >
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}