export interface PagedResponse<T> {
    content: T[];
    numberOfElements: number;
    totalElements: number;
}
