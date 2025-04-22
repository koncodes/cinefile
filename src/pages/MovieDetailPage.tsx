import MovieImg from "@/components/MovieImg";
import Rating from "@/components/Rating";
import ReviewForm from "@/components/ReviewForm";
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
  SimpleGrid,
  Span,
  Badge,
  Strong,
  Button,
  Stack,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { IconType } from "react-icons";
import MovieCard from "@/components/MovieCard";
import MovieTrailer from "@/components/MovieTrailer";
import { Review } from "@/entities/Review";
import { useEffect, useState } from "react";
import ReviewCollection from "@/firebase/ReviewCollection";
import ReviewCard from "@/components/ReviewCard";

const ArrowForward: IconType = MdArrowForwardIos;

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
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    getReviews();
  }, [id]);

  async function getReviews() {
    if (!id) return;
    try {
      console.log("movieId" + id);
      const reviewData = await ReviewCollection.getReviewsByMovie(id);
      setReviews(reviewData);
      console.log("reviews" + reviewData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }

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
          <HStack alignItems="flex-start" gap={{ base: "5", md: "10" }}>
            <Box
              maxW={{ base: "100px", sm: "200px", md: "250px", lg: "300px" }}
              overflow="hidden"
              borderRadius="10px"
              flex=".6"
            >
              <MovieImg movie={movie} />
              <Box
                w="100%"
                bg="buttonPrimary.bg"
                color="buttonPrimary.text"
                display="flex"
                alignItems="center"
                justifyContent="center"
                padding="2"
                fontSize={{ base: "1em", md: "2em" }}
              >
                <MovieTrailer movie={movie} />
              </Box>
            </Box>
            <VStack alignItems="flex-start" flex="1" gap="4">
              <Heading as="h1" size="4xl" marginBottom="2" marginTop="0">
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
              <Text>
                <span className="release-date">
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  ({movie.origin_country && movie.origin_country[0]})
                </span>
                <Span px="2">•</Span>
                <span className="runtime">
                  {movie.runtime && <>{formatRuntime(movie.runtime)}</>}
                </span>
              </Text>
              <Text gap="2" display="flex" flexWrap="wrap">
                {movie.genres.map((genre, index) => (
                  <Badge secondary key={genre.id}>
                    {genre.name}
                  </Badge>
                ))}
              </Text>
              <HStack>
                <Rating score={movie.vote_average} size="lg" />
                {authUser?.id ? (
                  <ReviewForm movieId={movie.id} />
                ) : (
                  <Button primary>Login to Leave a Review</Button>
                )}
              </HStack>

              {movie.tagline && (
                <Heading as="h4" size="xl" marginTop={2} fontFamily="Poppins">
                  "{movie.tagline}"
                </Heading>
              )}
              <Text>{movie.overview}</Text>
              {movie.credits?.crew?.some(
                (person) => person.job === "Director"
              ) && (
                <Text>
                  <Strong>
                    {movie.credits.crew
                      .filter((person) => person.job === "Director")
                      .map((director, index, array) => (
                        <span key={director.credit_id}>
                          {director.name}
                          {index < array.length - 1 ? ", " : ""}
                        </span>
                      ))}
                  </Strong>
                  <Span
                    fontSize="xs"
                    textTransform="uppercase"
                    lineHeight="140%"
                    display="block"
                  >
                    Directed by
                  </Span>
                </Text>
              )}
              {movie.credits?.crew?.some(
                (person) => person.job === "Screenplay"
              ) && (
                <Text>
                  <Strong>
                    {movie.credits.crew
                      .filter((person) => person.job === "Screenplay")
                      .map((director, index, array) => (
                        <span key={director.credit_id}>
                          {director.name}
                          {index < array.length - 1 ? ", " : ""}
                        </span>
                      ))}
                  </Strong>
                  <Span
                    fontSize="xs"
                    textTransform="uppercase"
                    lineHeight="140%"
                    display="block"
                  >
                    Written by
                  </Span>
                </Text>
              )}
            </VStack>
          </HStack>
        </Container>
      </Box>
      <Container maxW="7xl" paddingBottom="10">
        <Link to={"/films/" + movie.id + "/fullcredits"}>
          <Heading
            as="h4"
            size="xl"
            marginY={8}
            opacity=".6"
            fontFamily="Poppins"
            display="flex"
            alignItems="center"
            gap="2"
          >
            Top Cast <ArrowForward />
          </Heading>
        </Link>
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
        <Heading
          as="h4"
          size="xl"
          marginY={8}
          opacity=".6"
          fontFamily="Poppins"
          display="flex"
          alignItems="center"
          gap="2"
        >
          Similar Films
        </Heading>
        <HStack
          overflowX="auto"
          gap="4"
          paddingBottom="4"
          alignItems="stretch"
          css={{
            "& .movie-card": {
              height: "auto!important",
              minWidth: "220px!important",
              _hover: {
                transform: "none !important",
                transition: "none !important",
              },
            },
            "& .movie-card-rating": {
              display: "none",
            },
          }}
          height="100%"
        >
          {movie.similar?.results
            ?.slice(0, 10)
            .map((movie) => <MovieCard movie={movie} key={movie.id} />)}
        </HStack>
        {reviews && reviews.length > 0 && (
          <>
            <Heading
              as="h4"
              size="xl"
              marginY={8}
              opacity=".6"
              fontFamily="Poppins"
              display="flex"
              alignItems="center"
              gap="2"
            >
              Reviews
            </Heading>
            <HStack
              overflowX="auto"
              gap="4"
              paddingBottom="4"
              alignItems="stretch"
              css={{
                columnCount: [1, 2, 3],
                "& .review-card": {
                  height: "auto!important",
                  width: "300px",
                  _hover: {
                    transform: "none !important",
                    transition: "none !important",
                  },
                },
              }}
            >
              {reviews.map((review, index) => (
                <ReviewCard review={review} key={index} />
              ))}
            </HStack>
          </>
        )}
      </Container>
    </>
  );
};

export default MovieDetailPage;
