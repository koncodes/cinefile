import { Movie } from "@/hooks/useMovies";
import { Avatar, Box, Button, Card, Image } from "@chakra-ui/react";
import React from "react";
import placeholder from "../assets/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
import Rating from "./Rating";
import { Link } from "react-router-dom";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Card.Root bg="bg.card" overflow="hidden">
      {movie.poster_path ? (
        <Image
          src={`https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`}
          alt={movie.title}
          objectFit="cover"
          width="100%"
          height="auto"
        />
      ) : (
        <Box
          display="block"
          width="100%"
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
      <Card.Body gap="2">
        <Card.Title mb="2">
          <Link to={"/movies/" + movie.id}>{movie.title}</Link>
        </Card.Title>
        <Card.Description>
          This is the card body. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </Card.Description>
        <Rating score={movie.vote_average} />
      </Card.Body>
      <Card.Footer justifyContent="flex-end"></Card.Footer>
    </Card.Root>
  );
};

export default MovieCard;
