import MovieListGrid from "@/components/MovieListGrid";
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
} from "@chakra-ui/react";
import placeholder from "/images/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
import { useParams } from "react-router-dom";

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
      <Text opacity=".8">{person.character}</Text>
    </SimpleGrid>
  );
};

const MovieCreditsPage = () => {
  const { id } = useParams();
  const { data: movie, isLoading, error } = useMovieExtended(id!);

  if (isLoading) return <Spinner />;
  if (error || !movie) throw error;

  return (
    <>
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
        {movie.credits?.cast &&
          movie.credits?.cast.map((person) => (
            <CastMember key={person.id} person={person} />
          ))}
      </VStack>
    </>
  );
};

export default MovieCreditsPage;
