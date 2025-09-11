import {environment} from '../../environments/environment';

export class RoleList {
  Guid : string = environment.EmptyGuid;
  Name: string|null = null;
  RoleCode: number|null = null;
  Description: string|null = null;
}
