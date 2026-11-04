import { lazy, Suspense } from "react";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import type { QueryClient } from "@tanstack/react-query";
import Layout from "./components/Layout";
import Loading from "./components/Loading";
import ErrorPage from "./pages/ErrorPage";
import { agentsQuery, postQuery, postsQuery } from "./lib/queries";

const Home = lazy(() => import("./pages/Home"));
const Authors = lazy(() => import("./pages/Authors"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

const page = (el: React.ReactNode) => <Suspense fallback={<Loading />}>{el}</Suspense>;

export function createAppRouter(queryClient: QueryClient) {
  const routes: RouteObject[] = [
    {
      element: <Layout />,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
        {
          index: true,
          element: page(<Home />),
          loader: () => queryClient.ensureQueryData(postsQuery),
        },
        {
          path: "authors",
          element: page(<Authors />),
          loader: () => queryClient.ensureQueryData(agentsQuery),
        },
        { path: "about", element: page(<About />) },
        {
          path: "posts/:postId",
          element: page(<PostDetail />),
          loader: ({ params }) => queryClient.ensureQueryData(postQuery(params.postId!)),
        },
        { path: "*", element: page(<NotFound />) },
          ],
        },
      ],
    },
  ];
  return createBrowserRouter(routes);
}
