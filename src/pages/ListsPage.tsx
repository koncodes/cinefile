import MovieListCard from "@/components/MovieListCard";
import MovieListGrid from "@/components/MovieListGrid";
import MovieListPreview from "@/components/MovieListPreview";
import { MovieList } from "@/entities/MovieList";
import MovieListCollection from "@/firebase/MovieListCollection";
import { Card, Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ListsPage = () => {
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
      <MovieListGrid movieLists={movieLists} />
    </div>
  );
};

export default ListsPage;
