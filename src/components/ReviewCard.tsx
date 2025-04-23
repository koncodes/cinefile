import { Text, Flex, Icon, Card, Avatar } from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Review } from "@/entities/Review";
import { Link } from "react-router-dom";

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
      className="review-card"
      h="100%"
      justifyContent="space-between"
      flexDirection="column"
      border="1px"
      borderStyle="solid"
      borderColor="border.card"
      bg="layoutTertiary.bg"
      padding="0"
      fontSize="sm"
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .15s ease-in",
      }}
      marginTop="calc(2.75rem / 2)"
    >
      <Card.Body gap="3" paddingBlock="5" paddingBottom="3" paddingTop="10">
        <Avatar.Root
          colorPalette="brand"
          size="lg"
          transformOrigin="center"
          position="absolute"
          top="calc(-2.75rem / 2)"
          alignSelf="center"
        >
          <Avatar.Fallback name={review.user.displayName} />
          <Avatar.Image src={review.user.avatarURL || undefined} />
        </Avatar.Root>
        <Text
          textAlign="center"
          fontWeight={700}
          textTransform="uppercase"
          fontSize="sm"
        >
          <Link to={"/films/" + review.movie.id}>{review.movie.title}</Link>
        </Text>

        <Flex alignItems="center" justifyContent="center">
          {renderStars(review.rating)}
          <Text ml={2} opacity=".4" paddingTop="3px">
            ({review.rating.toFixed(1)})
          </Text>
        </Flex>

        <Text
          alignSelf="stretch"
          textAlign="center"
          fontStyle="italic"
          fontSize="sm"
        >
          "{review.content}"
        </Text>

        <Text
          textAlign="center"
          fontWeight={700}
          textTransform="uppercase"
          color="gray.500"
          fontSize="xs"
        >
          <Link to={"/users/" + review.user.id}>{review.user.displayName}</Link>
        </Text>
      </Card.Body>
    </Card.Root>
  );
};

export default ReviewCard;
