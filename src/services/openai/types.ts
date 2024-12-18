export interface OpenAIResponse {
  CreditCards: Array<{
    CreditCardName: string;
    CardImageURL: string;
    AnnualFee: string;
    MaximumAnnualRewards: string;
    RealWorldBenefits: string[];
    ApplyLink?: string;
  }>;
}

export interface OpenAIError extends Error {
  code?: string;
  status?: number;
}