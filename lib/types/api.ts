export type ApiResponse<T = any> = {
    data: T;
    message: string;
    status: number;
    pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    }
}