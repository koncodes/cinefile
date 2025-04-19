import ExpandableText from "@/components/ExpandableText";
import MovieImg from "@/components/MovieImg";
import MovieTrailer from "@/components/MovieTrailer";
import Rating from "@/components/Rating";
import ReviewForm from "@/components/ReviewForm";
import useMovie from "@/hooks/useMovie";
import placeholder from "/images/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
import useMovieExtended from "@/hooks/useMovieExtended";
import { userAuthStore } from "@/stores/AuthStore";
import {
  Heading,
  HStack,
  Spinner,
  Text,
  Image,
  VStack,
  Container,
  Box,
  Grid,
  SimpleGrid,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";

export interface Person {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Props {
  person: Person;
}

export const CastMember = ({ person }: Props) => {
  return (
    <VStack className="cast-member">
      {person.profile_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
          alt={person.name}
          objectFit="cover"
          borderRadius="100%"
          boxSize="140px"
        />
      ) : (
        <Box
          display="block"
          width="100%"
          maxW="350px"
          height="auto"
          aspectRatio="2/3"
          position="relative"
          top="0"
          left="0"
          backgroundImage={`url(${placeholder})`}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundColor="gray.200"
          backgroundSize="60%"
          borderRadius="100%"
          boxSize="140px"
        />
      )}
      <Box className="person-info" textAlign="center">
        <Heading
          fontWeight="700"
          fontSize="md"
          fontFamily="Poppins"
          lineHeight="140%"
          marginTop="3"
        >
          {person.name}
        </Heading>
        <p>as {person.character}</p>
      </Box>
    </VStack>
  );
};

function formatRuntime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

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
      <Box
        position="relative"
        bg={
          movie?.backdrop_path
            ? `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path})`
            : undefined
        }
        bgSize="cover"
        bgRepeat="no-repeat"
        px={0}
        paddingTop=".1px"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="layoutPrimary.bg"
          opacity=".7"
          zIndex={0}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="to-b"
          gradientFrom="transparent"
          gradientTo="layoutPrimary.bg"
          zIndex={0}
        />

        <Container maxW="7xl" paddingTop="20">
          <HStack alignItems="flex-start" gap="10">
            <Box maxW="300px" overflow="hidden" borderRadius="10px" flex=".6">
              <MovieImg movie={movie} />
            </Box>
            <VStack alignItems="flex-start" flex="1">
              <Heading as="h1" size="4xl" marginY={2}>
                {movie.title}{" "}
                {(() => {
                  const certification = movie.release_dates?.results
                    ?.find((release) => release.iso_3166_1 === "US")
                    ?.release_dates.find(
                      (date) => date.certification
                    )?.certification;

                  return certification ? <>[{certification}]</> : null;
                })()}
              </Heading>
              <Heading
                as="h4"
                size="xl"
                marginY={2}
                opacity=".6"
                fontFamily="Poppins"
              >
                "{movie.tagline}"
              </Heading>
              <Text>
                Directed by{" "}
                {movie.credits?.crew &&
                  movie.credits.crew
                    .filter((person) => person.job === "Director")
                    .map((director, index, array) => (
                      <span key={director.credit_id}>
                        {director.name}
                        {index < array.length - 1 ? ", " : ""}
                      </span>
                    ))}
              </Text>
              <Text>
                {movie.credits?.crew &&
                  movie.credits.crew
                    .filter((person) => person.job === "Screenplay")
                    .map((director, index, array) => (
                      <span key={director.credit_id}>
                        {director.name}
                        {index < array.length - 1 ? ", " : ""}
                      </span>
                    ))}
              </Text>
              <Text>{movie.overview}</Text>
              <Rating score={movie.vote_average} />
              <Text>
                {movie.genres.map((genre, index) => (
                  <span key={genre.id}>
                    {genre.name}
                    {index < movie.genres.length - 1 ? ", " : ""}
                  </span>
                ))}
              </Text>
              <Text opacity=".6">
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                ({movie.origin_country && movie.origin_country})
              </Text>
              <Text className="runtime">
                {movie.runtime && <>{formatRuntime(movie.runtime)}</>}
              </Text>
            </VStack>
          </HStack>
        </Container>
      </Box>
      <Container maxW="7xl">
        <Heading
          as="h4"
          size="3xl"
          marginY={8}
          opacity=".6"
          fontFamily="Poppins"
        >
          Top Cast
        </Heading>
        <SimpleGrid
          className="cast-list"
          columns={{ base: 2, sm: 3, md: 4, lg: 6, xl: 6 }}
          gap={{ base: 3, sm: 3, md: 5, lg: 6, xl: 6 }}
        >
          {movie.credits?.cast &&
            movie.credits?.cast
              .slice(0, 6)
              .map((person) => <CastMember key={person.id} person={person} />)}
        </SimpleGrid>
        <Link to={"/films/" + movie.id + "/fullcredits"}>
          Full Cast and Crew
        </Link>
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
      </Container>
    </>
  );
};

export default MovieDetailPage;
