import { PlatformInfo } from './platform-info.model';
import { UserInfo } from './user-info.model';
import { SegmentsEntity } from './segments-entity.model';
import { Metadata } from './meta-data.model';
import { AvailableSegmentsEntity } from './available-segments-entity.model';

export interface SplitGatePlayer {
  platformInfo: PlatformInfo;
  userInfo: UserInfo;
  metadata: Metadata;
  segments?: (SegmentsEntity)[] | null;
  availableSegments?: (AvailableSegmentsEntity)[] | null;
  expiryDate: string;
}
