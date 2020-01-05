import { Metadata } from './meta-data.model';
import { Attributes } from './attribute.model';
import { Stats } from './stats.model';

export interface SegmentsEntity {
  type: string;
  attributes?: Attributes | null;
  metadata: Metadata;
  expiryDate: string;
  stats: Stats;
}
