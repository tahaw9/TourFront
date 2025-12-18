export class TourInfoPaginationFilter{
  // Basic TourInfo Fields
  tourGuid?: string | null;
  tourTitle?: string | null;
  tourLeaderGuid?: string | null;
  status?: number | null;

  // Date Range Flexibility
  // string | Date is useful so you can bind it to DatePickers (Date) or API payloads (ISO string)
  startDateFrom?: string | Date | null;
  startDateTo?: string | Date | null;
  endDateFrom?: string | Date | null;
  endDateTo?: string | Date | null;

  // Capacity & Availability
  minCapacity?: number | null;
  maxCapacity?: number | null;
  hasAvailableSeats?: boolean | null;
  minAvailableSeats?: number | null;
  maxAvailableSeats?: number | null;

  // Related Entity Filtering
  tourTypeGuid?: string | null;
  transportTypeGuid?: string | null;
  originGuid?: string | null;
  destinationGuid?: string | null;
  tourLeaderName?: string | null;

  // General Status & Flags
  isCanceled?: boolean | null;
  isPast?: boolean | null;
}
