import type { UserProfile } from '../../types/profile';

export function getSystemPrompt() {
  return `You are a credit card recommendation expert. Analyze the user profile and return ONLY a JSON response in the following format:
{
  "CreditCards": [
    {
      "CreditCardName": "Card Name",
      "CardImageURL": "URL to card image",
      "AnnualFee": "₹X,XXX",
      "MaximumAnnualRewards": "₹XX,XXX",
      "RealWorldBenefits": [
        "Benefit 1 in simple terms",
        "Benefit 2 in simple terms",
        "Benefit 3 in simple terms"
      ],
      "ApplyLink": "URL to apply"
    }
  ]
}`;
}

export function getUserPrompt(profile: UserProfile) {
  return `Please analyze this user profile and recommend credit cards:\n${JSON.stringify(profile, null, 2)}`;
}