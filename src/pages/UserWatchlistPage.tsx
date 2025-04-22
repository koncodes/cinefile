import MovieListCard from "@/components/MovieListCard";
import MovieListGrid from "@/components/MovieListGrid";
import UserProfileHeader from "@/components/UserProfileHeader";
import { MovieList } from "@/entities/MovieList";
import { User } from "@/entities/User";
import MovieListCollection from "@/firebase/MovieListCollection";
import { userAuthStore } from "@/stores/AuthStore";
import { Heading, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserWatchlistPage = () => {
  const { id } = useParams();
  const authUser = userAuthStore((s) => s.authUser);

  const [error, setError] = useState<string | null>(null);
  const [movieLists, setMovieLists] = useState<MovieList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieLists = async () => {
      try {
        if (!id) {
          setError("User ID is undefined.");
        }
        console.log("User ID:", id);
        console.log("Auth User ID:", authUser?.id);
        if (authUser?.id === id) {
          const lists = await MovieListCollection.getAllMovieListsById(id!);
          setMovieLists(lists);
        } else {
          const lists = await MovieListCollection.getPublicMovieListsById(id!);
          setMovieLists(lists);
        }
      } catch (error) {
        setError("Failed to fetch movie lists.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieLists();
  }, [id, authUser]);

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <div>
      <UserProfileHeader />
      <MovieListGrid movieLists={movieLists} />
    </div>
  );
};

export default UserWatchlistPage;
