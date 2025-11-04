import {environment} from '../../environments/environment';

export class TourInsUp{
  Guid: string = environment.EmptyGuid;
  Title: string = "";
  Description: string = "";
  TourTypeGuid: string = "";
  TourTypeName: string = "";
  TransportTypeGuid: string = "";
  TransportTypeName: string = "";
  DurationNight: number = 0;
  OriginGuid: string = "";
  OriginName: string = "";
  DestinationGuid: string = "";
  DestinationName: string = "";
  Price: number = 0;
  TourInfoGuids: string[] = [];
  TitleFile: File|null = null;
  ImageUrl: string = "";
  IsActive: boolean = true;
}
