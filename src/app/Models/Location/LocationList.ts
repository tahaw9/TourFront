import {environment} from '../../environments/environment';

export class LocationList {
  Guid: string = environment.EmptyGuid;
  LocationLevelGuid: string | null = null;
  LocationLevelName: string | null = null;
  Name: string | null = null;
  Pguid: string | null = null;
  PName: string | null = null;
  ParentalCode: string | null = null;
}
