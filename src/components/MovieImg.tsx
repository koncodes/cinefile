import { Movie } from "@/entities/Movie";
import { Box, Image } from "@chakra-ui/react";
import placeholder from "/images/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

interface Props {
  movie: Movie;
}

const MovieImg = ({ movie }: Props) => {
  return (
    <>
      {movie.poster_path ? (
        <Image
          src={`https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`}
          alt={movie.title}
          objectFit="cover"
          width="100%"
          maxW="350px"
          height="auto"
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
        />
      )}
    </>
  );
};

export default MovieImg;
