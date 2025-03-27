import ExpandableText from "@/components/ExpandableText";
import MovieTrailer from "@/components/MovieTrailer";
import ReviewForm from "@/components/ReviewForm";
import useMovie from "@/hooks/useMovie";
import useMovieExtended from "@/hooks/useMovieExtended";
import { userAuthStore } from "@/stores/AuthStore";
import { Heading, Spinner, Text } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const { id } = useParams();
  const authUser = userAuthStore((s) => s.authUser);
  const { data: movie, isLoading, error } = useMovieExtended(id!);

  console.log(movie);

  const trailers = movie?.videos?.results || [];
  const num = trailers.length ? trailers.length - 1 : 0;
  const trailersUrl = `https://www.youtube.com/watch?v=${trailers[num]?.key}`;

  if (isLoading) return <Spinner />;
  if (error || !movie) throw error;

  return (
    <>
      <Heading>{movie.title}</Heading>
      <ExpandableText>{movie.overview}</ExpandableText>
      <ReactPlayer
        controls
        playing={false}
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
            },
          },
        }}
        url={trailersUrl}
        fallback={<div>Trailer not available</div>}
      ></ReactPlayer>{" "}
      {authUser?.id && <ReviewForm movieId={movie.id} />}
    </>
  );
};

export default MovieDetailPage;
