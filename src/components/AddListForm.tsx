import List from "@/entities/List";
import { Movie } from "@/entities/Movie";
import { MovieList } from "@/entities/MovieList";
import MovieListCollection from "@/firebase/MovieListCollection";
import { userAuthStore } from "@/stores/AuthStore";
import fetchMovie from "@/utils/fetchMovie";
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
  Textarea
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddMovie from "./AddMovie";
import DraggableMovieList from "./DragableMovieList";

const AddListForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const authUser = userAuthStore((s) => s.authUser);

  const getInitialFormData = () => ({
    name: "",
    description: "",
    privacy: "public",
    movieIds: new List<number>(),
    posterUrls: new List<string>(),
  });

  const [formData, setFormData] =
    useState<Partial<MovieList>>(getInitialFormData());
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setFormData(getInitialFormData());
      setMovies([]);
      return;
    }
    const fetchList = async () => {
      setIsLoading(true);
      try {
        const userData = await MovieListCollection.getMovieListById(id!);
        if (userData) {
          setFormData(userData);
          if (userData.movieIds && userData.movieIds.length > 0) {
            const uniqueMovieIds = [...new Set(userData.movieIds.getItems())];
            const moviePromises = uniqueMovieIds.map((movieId) =>
              fetchMovie(movieId!)
            );
            const movieResults = await Promise.all(moviePromises);
            const validMovies = movieResults.filter(
              (movie) => movie !== undefined
            ) as Movie[];
            setMovies(validMovies);
          } else {
            setMovies([]);
          }
        } else {
          setFormData(getInitialFormData());
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching movie list:", error);
        setFormData(getInitialFormData());
      } finally {
        setIsLoading(false);
      }
    };
    fetchList();
  }, [id, navigate]);

  const handleAddMovie = (anotherMovie: Movie) => {
    if (!movies.some((movie) => movie.id === anotherMovie.id)) {
      setMovies((movies) => [...movies, anotherMovie]);
      formData.movieIds?.addItem(anotherMovie.id);
      formData.posterUrls?.addItem(anotherMovie.poster_path);
    }
  };

  const handleDeleteMovie = (anotherMovie: Movie) => {
    setMovies((movies) =>
      movies.filter((movie) => movie.id !== anotherMovie.id)
    );
    formData.movieIds?.removeItem(anotherMovie.id);
    formData.posterUrls?.removeItem(anotherMovie.poster_path);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMovieList = new MovieList({
      id: id || crypto.randomUUID(),
      userId: authUser?.id || "",
      name: formData.name,
      description: formData.description,
      privacy: formData.privacy,
      type: "custom",
      created: Timestamp.now(),
      updated: Timestamp.now(),
      movieIds: formData.movieIds?.getItems(),
      posterUrls: formData.posterUrls?.getItems(),
    });
    try {
      if (id) {
        await MovieListCollection.updateMovieList(newMovieList);
      } else {
        await MovieListCollection.setMovieList(newMovieList);
      }
      setFormData({ name: "", description: "", privacy: "public" });
      setMovies([]);
      navigate("/");
    } catch (error) {
      console.error("Error saving MovieList:", error);
    }
  };

  const handleDeleteList = async (id: string) => {
    try {
      await MovieListCollection.deleteMovieList(id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting MovieList:", error);
    }
  };

  // if (isLoading) return Spinner;
  if (!authUser) return;
  return (
    <form onSubmit={handleSubmit}>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>Create Custom List</Fieldset.Legend>
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
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Description</Field.Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Who can view?</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                name="privacy"
                value={formData.privacy}
                onChange={(e) =>
                  setFormData({ ...formData, privacy: e.target.value })
                }
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>

          <AddMovie onAddMovie={handleAddMovie} />

          <Text fontWeight="bold">Added Movies:</Text>
          <DraggableMovieList
            movies={movies}
            onReorder={setMovies}
            onDelete={handleDeleteMovie}
          />
        </Fieldset.Content>

        <HStack>
          <Button type="submit" alignSelf="flex-start">
            Submit
          </Button>
          {id && (
            <Dialog.Root placement="center">
              <Dialog.Trigger asChild>
                <Button alignSelf="flex-start" variant="outline">
                  Delete
                </Button>
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
                      <Button onClick={() => handleDeleteList(id)}>
                        Delete
                      </Button>
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
