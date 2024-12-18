import React, { useRef, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { useInView } from '../../hooks/useInView';

interface ProfileSectionProps {
  id: string;
  title: string;
  isActive: boolean;
  children: React.ReactNode;
}

export function ProfileSection({ id, title, isActive, children }: ProfileSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const handleVisibilityChange = useCallback((ratio: number) => {
    if (!contentRef.current) return;
    
    const fadeStart = 0.2;
    const fadeEnd = 0.6;
    const normalizedRatio = Math.min(1, Math.max(0, (ratio - fadeStart) / (fadeEnd - fadeStart)));
    
    contentRef.current.style.opacity = normalizedRatio.toString();
    contentRef.current.style.transform = `
      translateY(${30 * (1 - normalizedRatio)}px)
      scale(${0.95 + (normalizedRatio * 0.05)})
    `;
    contentRef.current.style.filter = `blur(${3 * (1 - normalizedRatio)}px)`;
  }, []);

  const { isInView } = useInView(sectionRef, {
    rootMargin: '-20% 0px -20% 0px',
    onVisibilityChange: handleVisibilityChange
  });

  return (
    <section 
      ref={sectionRef}
      id={id}
      className={cn(
        "relative min-h-[50vh] py-4 px-6",
        "rounded-lg border border-gold-500/10",
        "transition-all duration-500",
        isActive ? "bg-dark-800/50" : "bg-dark-900/50"
      )}
      style={{ marginBottom: '0.5rem' }}
    >
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-gold-500/5 via-transparent to-dark-900",
          "rounded-lg opacity-0 transition-opacity duration-700",
          isInView && "opacity-100"
        )} 
      />

      <div
        ref={contentRef}
        className="relative transition-all duration-500 ease-out will-change-transform"
        style={{
          transformOrigin: 'center',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        <h3 className={cn(
          "text-xl font-medium mb-3",
          "transition-colors duration-300",
          isActive ? "text-white" : "text-white/60"
        )}>
          {title === 'Financial Goals' ? 'Reward Preferences' : title}
        </h3>

        <div className="transition-opacity duration-500">
          {children}
        </div>
      </div>
    </section>
  );
}