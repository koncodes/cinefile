import { Card, Skeleton, SkeletonText } from '@chakra-ui/react'
import React from 'react'

const MovieCardSkeleton = () => {
  return (
    <Card.Root bg="bg.card">
      <Skeleton height="250px"/>
      <Card.Body>
        <SkeletonText />
      </Card.Body>
    </Card.Root>
  )
}

export default MovieCardSkeleton