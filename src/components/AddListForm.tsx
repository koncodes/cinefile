import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  HStack,
  Input,
  NativeSelect,
  Portal,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import List from "@/entities/List";
import { Movie, MovieReference } from "@/entities/Movie";
import { MovieList } from "@/entities/MovieList";
import MovieListCollection from "@/firebase/MovieListCollection";
import { userAuthStore } from "@/stores/AuthStore";
import AddMovie from "./AddMovie";
import DraggableMovieList from "./DragableMovieList";
import { UserReference } from "@/entities/User";

const AddListForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const authUser = userAuthStore((s) => s.authUser);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    privacy: "public",
  });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchList = async () => {
      setIsLoading(true);
      try {
        const listData = await MovieListCollection.getMovieListById(id!);
        if (listData) {
          setFormData({
            name: listData.name || "",
            description: listData.description || "",
            privacy: listData.privacy || "public",
          });

          if (listData.movies && listData.movies.length > 0) {
            setMovies(listData.movies.getItems() as Movie[]);
          }
        } else {
          navigate("/lists");
        }
      } catch (error) {
        console.error("Error fetching movie list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchList();
  }, [id, navigate]);

  const handleAddMovie = (newMovie: Movie) => {
    if (!movies.some((movie) => movie.id === newMovie.id)) {
      setMovies((prevMovies) => [...prevMovies, newMovie]);
    }
  };

  const handleReorderMovies = (reorderedMovies: Movie[]) => {
    setMovies(reorderedMovies);
  };

  const handleDeleteMovie = (movieToDelete: Movie) => {
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieToDelete.id)
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!authUser) return;

    const movieIds = new List<number>(movies.map((m) => m.id));
    const posterUrls = new List<string>(movies.map((m) => m.poster_path));
    const moveListMovies = new List<MovieReference>(
      movies.map((m) => ({
        id: m.id,
        title: m.title,
        poster_path: m.poster_path,
        release_date: m.release_date,
        vote_average: m.vote_average,
      }))
    );
    const newMovieList = new MovieList({
      id: id || "",
      userId: authUser.id,
      user: authUser as UserReference,
      name: formData.name,
      description: formData.description,
      privacy: formData.privacy,
      type: "custom",
      created: Timestamp.now(),
      updated: Timestamp.now(),
      movieIds: movieIds,
      posterUrls: posterUrls,
      movies: moveListMovies,
    });

    try {
      if (id) {
        await MovieListCollection.updateMovieList(newMovieList);
      } else {
        await MovieListCollection.addMovieList(newMovieList);
      }
      navigate("/lists/" + authUser.id);
    } catch (error) {
      console.error("Error saving MovieList:", error);
    }
  };

  const handleDeleteList = async () => {
    if (!id) return;

    try {
      await MovieListCollection.deleteMovieList(id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting MovieList:", error);
    }
  };

  if (!authUser) return null;

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>
            {id ? "Edit Custom List" : "Create Custom List"}
          </Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide the details for your custom list.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Description</Field.Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Who can view?</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                name="privacy"
                value={formData.privacy}
                onChange={handleInputChange}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>

          <AddMovie onAddMovie={handleAddMovie} />

          {movies.length > 0 && (
            <>
              <Text fontWeight="bold" mt={4}>
                Added Movies:
              </Text>
              <DraggableMovieList
                movies={movies}
                onReorder={handleReorderMovies}
                onDelete={handleDeleteMovie}
              />
            </>
          )}
        </Fieldset.Content>

        <HStack mt={4}>
          <Button type="submit" loading={isLoading}>
            {id ? "Update" : "Create"} List
          </Button>

          {id && (
            <Dialog.Root placement="center">
              <Dialog.Trigger asChild>
                <Button variant="outline">Delete</Button>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Delete Confirmation</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                      <p>Are you sure you want to delete this list?</p>
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                      </Dialog.ActionTrigger>
                      <Button onClick={handleDeleteList}>Delete</Button>
                    </Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          )}
        </HStack>
      </Fieldset.Root>
    </form>
  );
};

export default AddListForm;
