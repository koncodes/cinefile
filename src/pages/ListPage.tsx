import { useState, useEffect } from "react";
import MovieListCollection from "@/firebase/MovieListCollection";
import { Heading, Spinner, Text, Box } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { MovieList } from "@/entities/MovieList";
import { userAuthStore } from "@/stores/AuthStore";

const MovieListProfilePage = () => {
  const { id } = useParams();
  const authUser = userAuthStore((s) => s.authUser);
  const [movielist, setMovieList] = useState<MovieList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchMovieList = async () => {
      try {
        const movielistData = await MovieListCollection.getMovieListById(id!);
        if (movielistData) {
          setMovieList(movielistData);
        } else {
          setError("MovieList not found");
        }
      } catch (error) {
        setError("Failed to fetch movielist data");
        console.error("Error fetching movielist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieList();
  }, [id]);

  {console.log("movie", movielist?.userId)}
  {console.log("user", authUser?.id)}


  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!movielist || !authUser) return;

  return (
    <Box>
      <Heading>{movielist.name}</Heading>
      <Text>Email: {movielist.id}</Text>
      {movielist.userId == authUser.id && (
        <Link to={"/lists/edit/" + movielist.id}>Edit</Link>
      )}
    </Box>
  );
};

export default MovieListProfilePage;
