// src/components/sections/AuditionHero.tsx
// Audition øverst på forsiden: StageHero med «AUDITION»-ordbilde og påmeldingslenker.
// Lenger ned (under Halloween) brukes den roligere AuditionSection.

import { StageHero, type StageHeroImages } from "@/components/sections/StageHero";
import { AuditionSignupLinks, type AuditionSignup } from "@/components/sections/AuditionSignupLinks";

interface AuditionHeroProps {
  title: string;
  showTitle: string;
  dateLabel: string;
  dateTime: string;
  signupHeading: string;
  signupNote?: string;
  deadlineLabel?: string;
  deadlineDateTime?: string;
  signups: readonly AuditionSignup[];
  images: StageHeroImages;
}

export function AuditionHero({
  title,
  showTitle,
  dateLabel,
  dateTime,
  signupHeading,
  signupNote,
  deadlineLabel,
  deadlineDateTime,
  signups,
  images,
}: AuditionHeroProps) {
  return (
    <StageHero
      headingId="audition-title"
      srTitle={`${title}: ${showTitle}`}
      wordmark={title}
      dateLabel={dateLabel}
      dateTime={dateTime}
      images={images}
    >
      <AuditionSignupLinks
        heading={signupHeading}
        note={signupNote}
        deadlineLabel={deadlineLabel}
        deadlineDateTime={deadlineDateTime}
        signups={signups}
        placement="hero"
      />
    </StageHero>
  );
}
