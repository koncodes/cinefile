import AddListForm from "@/components/AddListForm";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";
import Layout from "@/pages/Layout";
import HomeLayout from "@/pages/HomeLayout"; // You'll need to create this
import ListPage from "@/pages/ListPage";
import ListsPage from "@/pages/ListsPage";
import MovieDetailPage from "@/pages/MovieDetailPage";
import MoviesPage from "@/pages/MoviesPage";
import UserProfilePage from "@/pages/UserProfilePage";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [{ index: true, element: <HomePage /> }],
    errorElement: <Layout />,
  },
  {
    path: "/",
    element: <Layout />,

    children: [
      { path: "films", element: <MoviesPage /> },
      { path: "lists", element: <ListsPage /> },
      { path: "lists/:id", element: <ListPage /> },
      { path: "lists/edit/:id", element: <AddListForm /> },
      { path: "lists/add", element: <AddListForm /> },
      { path: "films/:id", element: <MovieDetailPage /> },
      { path: "users/:id", element: <UserProfilePage /> },
    ],
  },
]);

export default router;
