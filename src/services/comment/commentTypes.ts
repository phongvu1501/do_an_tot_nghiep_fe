export interface Comment {
    id: number;
    user_id: number;
    rating: number;
    comment: string;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface CommentPayload {
    rating: number;
    comment: string;
}

export interface ApiResponse<T = any> {
    message: string;
    data?: T;
}
