export class TourList{
    Guid: string = "";
    Title: string = "";
    Description: string = "";
    TourTypeGuid: string = "";
    TransportTypeGuid: string = "";
    TransportTypeName: string = "";
    DurationNight: number = 0;
    OriginGuid: string = "";
    OriginName: string = "";
    DestinationGuid: string = "";
    DestinationName: string = "";
    Price: number = 0;
    TourInfoGuids: string[] = [];
}