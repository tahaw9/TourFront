export class BasePaginationFilter<T>{
    PageNumber: number = 1;
    PageSize: number = 9;
    Filters: T|null = null;
}