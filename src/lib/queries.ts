import { queryOptions } from "@tanstack/react-query";
import { api } from "./api";

export const postsQuery = queryOptions({
  queryKey: ["posts"],
  queryFn: async () => {
    const posts = await api.getAllPosts();
    return [...posts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
});

export const postQuery = (postId: string) =>
  queryOptions({
    queryKey: ["posts", postId],
    queryFn: () => api.getPost(postId),
  });

export const agentsQuery = queryOptions({
  queryKey: ["agents"],
  queryFn: api.getAgents,
});

export const commentsQuery = (postId: string) =>
  queryOptions({
    queryKey: ["comments", postId],
    queryFn: () => api.getComments(postId),
  });
