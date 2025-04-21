import useMovieExtended from "@/hooks/useMovieExtended";
import {
  Heading,
  HStack,
  Spinner,
  VStack,
  Image,
  Box,
  SimpleGrid,
  Text,
  Container,
} from "@chakra-ui/react";
import placeholder from "/images/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
import { useParams, useNavigate } from "react-router-dom";
import MovieImg from "@/components/MovieImg";

export interface Person {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  job: string;
  department?: string;
}

interface CastMemberProps {
  person: Person;
}

interface CastListProps {
  cast: Person[];
  title: string;
}

export const CastList = ({ cast, title }: CastListProps) => {
  return (
    <>
      <Heading as="h4" size="xl" marginY={5} opacity=".6" fontFamily="Poppins">
        {title}
      </Heading>
      <VStack
        className="cast-list"
        gap="3"
        borderColor="border.card"
        borderWidth="1px"
        borderStyle="solid"
        borderRadius="10px"
        padding="4"
        alignItems="flex-start"
      >
        {cast.map((person) => (
          <CastMember
            key={person.id + (person.job || person.character)}
            person={person}
          />
        ))}
      </VStack>
    </>
  );
};

export const CastMember = ({ person }: CastMemberProps) => {
  return (
    <SimpleGrid
      className="crew-member"
      alignItems="center"
      gap="5"
      column="3"
      gridTemplateColumns="30px 200px 1fr"
      _even={{ bg: "transparent" }}
      _odd={{ bg: "layoutTertiary.bg" }}
      width="100%"
      px="2"
      py="1"
    >
      {person.profile_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
          alt={person.name}
          objectFit="cover"
          borderRadius="100%"
          boxSize="30px"
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
          boxSize="30px"
        />
      )}
      <Heading
        fontWeight="600"
        fontSize="md"
        fontFamily="Poppins"
        lineHeight="140%"
      >
        {person.name}
      </Heading>
      <Text opacity=".8">{person.character || person.job}</Text>
    </SimpleGrid>
  );
};

const MovieCreditsPage = () => {
  const { id } = useParams();
  const { data: movie, isLoading, error } = useMovieExtended(id!);
  const navigate = useNavigate();


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

        <Container maxW="7xl" paddingTop="20" paddingBottom="5">
          <HStack alignItems="flex-start" gap="10">
            <Box maxW="70px" overflow="hidden" borderRadius="10px" flex=".6">
              <MovieImg movie={movie} />
            </Box>
            <VStack alignItems="flex-start" flex="1">
              <Heading as="h1" size="4xl" marginY="0">
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
              <Heading as="h4" size="2xl" opacity=".6" fontFamily="Poppins">
                Full Cast and Crew
              </Heading>
            </VStack>
          </HStack>
        </Container>
      </Box>
      <Container maxW="7xl" paddingBottom="10">
        {movie.credits?.crew && (
          <CastList
            cast={movie.credits.crew?.filter(
              (person) => person.job === "Director"
            )}
            title="Director"
          />
        )}
        {movie.credits?.crew && (
          <CastList
            cast={movie.credits.crew?.filter(
              (person) => person.department === "Writing"
            )}
            title="Writers"
          />
        )}
        {movie.credits?.cast && (
          <CastList cast={movie.credits.cast} title="Cast" />
        )}
        {movie.credits?.crew && (
          <CastList
            cast={movie.credits.crew?.filter(
              (person) => person.department === "Production"
            )}
            title="Producers"
          />
        )}
      </Container>
    </>
  );
};

export default MovieCreditsPage;
