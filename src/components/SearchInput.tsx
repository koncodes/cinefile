import { Input, InputGroup } from "@chakra-ui/react"
import { BsSearch } from "react-icons/bs"

const SearchInput = () => {
  return (
    <InputGroup  startElement={<BsSearch />}>
        <Input placeholder="Search movies..." borderRadius={20} variant="subtle" />
    </InputGroup>
    
  )
}

export default SearchInput