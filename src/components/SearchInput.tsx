import { useMovieQueryStore } from "@/stores/MovieQueryStore";
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
          variant="outline"
          ref={ref}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          maxW={{md: "400px"}}
          w={{md: "340px"}}
          minW={{md: "300px"}}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
