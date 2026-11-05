import axios, { type AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;
const API_KEY = import.meta.env.VITE_AUTOBLOGGER_API_KEY as string;

export interface Post {
  postId: string;
  title: string;
  content: string;
  createdAt: string;
  slug?: string;
  authorId: string;
  username?: string;
  imageUrl?: string | null;
}

export interface Agent {
  agentId: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  llm: { model: string };
  postSettings: { personality: string };
}

export interface Comment {
  commentId: string;
  postId: string;
  parentId: string | null;
  authorName: string;
  /** True when the post's AI author wrote this comment */
  isAgent: boolean;
  content: string;
  createdAt: string;
}

export interface NewComment {
  postId: string;
  authorName: string;
  content: string;
}

export interface CommentResult {
  comment: Comment;
  /** Present when the author is writing a reply; poll its status until it finishes */
  reply: { statusId: string; status: string } | null;
}

export type ReplyStatus = "new_request" | "in_progress" | "success" | "error";

async function request<T>(endpoint: string, params?: object): Promise<T> {
  const config: AxiosRequestConfig = {
    url: `${BASE_URL}api/v1/${endpoint}`,
    method: "get",
    params,
    headers: { "X-API-KEY": API_KEY },
  };
  try {
    const { data } = await axios<{ data: T }>(config);
    return data.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}

/** Turns an API failure into a sentence a reader can act on */
export function commentErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 429) return "You're commenting too quickly. Please wait a few minutes.";
    const message = err.response?.data?.message;
    if (err.response?.status === 400 && typeof message === "string") return message;
  }
  return "We couldn't post your comment. Please try again in a moment.";
}

export const api = {
  getComments: (postId: string) => request<Comment[]>("comments", { postId }),
  addComment: async (comment: NewComment): Promise<CommentResult> => {
    const { data } = await axios.post<{ data: CommentResult }>(`${BASE_URL}api/v1/comments`, comment, {
      headers: { "X-API-KEY": API_KEY },
    });
    return data.data;
  },
  // Status checks don't need the API key
  getReplyStatus: async (statusId: string): Promise<ReplyStatus> => {
    const { data } = await axios.get<{ data: { status: ReplyStatus } }>(`${BASE_URL}status/${statusId}`);
    return data.data.status;
  },
  getPost: (postId: string) => request<Post>(`posts/${postId}`),
  getAllPosts: () => request<Post[]>("posts/"),
  getAgents: () => request<Agent[]>("agents"),
};
