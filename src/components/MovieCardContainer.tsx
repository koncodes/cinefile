import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode;
}

const MovieCardContainer = ({ children }: Props) => {
  return (
    <Box borderRadius="6px" overflow="hidden">
        {children}
    </Box>
  )
}

export default MovieCardContainer