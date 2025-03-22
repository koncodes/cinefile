import { useState } from "react";
import {
  Box,
  Button,
  Field,
  Fieldset,
  Input,
  NativeSelect,
  Stack,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { MovieList } from "@/entities/MovieList";
import MovieListCollection from "@/firebase/MovieListCollection";
import SearchMovie from "./SearchMovie";
import { useNavigate } from "react-router-dom";
import { userAuthStore } from "@/stores/AuthStore";
import { Movie } from "@/entities/Movie";
import AddMovie from "./AddMovie";

const AddListForm = () => {
  const navigate = useNavigate();
  const authUser = userAuthStore((s) => s.authUser);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    privacy: "public",
  });
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleAddMovie = (movie: Movie) => {
    setMovies((prevMovies) => [...prevMovies, movie]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!authUser) {
      console.error("User not authenticated");
      return;
    }

    const newMovieList = new MovieList({
      id: crypto.randomUUID(),
      userId: authUser.id,
      name: formData.name,
      description: formData.description,
      privacy: formData.privacy,
      type: "custom",
      created: Timestamp.now(),
      updated: Timestamp.now(),
      movieIds: movies.map((movie) => movie.id),
      posterUrls: movies.map((movie) => movie.poster_path),
    });

    try {
      await MovieListCollection.setMovieList(newMovieList);
      console.log("MovieList created successfully!");
      setFormData({ name: "", description: "", privacy: "public" });
      setMovies([]);
      navigate("/");
    } catch (error) {
      console.error("Error creating MovieList:", error);
    }
  };

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
          {movies.map((movie) => (
            <Text key={movie.id}>
              {movie.title} ({new Date(movie.release_date).getFullYear()})
            </Text>
          ))}
        </Fieldset.Content>

        <Button type="submit" alignSelf="flex-start">
          Submit
        </Button>
      </Fieldset.Root>
    </form>
  );
};

export default AddListForm;
