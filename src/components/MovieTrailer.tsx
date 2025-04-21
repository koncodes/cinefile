import { Movie } from "@/entities/Movie";
import { Button, Dialog, Heading } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { PiFilmSlate } from "react-icons/pi";
import { IconType } from "react-icons";
const FilmSlate: IconType = PiFilmSlate;

interface Props {
  movie: Movie;
}

const MovieTrailer = ({ movie }: Props) => {
  const trailers = movie?.videos?.results || [];
  const num = trailers.length ? trailers.length - 1 : 0;
  const trailersUrl = `https://www.youtube.com/watch?v=${trailers[num]?.key}`;

  return (
    <Dialog.Root placement="center" size="lg">
      <Dialog.Trigger asChild>
        <FilmSlate cursor="pointer" />
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bg="layoutTertiary.bg" color="layoutTertiary.text">
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Heading as="h5" size="2xl">
              Trailer for "{movie.title}"
            </Heading>
          </Dialog.Header>
          <Dialog.Body>
            <ReactPlayer
              width="100%"
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
            ></ReactPlayer>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default MovieTrailer;
