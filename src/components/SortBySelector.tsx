import { Button, Menu, Portal } from '@chakra-ui/react'
import { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs'

interface Props {
    onSortChange: (sortBy: string) => void;
    selectedSort: string | null;
}

const SortBySelector = ({ onSortChange, selectedSort }: Props) => {

  const [sortBy, setSortBy] = useState<string>('popularity.desc');
  const sortValues: { value: string; label: string }[] = [
    { value: 'popularity.desc', label: 'Popularity' },
    { value: 'primary_release_date.desc', label: 'Release Date' },
    { value: 'vote_average.desc', label: 'Rating' },
    // { value: 'title.desc', label: 'Title Descending' },
    // { value: 'title.asc', label: 'Title Ascending' },
    // { value: 'popularity.asc', label: 'Popularity Ascending' },
    // { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
    // { value: 'vote_average.asc', label: 'Rating Ascending' },
  ];
    
  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange(value);
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
           {sortValues.find(item => item.value === (selectedSort || 'popularity.desc'))?.label || 'Sort By'} <BsChevronDown />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="10rem">
            <Menu.RadioItemGroup
              value={sortBy}
              onValueChange={(e) => handleSortChange(e.value)}>
              {sortValues.map((item) => (
                <Menu.RadioItem 
                  key={item.value} 
                  value={item.value}>
                  {item.label}
                  <Menu.ItemIndicator />
                </Menu.RadioItem>
              ))}
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default SortBySelector
