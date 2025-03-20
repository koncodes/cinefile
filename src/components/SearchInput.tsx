import { Input, InputGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
  searchText: string | null;
}

const SearchIcon = BsSearch as React.ElementType;

const SearchInput = ({ onSearch, searchText }: Props) => {
  const [inputValue, setInputValue] = useState(searchText || "");

  useEffect(() => {
    setInputValue(searchText || "");
  }, [searchText]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup startElement={<SearchIcon />}>
        <Input
          placeholder="Search movies..."
          borderRadius={20}
          variant="subtle"
          value={inputValue}
          onChange={handleInputChange}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
