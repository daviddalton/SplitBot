export interface UserInfo {
  isPremium: boolean;
  isVerified: boolean;
  isInfluencer: boolean;
  countryCode?: string;
  customAvatarUrl?: string;
  socialAccounts?: string[];
}
