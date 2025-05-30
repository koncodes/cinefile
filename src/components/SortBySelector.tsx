import { useMovieQueryStore } from "@/stores/MovieQueryStore";
import { Button, Menu, Portal } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

const SortBySelector = () => {
  const sortValues: { value: string; label: string }[] = [
    { value: "popularity.desc", label: "Popularity" },
    { value: "primary_release_date.desc", label: "Release Date" },
    { value: "vote_average.desc", label: "Rating" },
    { value: "title.desc", label: "Title" },
    // { value: 'title.asc', label: 'Title Ascending' },
    // { value: 'popularity.asc', label: 'Popularity Ascending' },
    // { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
    // { value: 'vote_average.asc', label: 'Rating Ascending' },
  ];

  const selectedSort = useMovieQueryStore((s) => s.movieQuery.sortBy);
  const setSortBy = useMovieQueryStore((s) => s.setSortBy);

  const ChevronDownIcon = BsChevronDown as React.ElementType;
  const selectedLabel =
    sortValues.find(
      (item) => item.value === (selectedSort || "popularity.desc")
    )?.label || "Sort By";

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          width="100%"
          justifyContent="space-between"
        >
          {selectedLabel} <ChevronDownIcon />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {sortValues.map((sortValue) => (
              <Menu.Item
                key={sortValue.value}
                value={sortValue.value}
                onClick={() => setSortBy(sortValue.value)}
              >
                {sortValue.label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default SortBySelector;
