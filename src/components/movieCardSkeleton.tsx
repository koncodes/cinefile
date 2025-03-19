import { Card, Skeleton, SkeletonText } from '@chakra-ui/react'
import React from 'react'

const MovieCardSkeleton = () => {
  return (
    <Card.Root borderRadius="10px" overflow="hidden">
      <Skeleton height="250px"/>
      <Card.Body>
        <SkeletonText />
      </Card.Body>
    </Card.Root>
  )
}

export default MovieCardSkeleton