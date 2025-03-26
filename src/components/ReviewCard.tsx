import React from "react";
import { Box, Text, Flex, Icon, Card } from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Review } from "@/entities/Review";

interface Props {
  review: Review;
}

const ReviewCard = ({ review }: Props) => {
  const renderStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map((index) => (
      <Icon
        key={index}
        as={
          rating >= index - 0.5 && rating < index
            ? FaStarHalfAlt
            : rating >= index
              ? FaStar
              : FaRegStar
        }
        color={
          rating >= index - 0.5 && rating < index
            ? "yellow.400"
            : rating >= index
              ? "yellow.400"
              : "gray.300"
        }
        w={4}
        h={4}
      />
    ));
  };

  return (
    <Card.Root
      h="100%"
      justifyContent="space-between"
      flexDirection="column"
      border="1px"
      borderStyle="solid"
      borderColor="border.card"
      bg="layoutTertiary.bg"
      padding="0"
      overflow="hidden"
      fontSize="sm"
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .15s ease-in",
      }}
    >
      <Card.Body gap="4" paddingBlock="5" paddingInline="3">
        <Text
          textAlign="center"
          fontWeight={700}
          textTransform="uppercase"
          fontSize="md"
        >
          {review.movie.title}
        </Text>

        <Flex alignItems="center" justifyContent="center" >
          {renderStars(review.rating)}
          <Text ml={2} opacity=".4" paddingTop="3px">
            ({review.rating.toFixed(1)})
          </Text>
        </Flex>

        <Text
          alignSelf="stretch"
          textAlign="center"
          fontStyle="italic"
        >
          "{review.content}"
        </Text>

        <Text
          textAlign="center"
          fontWeight={700}
          textTransform="uppercase"
          color="gray.500"
        >
          {review.user.displayName}
        </Text>
      </Card.Body>
    </Card.Root>
  );
};

export default ReviewCard;
