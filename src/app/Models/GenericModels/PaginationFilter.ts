export class PaginationFilter<T> {
    PageNumber: number = 1;
    PageSize: number = 10;
    FilterModel: T[] = [];
}