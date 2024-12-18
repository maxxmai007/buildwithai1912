export function formatGoal(goal: string): string {
  const goalMap: Record<string, string> = {
    cashback: 'Cashback Rewards',
    travel: 'Travel Benefits & Miles',
    shopping: 'Shopping Rewards & Discounts',
    dining: 'Dining & Entertainment Benefits',
    lounge: 'Airport Lounge Access',
    insurance: 'Travel & Purchase Insurance'
  };

  return goalMap[goal] || goal;
}