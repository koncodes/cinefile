import MovieListCard from "@/components/MovieListCard";
import MovieListGrid from "@/components/MovieListGrid";
import { MovieList } from "@/entities/MovieList";
import MovieListCollection from "@/firebase/MovieListCollection";
import { userAuthStore } from "@/stores/AuthStore";
import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ListsPage = () => {
  const authUser = userAuthStore((s) => s.authUser);

  const [movieLists, setMovieLists] = useState<MovieList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieLists = async () => {
      try {
        if (!authUser?.id) {
          throw new Error("User ID is undefined.");
        }
        const lists = await MovieListCollection.getAllMovieListsById(
          authUser.id
        );
        setMovieLists(lists);
      } catch (error) {
        throw new Error("Failed to fetch movie lists.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieLists();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Heading as="h1" size="4xl" marginY={2}>
        Your Lists
      </Heading>
      <MovieListGrid movieLists={movieLists} />
    </div>
  );
};

export default ListsPage;
