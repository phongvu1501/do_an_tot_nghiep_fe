export interface Comment {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  user?: {
    id: number;
    name: string;
  };
}

export interface CommentPayload {
  rating: number;
  comment: string;
}

export interface ApiResponse<T = any> {
  message: string;
  data?: T;
}
