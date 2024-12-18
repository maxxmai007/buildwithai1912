import { UserProfile } from '../../../types/profile';
import { formatCurrency } from '../../../utils/formatters';
import { formatGoal } from './formatters';

export function generateUserPrompt(profile: UserProfile): string {
  const { basicDetails, spendingHabits, goals } = profile;

  const sections = [
    // Profile Section
    'User Profile:',
    `- Income: ${formatCurrency(basicDetails.income)}`,
    `- Occupation: ${basicDetails.occupation}`,
    `- Location: ${basicDetails.city}`,
    '',
    // Spending Section
    'Monthly Spending:',
    ...Object.entries(spendingHabits).map(
      ([category, amount]) => `- ${category}: ${formatCurrency(amount)}`
    ),
    '',
    // Goals Section
    'Reward Preferences:',
    ...goals.map(goal => `- ${formatGoal(goal)}`),
    '',
    'Please recommend credit cards that:',
    '1. Match the income eligibility',
    '2. Maximize rewards based on spending pattern',
    '3. Align with stated preferences',
    '4. Provide real-world benefits'
  ];

  return sections.join('\n');
}