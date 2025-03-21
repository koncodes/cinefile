import { create } from "zustand";
import { Genre } from "./entities/Genre";
import { Provider } from "./entities/Provider";

interface MovieQuery {
  genre?: Genre;
  sortBy?: string;
  provider?: Provider;
  searchText?: string;
}

interface MovieQueryStore {
  movieQuery: MovieQuery;
  setSearchText: (searchText: string) => void;
  setGenre: (genre: Genre) => void;
  setProvider: (provider: Provider) => void;
  setSortBy: (sortBy: string) => void;
}

const useMovieQueryStore = create<MovieQueryStore>((set) => ({
  movieQuery: {},
  setSearchText: (searchText: string) =>
    set(() => ({ movieQuery: { searchText } })),
  setGenre: (genre: Genre) =>
    set((store) => ({
      movieQuery: {
        ...store.movieQuery,
        genre,
        searchText: store.movieQuery.searchText
          ? ""
          : store.movieQuery.searchText,
      },
    })),
  setProvider: (provider: Provider) =>
    set((store) => ({
      movieQuery: {
        ...store.movieQuery,
        provider,
        searchText: store.movieQuery.searchText
          ? ""
          : store.movieQuery.searchText,
      },
    })),
  setSortBy: (sortBy: string) =>
    set((store) => ({
      movieQuery: {
        ...store.movieQuery,
        sortBy,
        searchText: store.movieQuery.searchText
          ? ""
          : store.movieQuery.searchText,
      },
    })),
}));

export default useMovieQueryStore;
