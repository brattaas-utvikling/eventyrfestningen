// src/components/ui/Countdown.tsx (STØRRE PÅ MOBIL, BALANSERT PÅ DESKTOP)
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
                 gap-2.5 xs:gap-3 sm:gap-3.5 md:gap-3.5 lg:gap-4 xl:gap-5
                 bg-navy-900/60 backdrop-blur-md 
                 border border-gold-400/20 
                 rounded-lg sm:rounded-xl lg:rounded-2xl
                 px-3.5 py-3
                 xs:px-4 xs:py-3
                 sm:px-4.5 sm:py-3.5
                 md:px-4 md:py-3.5
                 lg:px-5 lg:py-4
                 xl:px-6 xl:py-5
                 shadow-[0_0_30px_rgba(251,191,36,0.15)]
                 hover:shadow-[0_0_40px_rgba(251,191,36,0.2)]
                 transition-shadow duration-300"
    >
      {units.map((unit, index) => (
        <div key={unit.label} className="flex flex-col items-center relative">
          {/* Separator */}
          {index > 0 && (
            <div 
              className="absolute 
                         -ml-[0.6rem] 
                         xs:-ml-[0.7rem] 
                         sm:-ml-3
                         md:-ml-3
                         lg:-ml-3.5
                         xl:-ml-4
                         text-gold-400/30 
                         font-display font-bold 
                         text-lg
                         xs:text-xl
                         sm:text-xl
                         md:text-xl
                         lg:text-2xl
                         xl:text-3xl
                         select-none pointer-events-none"
              aria-hidden="true"
            >
              :
            </div>
          )}
          
          {/* Number - STØRRE PÅ MOBIL */}
          <div 
            className="font-display font-bold text-gold-400 tabular-nums leading-none
                       text-2xl
                       xs:text-3xl
                       sm:text-3xl
                       md:text-2xl
                       lg:text-3xl
                       xl:text-4xl
                       2xl:text-4xl"
          >
            {unit.value.toString().padStart(2, "0")}
          </div>
          
          {/* Label */}
          <div 
            className="text-gray-400 uppercase tracking-wider leading-none
                       mt-1
                       xs:mt-1
                       sm:mt-1.5
                       md:mt-1
                       lg:mt-1.5
                       text-[9px]
                       xs:text-[10px]
                       sm:text-xs
                       md:text-[10px]
                       lg:text-xs"
          >
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}