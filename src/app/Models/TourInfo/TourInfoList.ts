export class TourInfoList {
  Guid!: string;
  TourGuid!: string;
  TourTitle!: string;
  StartDate!: string | Date;
  EndDate!: string | Date;
  OriginAddress?: string;
  DestinationAddress?: string;
  Capacity?: number;
  AvailableSeats?: number;
  TourLeaderGuid?: string;
  TourLeaderName?: string;

  IsCanceled?: boolean;
  Notes?: string;
  Status?: number;

  CreateDate?: string | Date;
}
