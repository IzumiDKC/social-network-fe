export type Page<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export type PostResp = {
  id: number;
  authorUsername: string;
  content: string;
  mediaUrl: string | null;
  createdAt: string;
  likeCount: number;
  commentCount: number;
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  // tùy DB bạn có thể bổ sung author nếu trả về
};

export type User = {
  id: number;
  username: string;
  email: string;
  // fullName?: string | null;
  // bio?: string | null;
  // avatarUrl?: string | null;   
  // createdAt?: string;
};
