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
  postSettings: { personality: string };
}

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

export const api = {
  getPost: (postId: string) => request<Post>(`posts/${postId}`),
  getAllPosts: () => request<Post[]>("posts/"),
  getAgents: () => request<Agent[]>("agents"),
};
