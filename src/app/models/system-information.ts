import { RuvArrays } from './ruv-arrays';
import { User } from './user';

export interface SystemInformation {
  Error: boolean;
  ErrorMsg: string;
  Users: User[];
  Activities: RuvArrays[];
  Companions: RuvArrays[];
}
