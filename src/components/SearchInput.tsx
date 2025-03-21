import useMovieQueryStore from "@/store";
import { Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

const SearchIcon = BsSearch as React.ElementType;

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const searchText = useMovieQueryStore((s) => s.movieQuery.searchText);
  const setSearchText = useMovieQueryStore((s) => s.setSearchText);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) setSearchText(ref.current.value);
      }}
    >
      <InputGroup startElement={<SearchIcon />}>
        <Input
          placeholder="Search movies..."
          borderRadius={20}
          variant="subtle"
          ref={ref}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
