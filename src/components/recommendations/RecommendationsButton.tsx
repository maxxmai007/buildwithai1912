import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { LoadingSpinner } from './LoadingSpinner';
import { useRecommendationsStore } from '../../store/useRecommendationsStore';
import { useProfileStore } from '../../store/useProfileStore';
import { generateCreditCardRecommendations } from '../../services/openai';
import { ROUTES } from '../../config/routes';

export function RecommendationsButton() {
  const navigate = useNavigate();
  const { setRecommendations, setLoading, setError, isLoading } = useRecommendationsStore();
  const { basicDetails, spendingHabits, goals } = useProfileStore();

  const handleGetRecommendations = async () => {
    if (isLoading) return;

    try {
      setLoading(true);
      setError(null);
      
      // Validate required data
      if (!basicDetails || !spendingHabits || !goals.length) {
        throw new Error('Please complete your profile before getting recommendations');
      }

      const recommendations = await generateCreditCardRecommendations({
        basicDetails,
        spendingHabits,
        goals,
      });
      
      setRecommendations(recommendations);
      navigate(ROUTES.RECOMMENDATIONS);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to generate recommendations. Please try again.';
      
      setError(errorMessage);
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleGetRecommendations}
        disabled={isLoading}
        className="w-full relative"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <LoadingSpinner size="sm" />
            Getting Recommendations...
          </span>
        ) : (
          'Get Recommendations'
        )}
      </Button>

      {/* Error display */}
      <div className="recommendations-error text-center">
        {useRecommendationsStore.getState().error && (
          <p className="text-sm text-red-500">
            {useRecommendationsStore.getState().error}
          </p>
        )}
      </div>
    </div>
  );
}