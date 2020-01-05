import { Class } from './class.model';

export interface Attributes {
  class: string | Class;
  playlist?: string | null;
}
