import AddListForm from "@/components/AddListForm";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";
import Layout from "@/pages/Layout";
import HomeLayout from "@/pages/HomeLayout";
import ListPage from "@/pages/ListPage";
import ListsPage from "@/pages/ListsPage";
import MovieDetailPage from "@/pages/MovieDetailPage";
import MoviesPage from "@/pages/MoviesPage";
import UserProfilePage from "@/pages/UserProfilePage";
import { createBrowserRouter } from "react-router-dom";
import UserListsPage from "@/pages/UserListsPage";
import ReviewForm from "@/components/ReviewForm";
import EditProfilePage from "@/pages/EditProfilePage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import CookiePage from "@/pages/CookiePage";

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
      { path: "films/:provider_id", element: <MoviesPage /> },
      { path: "lists", element: <ListsPage /> },
      { path: "lists/:id", element: <ListPage /> },
      { path: "lists/edit/:id", element: <AddListForm /> },
      { path: "lists/add", element: <AddListForm /> },
      { path: "films/:id", element: <MovieDetailPage /> },

      { path: "users/:id", element: <UserProfilePage /> },
      { path: "settings", element: <EditProfilePage /> },
      { path: "users/:id/lists", element: <UserListsPage /> },

      { path: "privacy-policy", element: <PrivacyPage /> },
      { path: "terms-of-service", element: <TermsPage /> },
      { path: "cookie-settings", element: <CookiePage /> },
    ],
  },
]);

export default router;
