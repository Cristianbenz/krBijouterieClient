export interface IGetAllFilter {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    dateOrder?: 'ASC' | 'DESC';
    getDisabled?: boolean;
}