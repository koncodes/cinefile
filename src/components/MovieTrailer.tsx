import useTrailers from "@/hooks/useTrailers";
import ReactPlayer from "react-player";

interface Props {
  id: number;
}

const MovieTrailer = ({ id }: Props) => {
  const { data, error, isLoading } = useTrailers(id);

  if (isLoading) return null;
  if (error || !data) throw error;

  const trailers = data?.results;
  const num = trailers?.length ? trailers.length - 1 : 0;

  return (
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
      url={`https://www.youtube.com/watch?v=${trailers?.[num]?.key}`}
      fallback={<div>Trailer not available</div>}
    ></ReactPlayer>
  );
};

export default MovieTrailer;
