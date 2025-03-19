import { Button, Menu, Portal } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';

interface Props {
    onSelectSort: (sortBy: string) => void;
    selectedSort: string | null;
}
const ChevronDownIcon = BsChevronDown as React.ElementType;

const SortBySelector = ({ onSelectSort, selectedSort }: Props) => {
    const sortValues: { value: string; label: string }[] = [
        { value: 'popularity.desc', label: 'Popularity' },
        { value: 'primary_release_date.desc', label: 'Release Date' },
        { value: 'vote_average.desc', label: 'Rating' },
        // Uncomment these if needed:
        { value: 'title.desc', label: 'Title' },
        // { value: 'title.asc', label: 'Title Ascending' },
        // { value: 'popularity.asc', label: 'Popularity Ascending' },
        // { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
        // { value: 'vote_average.asc', label: 'Rating Ascending' },
    ];

    const selectedLabel = sortValues.find((item) => item.value === (selectedSort || 'popularity.desc'))?.label || 'Sort By';

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button variant="outline" size="sm">
                    {selectedLabel} <ChevronDownIcon />
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                  <Menu.Content minW="10rem">
                    {sortValues.map((sortValue) => (
                      <Menu.Item
                        key={sortValue.value}
                        value={sortValue.value}
                        onClick={() => onSelectSort(sortValue.value)}
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