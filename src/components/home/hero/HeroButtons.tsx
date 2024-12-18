import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { smoothScroll } from '../../../utils/scroll';
import { GoldButton } from '../../ui/GoldButton';

export function HeroButtons() {
  const navigate = useNavigate();

  const handleLearnMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    smoothScroll('what-we-do');
  };

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
      <GoldButton onClick={() => navigate('/profile')}>
        Start Your Journey
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </GoldButton>

      <GoldButton onClick={handleLearnMore}>
        Learn More
        <PlayCircle className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
      </GoldButton>
    </div>
  );
}