// src/pages/FrivilligPersonvern.tsx
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SEOHead } from '@/components/SEOHead';
import { PrivacyPolicyContent } from '@/components/privacy/PrivacyPolicyContent';
import { PageHero } from '@/components/layout/PageHero';

export default function FrivilligPersonvern() {
  return (
    <>
      <SEOHead
        title="Personvern — frivilligpåmelding"
        description="Personvernerklæring for påmelding som frivillig til Eventyrfestningen. Les om hvilke opplysninger vi samler inn, hvordan de brukes og dine rettigheter."
        type="website"
      />

      <PageHero
        eyebrow="Frivillig"
        title="Personvernerklæring"
        subtitle="Frivilligpåmelding — hvordan vi behandler opplysningene du oppgir."
        align="left"
      />

      <Section background="cynical" paddingY="tight">
        <Container size="sm">
          <PrivacyPolicyContent />
        </Container>
      </Section>
    </>
  );
}
