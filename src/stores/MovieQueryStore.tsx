import { Genre } from "@/entities/Genre";
import { Provider } from "@/entities/Provider";
import { create } from "zustand";

export interface MovieQuery {
  genre?: Genre | null;
  sortBy?: string;
  provider?: Provider | null;
  searchText?: string;
}
interface MovieQueryStore {
  movieQuery: MovieQuery;
  setSearchText: (searchText: string) => void;
  setGenre: (genre: Genre | null) => void;
  setProvider: (provider: Provider | null) => void;
  setSortBy: (sortBy: string) => void;
}

export const useMovieQueryStore = create<MovieQueryStore>((set) => ({
  movieQuery: {},
  setSearchText: (searchText: string) =>
    set(() => ({ movieQuery: { searchText } })),
  setGenre: (genre: Genre | null) =>
    set((store) => ({
      movieQuery: {
        ...store.movieQuery,
        genre,
        searchText: store.movieQuery.searchText
          ? ""
          : store.movieQuery.searchText,
      },
    })),
  setProvider: (provider: Provider | null) =>
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
