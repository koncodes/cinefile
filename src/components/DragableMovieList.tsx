import { chakra, Text, Flex, IconButton, Span, HStack, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import { Movie } from "@/entities/Movie";
import { MdDeleteOutline } from "react-icons/md";

const DeleteOutline = MdDeleteOutline as React.ElementType;

const ChakraReorderGroup = chakra(Reorder.Group);
const ChakraReorderItem = chakra(Reorder.Item);

const variants = {
  notDragging: {
    zIndex: 0,
    boxShadow: "none",
    background: "transparent",
    border: "1px solid var(--chakra-colors-border-card)",
  },
  dragging: {
    zIndex: 1,
    boxShadow: "none",
    background: "transparent",
    border: "1px solid var(--chakra-colors-border-card)",
  },
};

interface Props {
  movies: Movie[];
  onReorder?: (newOrder: Movie[]) => void;
  onDelete?: (movie: Movie) => void;
}

export default function DraggableMovieList({
  movies,
  onReorder,
  onDelete,
}: Props) {
  const [items, setItems] = useState<Movie[]>(movies);

  useEffect(() => {
    setItems(movies);
  }, [movies]);

  const handleReorder = (newOrder: Movie[]) => {
    setItems(newOrder);
    if (onReorder) {
      onReorder(newOrder);
    }
  };

  const handleDelete = (e: React.MouseEvent, movie: Movie) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(movie);
    }
  };

  return (
    <ChakraReorderGroup
      axis="y"
      values={items}
      onReorder={handleReorder}
      display="flex"
      flexDirection="column"
      gap={2}
      listStyleType="none"
      padding={0}
      w="100%"
    >
      {items.map((movie) => (
        <ChakraReorderItem
          key={movie.id}
          value={movie}
          dragTransition={{
            bounceStiffness: 600,
          }}
          variants={variants}
          initial="notDragging"
          whileDrag="dragging"
          p={2}
          rounded="md"
          position="relative"
          cursor="move"
          w="100%"
        >
          <Flex alignItems="center" justifyContent="space-between" w="100%">
            <HStack gap="3" fontSize="sm">
              <Image
                src={`https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`}
                alt={movie.title}
                w="40px"
                h="40px"
                borderRadius="4px"
                objectFit="cover"
              />
              <Span>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </Span>
            </HStack>
            <IconButton
              aria-label={`Remove ${movie.title}`}
              size="sm"
              colorScheme="red"
              variant="ghost"
              onClick={(e) => handleDelete(e, movie)}
            >
              <DeleteOutline />
            </IconButton>
          </Flex>
        </ChakraReorderItem>
      ))}
    </ChakraReorderGroup>
  );
}
