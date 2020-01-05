import { Metadata } from './meta-data.model';

export interface Stat {
  rank?: null;
  percentile?: number | null;
  displayName: string;
  displayCategory: string;
  category: string;
  metadata: Metadata;
  value: number;
  displayValue: string;
  displayType: string;
}
