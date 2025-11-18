export enum TourOrderFilter {
  HighToLowPrice = 1,
  LowToHighPrice = 2,
  Newest = 3,
  Oldest = 4,
}

export class TourPaginationFilter {
  title?: string | null;
  tourOrderFilter?: TourOrderFilter | null;
  tourTypeGuid?: string | null;
  durationNight?: number | null;
  priceAz?: number | null;
  priceTa?: number | null;
}
