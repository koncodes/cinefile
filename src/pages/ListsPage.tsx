import MovieListGrid from "@/components/MovieListGrid";
import { MovieList } from "@/entities/MovieList";
import MovieListCollection from "@/firebase/MovieListCollection";
import { userAuthStore } from "@/stores/AuthStore";
import { Button, chakra, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListsPage = () => {
  const authUser = userAuthStore((s) => s.authUser);
  const [movieLists, setMovieLists] = useState<MovieList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieLists = async () => {
      try {
        const lists = await MovieListCollection.getAllMovieLists();
        setMovieLists(lists);
      } catch (error) {
        setError("Failed to fetch movie lists.");
        console.error("Error fetching movie lists:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieLists();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Heading as="h1" size="4xl" marginBottom={5}>
        Movie Lists
      </Heading>
      <Text mb="5">
        Craft your cinematic collection. Organize your favorite films into
        personalized lists and share your unique taste with the Cinefile
        community.
      </Text>
      {authUser && (
        <Link to="/lists/add">
          <Button
            primary
            mb="5"
          >
            Add new list
          </Button>
        </Link>
      )}
      <MovieListGrid movieLists={movieLists} />
    </div>
  );
};

export default ListsPage;
