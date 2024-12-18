import React from 'react';
import { Logo } from '../components/layout/Logo';
import { BackButton } from '../ui/BackButton';
import { LoadingAnimation } from '../components/recommendations/LoadingAnimation';
import { RecommendationList } from '../components/recommendations/RecommendationList';
import { useRecommendationsStore } from '../store/useRecommendationsStore';
import { parseRecommendations } from '../utils/parseRecommendations';
import { getOpenAIConfig } from '../config/openai';

export function Recommendations() {
  const { recommendations, isLoading, error } = useRecommendationsStore();
  const { isTestMode } = getOpenAIConfig();
  const parsedData = recommendations ? parseRecommendations(recommendations) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl px-4">
          <div className="text-center mb-8">
            <Logo className="mx-auto" />
            <h2 className="mt-6 text-3xl font-display tracking-tight text-white">
              Finding Your Perfect Cards
            </h2>
            <p className="mt-2 text-sm text-gold-500/80">
              {isTestMode ? 
                'Demo Mode: Loading sample recommendations' : 
                'Our AI is analyzing thousands of credit cards to find your best matches'}
            </p>
          </div>
          <LoadingAnimation />
        </div>
      </div>
    );
  }

  // Rest of the component remains the same...
}