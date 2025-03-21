import HomePage from "@/pages/HomePage";
import Layout from "@/pages/Layout";
import MovieDetailPage from "@/pages/MovieDetailPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movies/:id", element: <MovieDetailPage /> },
    ],
  },
]);

export default router;
