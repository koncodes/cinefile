import { Button } from "@chakra-ui/react";
import { useMovieQueryStore } from "@/stores/MovieQueryStore";

const ClearAllButton = () => {
  const { setSearchText, setGenre, setProvider, setSortBy } =
    useMovieQueryStore();

  const handleClearAll = () => {
    setSearchText("");
    setGenre(null);
    setProvider(null);
    setSortBy("popularity.desc");
  };

  return (
    <Button
      size="sm"
      variant="outline"
      width="100%"
      justifyContent="space-between"
      onClick={handleClearAll}
    >
      Clear All
    </Button>
  );
};

export default ClearAllButton;
