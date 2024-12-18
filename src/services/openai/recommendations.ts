import { openai, OPENAI_CONFIG, isTestMode } from './config';
import { getSystemPrompt, getUserPrompt } from './prompts';
import { validateResponse } from './validation';
import type { UserProfile } from '../../types/profile';
import type { OpenAIError } from './types';
import { mockRecommendations } from '../mockData';

export async function generateCreditCardRecommendations(profile: UserProfile) {
  if (isTestMode) {
    console.log('Running in test mode - returning mock recommendations');
    return JSON.stringify(mockRecommendations);
  }

  try {
    const completion = await openai.chat.completions.create({
      ...OPENAI_CONFIG,
      messages: [
        {
          role: "system",
          content: getSystemPrompt()
        },
        {
          role: "user",
          content: getUserPrompt(profile)
        }
      ]
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No recommendations received');
    }

    // Validate and return the response
    validateResponse(content);
    return content;

  } catch (error) {
    const openAIError = error as OpenAIError;
    
    if (openAIError.code === 'invalid_api_key') {
      throw new Error('Invalid API key. Please check your configuration.');
    }
    
    if (openAIError.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    console.error('Error generating recommendations:', error);
    throw new Error('Failed to generate credit card recommendations');
  }
}