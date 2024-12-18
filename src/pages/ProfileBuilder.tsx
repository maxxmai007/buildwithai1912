import React from 'react';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ScrollProgressBar } from '../components/profile/ScrollProgressBar';
import { ProfileSection } from '../components/profile/ProfileSection';
import { BasicDetails } from '../components/profile/BasicDetails';
import { SpendingHabits } from '../components/profile/SpendingHabits';
import { Goals } from '../components/profile/Goals';
import { useProfileStore } from '../store/useProfileStore';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useProfileNavigation } from '../hooks/useProfileNavigation';
import { PROFILE_SECTIONS } from '../config/profile';

export function ProfileBuilder() {
  const { basicDetails, spendingHabits, goals } = useProfileStore();
  const { handleSectionComplete } = useProfileNavigation();
  const activeSection = useScrollSpy(PROFILE_SECTIONS.map(s => s.id));

  const isSectionComplete = (section: string) => {
    switch (section) {
      case 'basic':
        return !!basicDetails;
      case 'spending':
        return !!spendingHabits;
      case 'goals':
        return goals.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <ScrollProgressBar />
      
      <div className="max-w-2xl mx-auto px-4 py-6">
        <ProfileHeader />

        <div className="space-y-1">
          {PROFILE_SECTIONS.map(({ id, title }) => {
            const Component = {
              basic: BasicDetails,
              spending: SpendingHabits,
              goals: Goals
            }[id];

            return (
              <ProfileSection
                key={id}
                id={id}
                title={title}
                isActive={activeSection === id || isSectionComplete(id)}
              >
                <Component onNext={() => handleSectionComplete(id)} />
              </ProfileSection>
            );
          })}
        </div>
      </div>
    </div>
  );
}